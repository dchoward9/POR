File: noderr/specs/UI_RequestApprovalView.md

# UI_RequestApprovalView.md

## Purpose
To provide a simplified, focused form view for managers and other approvers when they are actioning an approval request. This view removes unnecessary fields and sections, presenting only the information needed to make an "approve" or "reject" decision.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `metadata/update/sys_ui_section_0922d5f293aeaa10d5ec31697bba10f8.xml` and related `sys_ui_form_sections` records with `view="approval"`.
- **Current interfaces**: This is a UI configuration that defines a specific layout for the `x_1118046_partne_0_requests` table when the "approval" view is requested.
- **Dependencies**: `MODEL_Request`.
- **Dependents**: The approval notification emails (`EMAIL_RequestNotifications`) link to this view.

## Core Logic & Functionality
This component is a collection of UI configuration records that define the "approval" view for the Request form.
-   **View Name:** `approval`
-   **Displayed Fields:** It is configured to display a curated set of the most important fields from the `MODEL_Request` record, such as:
    -   `number`
    -   `requested_by`, `requested_for`, `manager`
    -   `short_description`
    -   All partner information fields (`partner_full_legal_name`, `business_justification`, etc.)
-   **Hidden Sections:** It hides sections that are not relevant to the approval decision, such as the "Work Notes" and "Tasks" related lists, to reduce clutter.

## Current Quality Assessment
- **Completeness**: The view is well-defined and provides all necessary information for an approver.
- **Code Quality**: N/A (UI Configuration).
- **Test Coverage**: The approval process is part of the ATF suite, which involves a user approving a request, implicitly using this view.
- **Documentation**: The view is clearly named "approval".

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// This is a UI configuration, not an API.
// It is accessed by navigating to a Request record and specifying the view.
// Example URL:
// https://ven05123.service-now.com/nav_to.do?uri=x_1118046_partne_0_requests.do?sys_id=[SYS_ID]&sysparm_view=approval
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when a user opens an approval link from an email, the form is rendered using the "approval" view.
- [ ] Verify that the approval view displays all the key partner information fields.
- [ ] Verify that the approval view does NOT display the "Tasks" or "Work Notes" sections.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The layout of the approval view should be clean, simple, and focused, enabling a quick decision by the approver.
- [ ] All fields necessary for an approval decision must be present and visible on this view.