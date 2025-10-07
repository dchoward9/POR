File: noderr/specs/MODEL_TaskConfig.md

# MODEL_TaskConfig.md

## Purpose
To define the data structure for the "Task Config" table (`x_1118046_partne_0_task_config`). This table acts as a "blueprint" for task creation, allowing administrators to define what tasks should be created, for which stage, under what conditions, and who they should be assigned to, all without changing the core workflow code.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/x_1118046_partne_0_task_config.now.ts`.
- **Current interfaces**: This is a database table, primarily managed by administrators through the ServiceNow UI. It is read by the `FLOW_MainRequest` during the task creation loop.
- **Dependencies**: `MODEL_Request` (for the `stage` choice list).
- **Dependents**: `FLOW_MainRequest` and `ACTION_TaskConditionCheck` are critically dependent on the data in this table to drive the dynamic task generation process.

## Core Logic & Functionality
This is a configuration table, not an operational one. Each record represents a potential task that can be created. Key fields include:
-   **`task_type` (custom):** A choice list defining the type of task (e.g., `Procurement`, `Legal`, `Security`).
-   **`assignment_group` (custom):** A reference to the `sys_user_group` that should be assigned the task.
-   **`short_description` (custom):** The default short description to be used for the created task.
-   **`order` (custom):** A number that defines the sequence in which tasks should be evaluated and potentially created.
-   **`stage` (custom):** The corresponding `stage` on the parent request that this task represents.
-   **`condition` (custom):** A boolean field. If `true`, the task is conditional.
-   **`conditional_field` (custom):** If `condition` is `true`, this field holds the name of the boolean field on the `MODEL_Request` table that should be checked (e.g., `sensitive_data_access`).

## Current Quality Assessment
- **Completeness**: The model contains all the necessary fields to dynamically define a task's properties and creation logic.
- **Code Quality**: N/A (Data model).
- **Test Coverage**: The records in this table are read and used as part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The table and fields have clear labels.

## Technical Debt & Improvement Areas
- None identified. This data-driven approach is a key strength of the application's design, promoting maintainability.

## Interface Definition
```javascript
// Server-side GlideRecord API Example
var taskConfigGR = new GlideRecord('x_1118046_partne_0_task_config');
taskConfigGR.addQuery('active', true);
taskConfigGR.orderBy('order');
taskConfigGR.query();

while (taskConfigGR.next()) {
  // FLOW_MainRequest uses this loop to evaluate each config record
  var taskType = taskConfigGR.getValue('task_type');
  var assignmentGroup = taskConfigGR.getValue('assignment_group');
  // ... and so on
}
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that an administrator can create, read, update, and delete records in this table.
- [ ] Verify that the `stage` field correctly displays the choice list from the `MODEL_Request` table.
- [ ] Verify that the `assignment_group` field correctly references the `sys_user_group` table.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The table should be secured via `ACL_TaskConfigRecords` to ensure only admins can modify it.
- [ ] The field labels should be clear and unambiguous to an administrator configuring the system.