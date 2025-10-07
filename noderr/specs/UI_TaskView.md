File: noderr/specs/UI_TaskView.md

# UI_TaskView.md

## Purpose
To define the default form layout for the `x_1118046_partne_0_tasks` table. This component controls which fields are displayed and how they are organized, providing a clear and actionable interface for fulfillment team members working on a task.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `metadata/update/sys_ui_section_*.xml` and `metadata/update/sys_ui_form_sections_*.xml` records for the `x_1118046_partne_0_tasks` table with a default view.
- **Current interfaces**: This is a UI configuration that dictates the rendering of a record form for fulfillment tasks.
- **Dependencies**: `MODEL_Task`.
- **Dependents**: Fulfillers (users with the `user` role) who interact with task records.

## Core Logic & Functionality
This component is a collection of UI configuration records that define the default view for tasks. The layout is structured to provide both task-specific and parent-request context:
1.  **Main Section (unnamed):**
    -   Displays the primary task and parent request information in a two-column layout.
    -   **Left Column:** `number`, `partner_onboarding_request` (link to parent), `partner_onboarding_request.requested_for`.
    -   **Right Column:** `state`, `assignment_group`, `assigned_to`.
    -   Followed by the full-width `short_description` and `university_name` fields.
2.  **Partner Information Section:**
    -   Displays read-only, denormalized information from the parent request for easy reference.
    -   Includes fields like `partner_onboarding_request.partner_full_legal_name`, `partner_onboarding_request.business_justification`, etc. This prevents the fulfiller from having to click back to the parent request for essential context.
3.  **Work Notes Section:**
    -   Displays the journal fields for communication.
    -   Includes `watch_list`, `comments`, `work_notes`, and the full activity log formatter.

## Current Quality Assessment
- **Completeness**: The form view provides all necessary information for a fulfiller to understand and complete their task.
- **Code Quality**: N/A (UI Configuration).
- **Test Coverage**: The ATF suite creates and interacts with task records, implicitly using this view.
- **Documentation**: The sections are clearly captioned.

## Technical Debt & Improvement Areas
- None identified. The use of dot-walked fields in the "Partner Information" section is a good design choice for usability.

## Interface Definition
```
// This is a UI configuration, not an API.
// It is the default view rendered when a user navigates to a Task record.
// Example URL:
// https://ven05123.service-now.com/nav_to.do?uri=x_1118046_partne_0_tasks.do?sys_id=[SYS_ID]
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when a Task record is opened, all three sections (Main, Partner Information, Work Notes) are visible.
- [ ] Verify that the `partner_onboarding_request` field is a clickable link that navigates to the parent request record.
- [ ] Verify that the fields in the "Partner Information" section correctly display the read-only data from the parent request.
- [ ] Verify that the `university_name` field is visible (it is shown/hidden by a separate UI Policy).

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The form layout should prioritize the most important information for a fulfiller at the top.
- [ ] Displaying contextual information from the parent record is a key usability feature and should be maintained.