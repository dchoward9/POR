File: noderr/specs/EMAIL_RequestNotifications.md

# EMAIL_RequestNotifications.md

## Purpose
To manage and send all automated email notifications related to the lifecycle of a Partner Onboarding Request. This component ensures stakeholders (requesters, managers, approvers) are kept informed of status changes.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `sysevent_email_action` records where `collection` = `x_1118046_partne_0_requests` or `sysapproval_approver` with a source table of requests.
- **Current interfaces**: Notifications are triggered by record insertions or updates on the `MODEL_Request` and `sysapproval_approver` tables. They send formatted HTML emails to specified recipients.
- **Dependencies**: `MODEL_Request`, `EMAIL_TaskNotifications` (for a complete notification strategy).
- **Dependents**: End users (requesters, managers) who rely on these notifications for status updates.

## Core Logic & Functionality
This component consists of a set of event-driven notification records:
-   **Request Opened:** An email is sent to the requester when a new `PARTREQ` record is created.
-   **Approval Request:** An email is sent to the user's manager when an approval is generated for the request. This email includes approve/reject mailto links.
-   **Request Approved:** An email is sent to the requester when their manager approves the request.
-   **Request Rejected:** An email is sent to the requester when their manager rejects the request.
-   **Request Completed/Closed:** Emails are sent to the requester when the request is closed, with different content for "Completed Successfully" vs. "Closed Incomplete".
-   **Mail Scripts:** A mail script (`por_request_summary`) is used to dynamically pull and format request details into the email body.

## Current Quality Assessment
- **Completeness**: The notifications cover all major state transitions in the request lifecycle.
- **Code Quality**: The email templates are well-structured HTML. The mail script is efficient.
- **Test Coverage**: Implicitly tested by the ATF suite, which checks for record state changes that would trigger these notifications.
- **Documentation**: Each notification record has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// Event-driven, not a direct API.
// Triggers on x_1118046_partne_0_requests table:
// - On Insert: Send "Request Opened" email.
// - On Update (approval changes to 'requested'): Send "Approval Request" email.
// - On Update (approval changes to 'approved'): Send "Request Approved" email.
// - On Update (approval changes to 'rejected'): Send "Request Rejected" email.
// - On Update (active changes to false): Send "Request Closed" email.

// Recipients:
// - Typically current.opened_by and current.requested_for.
// - For approvals, recipient is the approver.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that submitting a new request triggers the "Request Opened" notification to the requester.
- [ ] Verify that a request requiring approval triggers the "Approval Request" notification to the correct manager.
- [ ] Verify that approving a request triggers the "Request Approved" notification.
- [ ] Verify that rejecting a request triggers the "Request Rejected" notification.
- [ ] Verify that closing a request triggers the correct "Request Closed" notification.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that if a recipient field is empty, the email fails gracefully and logs an error in the email logs, rather than crashing the business rule or flow.

### Quality Criteria
- [ ] Review email templates for clarity, correct branding, and useful information.
- [ ] Ensure all emails provide a direct link back to the relevant record.