File: noderr/specs/SCRIPT_RequestStageManager.md

# SCRIPT_RequestStageManager.md

## Purpose
To act as the primary mechanism for updating the `state` and `comments` of a parent Request record based on changes to its `stage`. This server-side script ensures that the operational state of the request accurately reflects its position in the workflow.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_0c321d5a9313ea50d5ec31697bba1064.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a "before insert/update" Business Rule that triggers when the `stage` field on a Request record changes.
- **Dependencies**: `MODEL_Request` (specifically the `stage`, `state`, and `comments` fields).
- **Dependents**: The entire application state model. `FLOW_MainRequest` and `FLOW_TaskSubflow` both change the `stage`, which in turn triggers this script to update the `state`.

## Core Logic & Functionality
1.  The Business Rule is triggered before a `x_1118046_partne_0_requests` record is saved.
2.  The trigger condition is `stage` changes.
3.  A `switch` statement evaluates the new value of the `stage` field.
4.  Based on the stage, it sets the appropriate `state` and adds a descriptive comment to the `comments` (Additional Comments) journal field.
    -   `waiting_for_approval` -> `state` = Pending
    -   `negotiating_pricing`, `contract_redlining`, etc. -> `state` = Work in Progress
    -   `complete` -> `state` = Closed Complete
    -   `request_rejected` -> `state` = Canceled. It also calls a helper function to pull the rejection reason from the related approval record.
    -   `closed_incomplete` -> `state` = Closed Incomplete
    -   `canceled` -> `state` = Canceled
5.  The changes to `state` and `comments` are saved as part of the same database transaction that triggered the rule.

## Current Quality Assessment
- **Completeness**: The script handles all defined stages in the workflow and correctly maps them to the appropriate states.
- **Code Quality**: The use of a `switch` statement is clean and efficient. The logic for retrieving rejection comments is well-encapsulated in a helper function.
- **Test Coverage**: The state and stage transitions are a core part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: Before insert/update on x_1118046_partne_0_requests
// Condition: current.stage.changes()

(function executeRule(current, previous) {
    var stage = current.stage;
    switch (String(stage)) {
        case 'waiting_for_approval':
            current.state = '-5'; // pending
            break;
        case "complete":
            current.state = '3'; // closed complete
            break;
        // ... other cases
    }
})(current, previous);
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when a request's `stage` changes to "Waiting for Approval", its `state` becomes "Pending".
- [ ] Verify that when a request's `stage` changes to "Negotiating Pricing", its `state` becomes "Work in Progress".
- [ ] Verify that when a request's `stage` changes to "Complete", its `state` becomes "Closed Complete".
- [ ] Verify that when a request's `stage` changes to "Request Rejected", its `state` becomes "Canceled" and the rejection comments are added.

### Input Validation Criteria  
- [ ] The script should have a default case in the switch statement to handle any unexpected stage values.

### Error Handling Criteria
- [ ] The script should not fail if the helper function to get rejection comments finds no approval record.

### Quality Criteria
- [ ] The mapping between stages and states should be logical and consistent with the process.
- [ ] The script should be a "before" rule to ensure data consistency in a single transaction.