File: noderr/specs/SCRIPT_CascadeCommentsToRequest.md

# SCRIPT_CascadeCommentsToRequest.md

## Purpose
To ensure seamless communication by automatically copying comments (customer-visible notes) from a child fulfillment task up to its parent onboarding request. This provides the original requester with visibility into the work being done without needing to view each individual task.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_369c572993f66a50d5ec31697bba107c.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a server-side "before update" Business Rule that triggers when the `comments` field on a Task record changes.
- **Dependencies**: `MODEL_Task`, `MODEL_Request`.
- **Dependents**: `UI_RequestView` (the activity log on the request form is populated by these updates).

## Core Logic & Functionality
1.  The Business Rule is triggered before a record in the `x_1118046_partne_0_tasks` table is updated.
2.  The trigger condition is `comments` changes.
3.  The script retrieves the parent `partner_onboarding_request` record.
4.  It then copies the new comment from the task to the `comments` field of the parent request.
5.  **Anti-Looping Mechanism:** To prevent an infinite loop (where the request update would trigger other rules that update the task, which would trigger this rule again), it adds a special invisible HTML tag (`<p DoNotCopy></p>`) to the comment being copied. A corresponding condition on the `SCRIPT_CascadeCommentsToTasks` rule (`current.comments.indexOf('DoNotCopy') == -1`) prevents it from re-copying this same comment back down.
6.  The script then updates the parent request record.

## Current Quality Assessment
- **Completeness**: The script successfully copies comments as intended.
- **Code Quality**: The script is efficient and includes a necessary anti-looping mechanism, which is a critical best practice for this type of rule.
- **Test Coverage**: The functionality is tested as part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified. The anti-looping mechanism is well-implemented.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: Before update on x_1118046_partne_0_tasks
// Condition: current.comments.changes()

(function executeRule(current, previous) {
    var requestGR = new GlideRecord('x_1118046_partne_0_requests');
    if (requestGR.get(current.partner_onboarding_request)) {
        copyComments(requestGR, current.comments);
    }
})(current, previous);

function copyComments(request, comments) {
    request.comments = '[code]<p DoNotCopy></p>[/code]' + comments;
    request.update();
}
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that adding a `comment` to a Task record also adds the same comment to the activity log of the parent Request record.
- [ ] Verify that the name of the user who added the comment is correctly attributed on the parent Request's activity log.
- [ ] Verify that the anti-looping mechanism works and does not cause an infinite update loop between the task and the request.

### Input Validation Criteria  
- [ ] The script should gracefully handle a case where a task's parent request field is empty (though this is prevented by data modeling).

### Error Handling Criteria
- [ ] The script should not throw an unhandled exception if the parent request record cannot be found.

### Quality Criteria
- [ ] The use of a "before" business rule is appropriate for this action.
- [ ] The anti-looping mechanism should be robust and clearly commented.