File: noderr/specs/UI_RequestFormVariables.md

# UI_RequestFormVariables.md

## Purpose
To define the set of questions and input fields that are presented to the user on the `UI_RequestForm`. This logical component represents the collection of all `item_option_new` records associated with the Partner Onboarding record producer.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `metadata/update/item_option_new_*.xml` files.
- **Current interfaces**: These are UI elements (variables) that render as fields on the `UI_RequestForm`. They are configured to map their collected data to specific fields on the target `MODEL_Request` table.
- **Dependencies**: `UI_RequestForm`.
- **Dependents**: `SCRIPT_PopulateManager`, `SCRIPT_CheckExemption`, and the `MODEL_Request` table whose fields are populated by these variables.

## Core Logic & Functionality
This component is a collection of configuration records, each defining a field on the form:
-   **`requested_for`:** A reference field to select the user the request is for. Defaults to the current user.
-   **`manager`:** A read-only reference field that is auto-populated based on the `requested_for` user.
-   **`partner_full_legal_name`:** A mandatory single-line text field.
-   **`partner_contact_information`:** A mandatory multi-line text field.
-   **`description_of_services`:** A mandatory multi-line text field.
-   **`business_justification`:** A mandatory multi-line text field.
-   **`sensitive_data_access`:** A mandatory Yes/No choice field.
-   **`university`:** A mandatory Yes/No choice field.
-   **`exemption_group`:** A hidden, single-line text field that holds the `sys_id` of the approval exemption group, populated from a system property. This variable is used by client scripts.

## Current Quality Assessment
- **Completeness**: The variables cover all the necessary data points required to initiate a request.
- **Code Quality**: N/A (Configuration records).
- **Test Coverage**: The population and submission of these variables are the first steps in the ATF suite (`TEST_ATFSuite`).
- **Documentation**: Each variable has a clear and descriptive question text.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// These are UI configuration records, not an API.
// They define the fields presented on the UI_RequestForm.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that all variables appear on the `UI_RequestForm` in the correct order.
- [ ] Verify that the `requested_for` variable correctly defaults to the logged-in user.
- [ ] Verify that the `manager` field correctly auto-populates when the `requested_for` user is selected.
- [ ] Verify that all mandatory variables are enforced and prevent form submission if empty.

### Input Validation Criteria  
- [ ] N/A (Handled by mandatory flag).

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The question text for each variable should be clear, unambiguous, and user-friendly.
- [ ] Help text should be provided for any fields that might be confusing.
- [ ] The use of a hidden variable (`exemption_group`) to pass configuration to client scripts is a good practice and should be maintained.