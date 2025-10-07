File: noderr/specs/UI_RequestForm.md

# UI_RequestForm.md

## Purpose
To serve as the primary user interface for initiating a new Partner Onboarding Request. This component is a Service Catalog Record Producer that provides a user-friendly form and, upon submission, creates a new record in the `MODEL_Request` table.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `metadata/update/sc_cat_item_producer_cab0b53e93d6e290d5ec31697bba10fc.xml`.
- **Current interfaces**: This is a UI component accessible to end-users via the ServiceNow Service Catalog and Service Portal.
- **Dependencies**: `MODEL_Request` (this is the target table), `UI_RequestFormVariables`, `SCRIPT_PopulateManager`, `SCRIPT_CheckExemption`.
- **Dependents**: The entire onboarding process is dependent on this form for initiation.

## Core Logic & Functionality
1.  **Presentation:** Renders a form in the Service Catalog with a title, description, and a set of variables (`UI_RequestFormVariables`).
2.  **Client-Side Logic:**
    -   On load and on change, it runs client scripts (`SCRIPT_PopulateManager`, `SCRIPT_CheckExemption`) to dynamically show/hide and populate the `manager` field.
    -   On submit, it runs a client script to validate that a manager is present if the user is not exempt from approval.
3.  **Record Creation:** Upon successful submission, the platform uses the variable-to-field mappings to create a new record in the `x_1118046_partne_0_requests` table.
4.  **Redirection:** After submission, the user is redirected to the newly created `MODEL_Request` record.

## Current Quality Assessment
- **Completeness**: The form captures all necessary information to start the onboarding process.
- **Code Quality**: The associated client scripts use best practices (e.g., GlideAjax).
- **Test Coverage**: The submission of this form is the starting point for the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The record producer has a clear name, description, and helpful metadata for searching in the catalog.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// This is a UI component, not an API.
// Access: Navigate to the Service Catalog and search for "Partner Onboarding Request".
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that the "Partner Onboarding Request" item is visible and searchable in the Service Catalog.
- [ ] Verify that filling out and submitting the form successfully creates a new record in the `x_1118046_partne_0_requests` table.
- [ ] Verify that all fields on the form are correctly mapped and saved to the corresponding fields on the new record.
- [ ] Verify that the user is redirected to the new request record after submission.

### Input Validation Criteria  
- [ ] Verify that all mandatory fields on the form are enforced and prevent submission if left empty.
- [ ] Verify that the `onSubmit` script correctly prevents submission if a non-exempt user does not have a manager populated.

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The form's questions and help text should be clear and easy for a non-technical user to understand.
- [ ] The form layout should be logical and well-organized.