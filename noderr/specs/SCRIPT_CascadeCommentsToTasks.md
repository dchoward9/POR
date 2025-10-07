File: noderr/specs/SCRIPT_CascadeCommentsToTasks.md

# SCRIPT_CascadeCommentsToTasks.md

## Purpose
To ensure seamless communication by automatically copying comments (customer-visible notes) from a parent onboarding request down to all of its active child fulfillment tasks. This allows the requester to communicate with all fulfillment teams simultaneously from a single record.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_49f870f193fe6a50d5ec31697bba10b3.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a server-side "before update" Business Rule that triggers when the `comments` field on a Request record changes.
- **Dependencies**: `MODEL_Request`, `MODEL_Task`.
- **Dependents**: `UI_TaskView` (the activity log on the task form is populated by these updates).

## Core Logic & Functionality
1.  The Business Rule is triggered before a record in the `x_1118046_partne_0_requests` table is updated.
2.  The trigger condition is `comments` changes.
3.  **Anti-Looping Mechanism:** The condition also checks that the comment does not contain the invisible HTML tag (`<p DoNotCopy></p>`). This prevents the rule from firing on comments that were just copied up from a child task by `SCRIPT_CascadeCommentsToRequest`, thus avoiding an infinite loop.
4.  The script queries for all `active` child tasks linked to the current request.
5.  It then iterates through each found task and copies the new comment from the request to the `comments` field of the task.
6.  Each task is then updated.

## Current Quality Assessment
- **Completeness**: The script successfully copies comments to all active child tasks.
- **Code Quality**: The script is efficient and includes the critical anti-looping condition.
- **Test Coverage**: This functionality is tested as part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified. The anti-looping mechanism is well-implemented.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: Before update on x_1118046_partne_0_requests
// Condition: current.comments.changes() && current.comments.indexOf('DoNotCopy') == -1

(function executeRule(current, previous) {
    var taskGR = new GlideRecord('x_1118046_partne_0_tasks');
    taskGR.addEncodedQuery('active=true^partner_onboarding_request=' + current.getUniqueValue());
    taskGR.query();
    while (taskGR.next()) {
        copyComments(taskGR, current.comments);
    }
})(current, previous);

function copyComments(taskGr, comments) {
    taskGr.comments = '[code]<p DoNotCopy></p>[/code]' + comments;
    taskGr.update();
}
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that adding a `comment` to a Request record also adds the same comment to the activity log of all its active child Task records.
- [ ] Verify that the name of the user who added the comment is correctly attributed on the child Tasks' activity logs.
- [ ] Verify that the anti-looping mechanism works and does not cause an infinite update loop when a comment is first added on a child task.
- [ ] Verify that comments are NOT copied to tasks that are already closed.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] The script should not throw an unhandled exception if the request has no active child tasks.

### Quality Criteria
- [ ] The use of a "before" business rule is appropriate for this action.
- [ ] The anti-looping condition is robust and essential for system stability.