File: noderr/specs/MODEL_Request.md

# MODEL_Request.md

## Purpose
To define the data structure for the core "Request" record (`x_1118046_partne_0_requests`). This table stores all the primary information submitted by a user for a new partner onboarding and tracks the overall status and stage of the process.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/x_1118046_partne_0_requests.now.ts` and `metadata/update/sys_dictionary_x_1118046_partne_0_requests_null.xml`.
- **Current interfaces**: This is a database table. It is interacted with via the GlideRecord API on the server side and the REST Table API. It extends the base `task` table, inheriting fields like `state`, `short_description`, `work_notes`, etc.
- **Dependencies**: Inherits from the ServiceNow `task` table.
- **Dependents**: Nearly every other component in the application depends on this data model, including `FLOW_MainRequest`, `MODEL_Task`, all `ACL_RequestRecords`, and all `UI_RequestView` components.

## Core Logic & Functionality
This component defines the schema for the Requests table. Key fields include:
-   **`number` (from task):** The unique, prefixed identifier (e.g., `PARTREQ1001`).
-   **`state` (from task):** The operational state of the request (e.g., Pending, Open, Work in Progress, Closed Complete).
-   **`stage` (custom):** The workflow stage, providing more granular status to the user (e.g., `Waiting for Approval`, `Contract Redlining`).
-   **`requested_for` & `requested_by` (custom):** References to the user the request is for and who submitted it.
-   **`manager` (custom):** A reference to the `requested_for`'s manager, used for approvals.
-   **Partner Information Fields (custom):** `partner_full_legal_name`, `partner_contact_information`, `description_of_services`, `business_justification`.
-   **Conditional Fields (custom):** `sensitive_data_access` (boolean), `university` (boolean). These fields are used by `ACTION_TaskConditionCheck` to determine which fulfillment tasks to create.

## Current Quality Assessment
- **Completeness**: The data model is comprehensive and captures all necessary information for the onboarding process as currently defined.
- **Code Quality**: N/A (Data model). Field labels and choices are clear and well-defined.
- **Test Coverage**: The creation and manipulation of records in this table are extensively covered by the ATF suite (`TEST_ATFSuite`).
- **Documentation**: The table and its fields have clear, descriptive labels.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// Server-side GlideRecord API Example
var requestGR = new GlideRecord('x_1118046_partne_0_requests');
requestGR.initialize();
requestGR.setValue('partner_full_legal_name', 'Example Partner Inc.');
requestGR.setValue('requested_for', 'some_sys_id');
// ... set other fields
var newRequestSysId = requestGR.insert();
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that a new record can be successfully created in the table with all mandatory fields populated.
- [ ] Verify that the table correctly inherits fields from the base `task` table.
- [ ] Verify that the `stage` field contains the correct choice list for the workflow.

### Input Validation Criteria  
- [ ] Verify that mandatory fields (`partner_full_legal_name`, `business_justification`, etc.) are enforced at the database level.

### Error Handling Criteria
- [ ] Verify that attempting to insert a record without a mandatory field results in a database error that is caught by the calling script.

### Quality Criteria
- [ ] The table and its custom fields should have clear, user-friendly labels.
- [ ] The table should be properly contained within the application's scope.