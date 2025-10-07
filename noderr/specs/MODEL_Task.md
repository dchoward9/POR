File: noderr/specs/MODEL_Task.md

# MODEL_Task.md

## Purpose
To define the data structure for the "Fulfillment Task" record (`x_1118046_partne_0_tasks`). This table stores the individual, actionable tasks that are assigned to fulfillment teams (e.g., Legal, Security) as part of the overall onboarding process.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/x_1118046_partne_0_tasks.now.ts` and `metadata/update/sys_dictionary_x_1118046_partne_0_tasks_null.xml`.
- **Current interfaces**: This is a database table, interacted with via the GlideRecord API and the REST Table API. It extends the base `task` table, inheriting fields like `state`, `assignment_group`, `assigned_to`, etc.
- **Dependencies**: `MODEL_Request` (via a mandatory reference field). Inherits from the ServiceNow `task` table.
- **Dependents**: `FLOW_TaskSubflow` (creates these records), `ACL_TaskRecords`, `UI_TaskView`, and various Business Rules that act upon task updates.

## Core Logic & Functionality
This component defines the schema for the fulfillment tasks. Key fields include:
-   **`number` (from task):** The unique, prefixed identifier (e.g., `PORTASK10001`).
-   **`state` (from task):** The operational state of the task (e.g., Open, Work in Progress, Closed Complete).
-   **`assignment_group` & `assigned_to` (from task):** Fields to manage who is responsible for the task.
-   **`partner_onboarding_request` (custom):** A mandatory reference field linking the task back to its parent `MODEL_Request`. This is the primary relationship in the data model.
-   **`task_config` (custom):** A reference to the `MODEL_TaskConfig` record that was used to generate this task, providing traceability.
-   **Denormalized Fields (custom):** Several fields like `partner_full_legal_name`, `requested_for`, etc., are copied from the parent request to the task for easy reference by fulfillers. These are kept in sync by business rules.
-   **`university_name` (custom):** A field specific to the University Verification task type.

## Current Quality Assessment
- **Completeness**: The data model effectively supports the fulfillment process.
- **Code Quality**: N/A (Data model). Field labels are clear. The relationship to the parent request is correctly configured as mandatory.
- **Test Coverage**: The creation and updating of task records are covered by the ATF suite (`TEST_ATFSuite`).
- **Documentation**: The table and its fields have clear, descriptive labels.

## Technical Debt & Improvement Areas
- The denormalization of data from the parent request (e.g., `partner_full_legal_name`) is a design choice. While it improves usability for fulfillers, it relies on business rules to stay in sync. This is an acceptable trade-off but should be noted.

## Interface Definition
```javascript
// Server-side GlideRecord API Example
var taskGR = new GlideRecord('x_1118046_partne_0_tasks');
taskGR.initialize();
taskGR.setValue('partner_onboarding_request', 'parent_request_sys_id');
taskGR.setValue('assignment_group', 'legal_team_sys_id');
taskGR.setValue('short_description', 'Review partner contract');
// ... set other fields
var newTaskSysId = taskGR.insert();
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that a new record can be successfully created in the table.
- [ ] Verify that the `partner_onboarding_request` field is mandatory and cannot be saved if empty.
- [ ] Verify that the table correctly inherits fields from the base `task` table.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that attempting to insert a record without a parent request results in a database error.

### Quality Criteria
- [ ] The table and its custom fields should have clear, user-friendly labels.
- [ ] The relationship to the parent `MODEL_Request` should be correctly configured and enforced.