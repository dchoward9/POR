File: noderr/specs/SCRIPT_UpdateTaskWorkNotes.md

# SCRIPT_UpdateTaskWorkNotes.md

## Purpose
To keep fulfillment teams informed by automatically pushing updates from key fields on the parent Request record to the Work Notes of all active child Task records. This ensures that if critical information changes on the request, all relevant fulfillers are notified.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_c7108f48937e6250d5ec31697bba103f.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a "before update" Business Rule that triggers when certain fields on a Request record are changed.
- **Dependencies**: `MODEL_Request`, `MODEL_Task`.
- **Dependents**: Fulfillers who monitor the Work Notes of their assigned tasks.

## Core Logic & Functionality
1.  The Business Rule is triggered before a `x_1118046_partne_0_requests` record is updated.
2.  The trigger condition checks if any of the following fields have changed: `business_justification`, `description_of_services`, `partner_contact_information`, `sensitive_data_access`, or `partner_full_legal_name`.
3.  The script constructs a message string (`msg`) detailing which fields have changed and what their old and new values are.
4.  It then queries for all active child tasks associated with the current request.
5.  It iterates through each active task and appends the `msg` string to the task's `work_notes` journal field.
6.  Each task record is then updated.

## Current Quality Assessment
- **Completeness**: The script correctly identifies changes on the parent and cascades them to the children.
- **Code Quality**: The script is efficient, building a single message and then iterating through the child records.
- **Test Coverage**: This functionality is tested as part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: Before update on x_1118046_partne_0_requests
// Condition: One of several key fields changes.

(function executeRule(current, previous) {
    var msg = "";
    // Build message based on which fields changed...
    if (previous.partner_full_legal_name != current.partner_full_legal_name) {
        msg += "The partner's full legal name has changed from '...' to '...' .\\n\\n";
	}
    // ... (other fields)

    var taskGR = new GlideRecord("x_1118046_partne_0_tasks");
    taskGR.addQuery("partner_onboarding_request", current.sys_id);
    taskGR.addActiveQuery();
    taskGR.query();

    while (taskGR.next()) {
        taskGR.work_notes = msg;
        taskGR.update();
    }
})(current, previous);
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that changing the `business_justification` on a Request record adds a corresponding entry to the `work_notes` of all its active child Tasks.
- [ ] Verify that the work note entry correctly identifies the field that was changed and its previous and new values.
- [ ] Verify that the script does NOT add a work note to tasks that are already closed.
- [ ] Verify that the script does NOT run if a field not in the condition (e.g., `comments`) is changed.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] The script should not fail if the request has no active child tasks.

### Quality Criteria
- [ ] The work note messages should be clear, concise, and easy for a fulfiller to understand.