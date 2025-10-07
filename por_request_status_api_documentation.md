### **1. Overview**

This API was built to enable external querying (`GET`) of Partner Onboarding Requests statuses. It returns request information to include the request number, description, stage, and state. This information could be used for displaying high-level tracking information in external systems dashboards, for example. 

### **2. Authentication**

The current authentication method is `basic`. An access control list is in place to prevent generic, external users, and users without a specific Partner Onboarding role, from executing this API. Please send a request via email to `security.review@ei.com` to obtain credentials. 

### **3. Endpoint Details**

This section forms the core of the API documentation and should be meticulously detailed. It needs to include:
*   **Endpoint URL:** 
```
https://dev302615.service-now.com/api/x_1118046_partne_0/por/request_status
```
*   **HTTP Method:** `GET`
*   **Request Parameters:** The `request_number` parameter is *mandatory* and expects a *string* value.
*   - Example parameter value: `PARTREQ1001`
*   - Example request: `?request_number=PARTREQ1001`
*   **Request Headers:** N/A

### **4. Request and Response Examples**

*   **Sample Request:**
```
https://dev302615.service-now.com/api/x_1118046_partne_0/por/request_status?request_number=PARTREQ1001
```
*   **Sample Response:**
```
{
  "result": [
    {
      "number": "PARTREQ1001",
      "stage": "Waiting for Approval",
      "state": "Pending",
      "short_description": "Partner Onboarding Request: Caterpillar"
    }
  ]
}
```

### **5. Error Handling**

*   **Error Codes:**
    - `401 Unauthorized`
    - `404 Not Found`
*   **Error Messages:** 
    ```
    /// 401 Unauthorized
    {
        "error": {
            "message": "User Not Authenticated",
            "detail": "Required to provide Auth information"
        },
        "status": "failure"
    }
    ```

    ```
    /// 404 Not Found
    {
        "error": {
            "message": "No query parameters defined.",
            "detail": ""
        },
        "status": "failure"
        }
    ```

    ```
    /// 404 Not Found
    {
        "error": {
            "message": "No records found.",
            "detail": ""
        },
        "status": "failure"
        }
    ```

### **6. Rate Limiting and Security**

N/A

### **7. Versioning**

Version: 1.0 (09-17-2025)