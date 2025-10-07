File: noderr/specs/UI_RelatedLists.md

# UI_RelatedLists.md

## Purpose
To configure and display related records on the main `UI_RequestView` form. This component provides essential context to users by showing all child tasks and pending approvals associated with a parent request in convenient tabs.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `metadata/update/sys_ui_related_x_1118046_partne_0_requests_null.xml`.
- **Current interfaces**: This is a UI configuration that modifies the display of the `UI_RequestView`. It is not an executable component but a set of records that define UI relationships.
- **Dependencies**: `MODEL_Request`, `MODEL_Task`, and the `sysapproval_approver` table.
- **Dependents**: `UI_RequestView`.

## Core Logic & Functionality
This component defines two related lists that appear at the bottom of the `x_1118046_partne_0_requests` form:

1.  **Tasks:**
    -   **Relationship:** Shows records from the `x_1118046_partne_0_tasks` table.
    -   **Join Condition:** `tasks.partner_onboarding_request` = `requests.sys_id`.
    -   **Purpose:** Allows users to see all fulfillment tasks that have been generated for the current request, including their status, assignment, and number.

2.  **Approvers:**
    -   **Relationship:** Shows records from the `sysapproval_approver` table.
    -   **Join Condition:** `sysapproval_approver.sysapproval` = `requests.sys_id`.
    -   **Purpose:** Allows users to see who the request is pending approval from, the status of that approval, and any comments made by the approver.

## Current Quality Assessment
- **Completeness**: The related lists provide the necessary contextual information for a user viewing a request.
- **Code Quality**: N/A (UI Configuration).
- **Test Coverage**: The presence and correctness of these related lists are checked manually during UI testing.
- **Documentation**: The related list labels ("Tasks", "Approvers") are clear and standard.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// This is a UI configuration, not an API.
// It renders as tabs at the bottom of the Request form view.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that the "Tasks" related list appears on the `UI_RequestView` form.
- [ ] Verify that the "Tasks" list correctly displays only the child tasks associated with the parent request being viewed.
- [ ] Verify that the "Approvers" related list appears on the `UI_RequestView` form.
- [ ] Verify that the "Approvers" list correctly displays the approval records for the request being viewed.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The columns displayed in each related list should be the most relevant ones for providing a quick summary (e.g., Number, State, Assigned to for tasks).