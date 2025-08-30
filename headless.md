Of course. This is the final, crucial piece of the puzzle. Setting up the infrastructure for the Headless Browser is the most technically intensive part, but it's a one-time setup. Your familiarity with Docker and Azure VMs will be a huge asset here.

The instructions in the ServiceNow documentation can be a bit dense. I will break them down into a clear, step-by-step project plan specifically for a **Windows Server VM hosted in Azure**, and then show you exactly where this fits into our overall 4-phase plan.

---

### **Phase 2.5: Building the Headless Browser Test Runner**

This is a new, dedicated phase that slots into our master plan. The goal is to create an "always-on" virtual machine in Azure that will listen for commands from your `QA` PDI and run the ATF UI tests on its behalf.

**Why a Windows Server VM in Azure?**
*   **Stability:** It's always on and has a stable, public IP address that your PDI can reach.
*   **Clean Environment:** It's a dedicated machine for testing, so it won't be affected by other software on your local PC.
*   **Firewall Control:** You have full control to open the specific port needed for the secure Docker connection.

---

#### **Step 1: Provision the Windows Server VM in Azure**

1.  **Create the VM:** In the Azure Portal, create a new Virtual Machine.
    *   **Image:** Select **Windows Server 2019 Datacenter**. The ServiceNow documentation explicitly states this is the supported version.
    *   **Size:** A basic size like `B2s` (2 vCPUs, 4 GB RAM) is more than enough to start.
2.  **Configure Networking:**
    *   **Public IP:** Ensure your VM is assigned a **Static** Public IP address. You will need this address for both the certificates and the ServiceNow configuration.
    *   **Firewall Rule:** Go to the VM's **Networking** settings. Add an **inbound port rule** to **Allow** TCP traffic on port **2376**. This is the standard secure port for the Docker Remote API.

#### **Step 2: Install Prerequisites on the VM**

Connect to your new VM using Remote Desktop and use PowerShell (as an Administrator) for these steps. We'll use the Chocolatey package manager to make this easy.

1.  **Install Chocolatey** (if it's not already there):
    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```
2.  **Install Docker, Java, and OpenSSL:**
    ```powershell
    choco install docker-desktop -y
    choco install openjdk --version=8 -y  # The doc specifies JRE 1.8 is required for keytool
    choco install openssl -y
    ```
3.  **Restart the VM** after the installations are complete to ensure everything is in the system path.

#### **Step 3: Generate Security Certificates**

This is the most complex but most important part. It creates the secure TLS connection between your ServiceNow `QA` instance and the Docker host.

1.  **Open PowerShell as Administrator** on the VM.
2.  **Create a working directory and set environment variables:**
    ```powershell
    mkdir C:\certs
    cd C:\certs
    
    # Use a strong, memorable password
    $env:PASSWORD = "your-strong-password-here" 
    
    # This is the Static Public IP of your Azure VM
    $env:SERVERIP = "YOUR_AZURE_VM_IP_ADDRESS" 
    
    # This can be a friendly name for your server
    $env:HOSTNAME = "servicenow-atf-runner" 
    ```
3.  **Generate the Certificate Authority (CA):** This is your private root of trust.
    ```powershell
    openssl genrsa -aes256 -passout pass:$env:PASSWORD -out ca-key.pem 4096
    openssl req -passin pass:$env:PASSWORD -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem -subj "/CN=$env:HOSTNAME"
    ```4.  **Generate the Server Certificate:** This is what Docker will use to prove its identity.
    ```powershell
    openssl genrsa -out server-key.pem 4096
    openssl req -subj "/CN=$env:HOSTNAME" -new -key server-key.pem -out server.csr
    echo "subjectAltName = DNS:$env:HOSTNAME,IP:$env:SERVERIP,IP:127.0.0.1" > extfile.cnf
    openssl x509 -passin pass:$env:PASSWORD -req -days 365 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf
    ```
5.  **Generate the Client Certificate:** This is what your ServiceNow `QA` instance will use to prove its identity to Docker.
    ```powershell
    openssl genrsa -out client-key.pem 4096
    openssl req -subj "/CN=$env:HOSTNAME" -new -key client-key.pem -out client.csr
    echo "extendedKeyUsage = clientAuth" > extfile.cnf
    openssl x509 -passin pass:$env:PASSWORD -req -days 365 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out client-cert.pem -extfile extfile.cnf
    ```
6.  **Create the Java Keystore for ServiceNow:** Your PDI needs these keys in a Java-specific format.
    ```powershell
    # Create a new Java Keystore file
    keytool -genkey -keyalg RSA -alias dse -keystore my.keystore -keypass $env:PASSWORD -storepass $env:PASSWORD -dname "CN=docker, OU=IT, O=MyOrg, L=City, S=State, C=US"
    
    # Delete the default entry
    keytool -delete -alias dse -keystore my.keystore -storepass $env:PASSWORD
    
    # Import your CA's public key
    keytool -import -keystore my.keystore -trustcacerts -alias ca -file ca.pem -storepass $env:PASSWORD -noprompt
    
    # Package the client key and cert into a .p12 file
    openssl pkcs12 -export -name clientkeypair -in client-cert.pem -inkey client-key.pem -out clientkeypair.p12 -passout pass:$env:PASSWORD
    
    # Import the .p12 file into your Java Keystore
    keytool -importkeystore -destkeystore my.keystore -srckeystore clientkeypair.p12 -srcstoretype pkcs12 -alias clientkeypair -deststorepass $env:PASSWORD -srcstorepass $env:PASSWORD
    ```
    You will now have a file named `my.keystore` in your `C:\certs` directory. You will need to upload this file to ServiceNow.

#### **Step 4: Configure and Secure the Docker Service**

1.  **Edit the Docker `daemon.json` file.** This file is located at `C:\ProgramData\docker\config\daemon.json`. Open it in a text editor.
2.  **Paste in the following configuration.** Be sure to use double backslashes `\\` for the paths in JSON.
    ```json
    {
      "debug": true,
      "tlsverify": true,
      "tlscacert": "C:\\certs\\ca.pem",
      "tlscert": "C:\\certs\\server-cert.pem",
      "tlskey": "C:\\certs\\server-key.pem",
      "hosts": [ "tcp://0.0.0.0:2376", "npipe://" ]
    }
    ```
3.  **Restart the Docker Service** in PowerShell to apply the changes:
    ```powershell
    Restart-Service docker
    ```

#### **Step 5: Pull the ServiceNow ATF Runner Image**

1.  In PowerShell, pull the specific Docker image for Windows:
    ```powershell
    docker pull ghcr.io/servicenow/atf-headless-runner:win-1.0.0
    ```

#### **Step 6: Configure the ServiceNow `QA` Instance**

This is the final step, where you teach your `QA` PDI how to communicate with your new Docker host.

1.  **Create an ATF User:** In your `QA` PDI, create a new user (e.g., `atf.headless.user`) and give it the `atf_test_designer` role. Set a strong password for this user.
2.  **Create the Certificate Record:**
    *   Navigate to **System Definition > Certificates**.
    *   Create a new record. Name it `Docker Host Keystore`.
    *   Set the **Type** to `Java Key Store`.
    *   Enter the password you used for the keystore (`$env:PASSWORD`).
    *   Save the record, then use the paperclip icon to **attach the `my.keystore` file** you created on the VM.
    *   Click **Validate Stores/Certificates** to confirm it's working.
3.  **Create the Protocol Profile:**
    *   Navigate to **System Security > Protocol Profiles**.
    *   Create a new record.
    *   **Name:** `Docker Secure`
    *   **Protocol:** `docker`
    *   **Default Port:** `2376`
    *   **Keystore:** Select the `Docker Host Keystore` you just created.
4.  **Create the Connection & Credential Alias:**
    *   Navigate to **Connections & Credentials > Connection & Credential Aliases**.
    *   Open the out-of-the-box record named **`Docker`**.
    *   Under the "Connections" related list, click **New**.
    *   **Name:** `ATF Headless Runner Connection`
    *   **Credential:** Leave blank.
    *   Check the **Mutual authentication** box.
    *   **Protocol profile:** Select the `Docker Secure` profile you just created.
    *   **Host:** Enter the **Static Public IP** of your Azure VM.
    *   Submit the record.
5.  **Configure ATF Properties:**
    *   Navigate to **Automated Test Framework > Administration > Properties**.
    *   Enable the top two checkboxes: **Enable test/test suite execution** and **Enable scheduled test suite execution**.
    *   Scroll down to the **Headless Runner Properties** section.
    *   Check the box to **Enable/disable the headless client test runner**.
    *   **Username:** `atf.headless.user` (the user you created).
    *   **Docker image name:** `ghcr.io/servicenow/atf-headless-runner:win-1.0.0`
    *   Save the properties.

---

### **Integrating into the Master Plan**

This entire process becomes a new, one-time phase in our overall plan.

*   **Phase 1:** Create Your Quality Standard (ATF Suite) on the `QA` PDI.
*   **Phase 2:** Set Up Your Code Hub & Credentials in Azure DevOps.
*   **Phase 2.5: Build the Headless Browser Test Runner** (All the steps you just read).
*   **Phase 3:** Build the Automation (The Pipeline & The Gate).
*   **Phase 4:** See It in Action.

You only need to do Phase 2.5 once. After it's built, your pipeline in Phase 3 will be able to use it automatically every time a Pull Request is created.