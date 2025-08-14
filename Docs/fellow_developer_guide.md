# ServiceNow Pro-Code IDE Process Manual

## Core Development Commands & Workflow

### Instance Synchronization Commands

-   **Build and Install**: The **Fluent: Build and Install Application** command builds the application from local source code and installs it on the connected instance. This command pushes changes **FROM the local source code TO the live instance**.

-   **Sync**: The **Fluent: Sync Fluent App with changed metadata** command pulls the latest metadata changes **FROM the connected live instance TO the local source code**. It only pulls changes that are newer on the instance than the local files.

-   **Force Sync**: The **Fluent: Force Sync of Fluent App with all metadata** command overwrites all local files with the version from the instance, regardless of timestamps. This is useful if the local project becomes corrupted or out of sync.

### Source Control Commands (Git Integration)

-   **Commit Changes**: Use **Source Control > Commit changes** to save local changes to the remote repository.
    -   An option is provided to **Include changes not tracked via the Customer Update [sys_update_xml] table**.
-   **Apply Remote Changes (Pull)**: Use **Source Control > Apply Remote Changes** or **Source Control > Pull from repository** to update the local application with changes from the remote repository.
    -   If local, uncommitted changes exist, you will be prompted to **Stash local changes** or **Discard local changes**.
-   **Switch Branch**: Use **Source Control > Switch branch** to change the active repository branch. This updates the local application files to match the selected branch version.
-   **Create Branch**: Use **Source Control > Create branch** to create a new branch in the repository. A branch can be created from the current head or from an existing tag.
-   **Create Tag**: Use **Source Control > Create tag** to create a permanent, named link to a specific commit/version in the repository.
-   **Stash Local Changes**: Use **Source Control > Stash local changes** to save local modifications without committing them, leaving a clean working directory.
-   **Manage Stashes**: Use **Source Control > Manage stashes** to view, apply, or delete previously stashed changes.
-   **Conflict Resolution**: When applying remote or stashed changes, if a file has been modified both locally and remotely, the IDE will prompt for conflict resolution. You must choose which version to keep.

### Update Set Workflow

An **Update Set** is a group of configuration changes that can be moved from one instance to another.

-   **Create/Select**: A developer creates a new update set or selects an existing one with a state of **In progress**. This becomes the "current" update set where all subsequent changes are tracked.
-   **Complete**: When development is finished, the developer changes the state to **Complete**. This makes the update set read-only and ready for transfer.
-   **Retrieve**: On a target instance, the completed update set is retrieved from the source instance.
-   **Preview**: The retrieved update set must be previewed. This process checks for conflicts (e.g., a local update is newer than the one in the set) and other problems.
-   **Commit**: After all preview problems are resolved, the update set is committed, which applies the configuration changes to the target instance.

## Project Setup & Conversion

### Bringing an Existing Studio Application into the IDE

-   Run the **Fluent: Convert a scoped app to Fluent** command from the command palette.
-   After the initial conversion, right-click the `metadata` directory in the file explorer and select **Convert Directory to Fluent**.

### Adding an Application from Git

-   Use the **Import from Source Control** command (or **Git: Clone**).
-   Provide the repository **URL**, the **Credential** for access, and the specific **Branch** to import.

### Importing an Application from an Update Set (XML)

-   An update set can be exported to a local XML file from the source instance.
-   On the target instance, use the **Import Update Set from XML** action to load the customizations from the file. The update set will then be in a **Loaded** state, ready to be previewed and committed.

## Error Handling & Recovery

-   **Fluent: Reset Application**: This command is a recovery tool. It **deletes all local source files** in the application and discards all unsynchronized changes. It does not affect the application metadata on the instance itself.
    -   **Warning**: Any uncommitted changes and unpushed commits will be lost when using this command.
-   **Backing Out an Update Set**: This action reverses the changes from a previously committed update set.
    -   It creates "delete" updates in the current update set for any records that were inserted.
    -   It can cause data loss if it reverses the creation of a table or field that now contains data.
    -   **Critical Warning**: **Do not back out the Default update set**, as this can damage the instance configuration.

## Platform Limitations

-   The ServiceNow IDE does not include an **Integrated Terminal**.
-   "Note: A limited number of metadata types, such as Metadata Snapshots [sys_metadata_link] and UX Assets [sys_ux_lib_asset], can't be represented as ServiceNow Fluent code and aren't transformed."

### Update Set Limitations

-   **Combined Usage**: **Do not combine the usage of both Update Sets and the Application Repository for scoped app development.** An application must use one method exclusively.
-   **Tracked Content**: Update sets track configuration information but not transactional data (e.g., service catalog orders, incidents).
-   **Untracked by Default**: Homepages and content pages are not added to update sets by default.
-   **Data Loss Prevention**: Dictionary changes that would result in data loss (e.g., changing a column's data type on a table that contains data) are automatically skipped when an update set is committed. These changes must be made manually on the target instance.

## Key Directory Structure

-   **`src/fluent/generated`**: Contains application files that have been automatically converted to ServiceNow Fluent code during a sync. These files should not be manually edited.
-   **`metadata`**: Contains XML files for application metadata that cannot be converted to Fluent code. These files should not be manually edited.
-   **`now.config.json`**: A key file in the root directory that contains the ServiceNow application configuration, including directory paths.

---
### **ADDITIONS TO `DEV_GUIDE.md`**
---

## The Pro-Code Workflow: Pushing vs. Pulling

This is the most critical process to understand. The commands are directional.

- **`Build and Install` / `snc sdk deploy` (PUSH):**
  - **Purpose:** To push changes **FROM** your source code files (the "blueprint") **TO** the live ServiceNow instance.
  - **When to Use:** After you have written or modified `.now.ts` or `.js` files and want to make those changes active on the instance. This is the final step of development.

- **`Sync` / `snc sdk sync` (PULL):**
  - **Purpose:** To pull changes **FROM** the live ServiceNow instance **TO** your source code files.
  - **When to Use:** When a change has been made directly on the instance (e.g., in Studio or by another user) and you need to update your source code to match.
  - **`Force Sync`:** Use this command if a regular `Sync` fails or the workspace seems out of alignment. It performs a complete, top-to-bottom refresh from the instance.

## Error Handling & Recovery

- **`Fluent: Reset Application`**: This is a recovery tool for a corrupted workspace. It **deletes local source files** but does not harm the application metadata on the instance itself. Use this if a `Convert` or `Sync` process fails and leaves the workspace in a broken state.
  - **Warning**: Any uncommitted changes and unpushed commits will be lost.

## Platform Limitations & "Gotchas"

This is critical information to prevent errors.

- **XML-Only Files:** The following common record types **CANNOT** be fully represented by Fluent code. They will exist as `.xml` files in the `metadata/update` directory.
  - **Flows & Subflows (`sys_hub_flow`)**
  - **Record Producers (`sc_cat_item_producer`)**
  - **Catalog Variables (`item_option_new`)**
  - **Form Layouts (`sys_ui_section`, `sys_ui_form`)**
  - **Related Lists (`sys_ui_related`)**
  - **Dashboards (`par_dashboard_...`)** (Partially represented, XML provides better context)

- **Your Directive for XML Files:** **Do not attempt to write or edit Fluent code for these types.** When asked to modify one, your task is to analyze the provided `.xml` file and provide clear, step-by-step instructions for a human to perform the change in the ServiceNow UI (e.g., in Flow Designer or Form Layout). After the human makes the change, they will run `Sync` to update the XML file in the repository.

- **Security Inheritance on Task-Extended Tables:** Both the `Requests` and `Tasks` tables extend the base `task` table. To properly secure this application, a **Deny-Unless ACL** has been implemented on both tables. This rule acts as a gatekeeper, denying access to everyone *unless* they meet specific criteria for this application (e.g., being the requester or having a `POR` role). If you are debugging access issues, always check this Deny-Unless rule first, as it is the primary control overriding default platform behavior.