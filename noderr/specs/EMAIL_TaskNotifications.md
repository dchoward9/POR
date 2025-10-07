File: noderr/specs/EMAIL_TaskNotifications.md

# EMAIL_TaskNotifications.md

## Purpose
To manage and send all automated email notifications related to the lifecycle of a Partner Onboarding Task. This component ensures fulfillment teams and individuals are notified of new assignments and updates.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `sysevent_email_action` records where `collection` = `x_1118046_partne_0_tasks`.
- **Current interfaces**: Notifications are triggered by record insertions or updates on the `MODEL_Task` table. They send formatted HTML emails to specified recipients.
- **Dependencies**: `MODEL_Task`.
- **Dependents**: End users (fulfillers) who rely on these notifications for work assignments.

## Core Logic & Functionality
This component consists of a set of event-driven notification records that fire based on changes to Task records:
-   **Assigned to Group:** When a task is created and assigned to a group but not an individual, an email is sent to the entire group.
-   **Assigned to Individual:** When a task's `assigned_to` field is populated or changed, an email is sent to the individual assignee.
-   **Work Notes Added (Unassigned):** When work notes are added to a task that is not yet assigned to an individual, an email is sent to the assignment group.
-   **Work Notes Added (Assigned):** When work notes are added to an assigned task, an email is sent to the individual assignee and anyone on the watch list.
-   **Email Templates:** A shared email template (`Partner Task Email Assigned Tasks`) is used to provide a consistent format for assignment notifications.

## Current Quality Assessment
- **Completeness**: The notifications cover the key events in a task's lifecycle: assignment and communication.
- **Code Quality**: The email templates are simple and effective. The conditions on the notification records are well-defined.
- **Test Coverage**: Implicitly tested by the ATF suite, as task creation and assignment are core parts of the end-to-end tests.
- **Documentation**: Each notification record has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// Event-driven, not a direct API.
// Triggers on x_1118046_partne_0_tasks table:
// - On Insert/Update (assignment_group changes): Send "Assigned to Group" email.
// - On Insert/Update (assigned_to changes): Send "Assigned to Individual" email.
// - On Update (work_notes changes): Send "Work Notes Added" email.

// Recipients:
// - current.assignment_group
// - current.assigned_to
// - current.work_notes_list
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that creating a new, unassigned task triggers the "Assigned to Group" notification.
- [ ] Verify that assigning a task to an individual triggers the "Assigned to Individual" notification.
- [ ] Verify that adding work notes to an assigned task triggers a notification to the assignee.
- [ ] Verify that adding work notes to an unassigned task triggers a notification to the assignment group.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that if a recipient field (e.g., `assignment_group`) is empty, the email fails gracefully and logs an error, rather than crashing the business rule or flow.

### Quality Criteria
- [ ] Review email templates for clarity and ensure they contain all necessary information for a fulfiller to take action.
- [ ] Ensure all emails provide a direct link back to the relevant task record.