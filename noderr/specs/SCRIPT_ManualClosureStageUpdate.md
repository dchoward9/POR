File: noderr/specs/SCRIPT_ManualClosureStageUpdate.md

# SCRIPT_ManualClosureStageUpdate.md

## Purpose
To maintain data consistency by automatically setting the correct final `stage` on a Request record if a user manually changes the `state` to a closed value. This prevents a record from being in a closed `state` but having an open `stage` (e.g., "Work in Progress").

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_430187639336e290d5ec31697bba10c2.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a server-side "before update" Business Rule that triggers when a Request record's `state` changes to a closed value.
- **Dependencies**: `MODEL_Request` (specifically the `state` and `stage` fields).
- **Dependents**: Any UI component or report that displays the `stage` field, as this rule ensures its accuracy upon closure.

## Core Logic & Functionality
1.  The Business Rule is triggered before a record in the `x_1118046_partne_0_requests` table is updated.
2.  The trigger condition is `state` changes to `Closed Complete`, `Closed Incomplete`, or `Canceled`.
3.  The script first checks if the `stage` is already a final stage (like `request_rejected`, `canceled`, `complete`). If it is, the script does nothing, assuming the `SCRIPT_RequestStageManager` rule has already set the correct final stage. This prevents conflicts.
4.  If the `stage` is still an open stage, the script uses a `switch` statement based on the new `state` value:
    -   If `state` is `Closed Incomplete`, it sets `stage` to `closed_incomplete`.
    -   If `state` is `Canceled`, it sets `stage` to `canceled`.
    -   For any other closed state (primarily `Closed Complete`), it sets `stage` to `complete`.
5.  Since this is a "before" rule, the changes are saved with the user's original update in a single database transaction.

## Current Quality Assessment
- **Completeness**: The script correctly handles all relevant closed states and updates the stage accordingly.
- **Code Quality**: The script is efficient and includes a check to prevent it from overriding other workflow-driven stage changes, which is good practice.
- **Test Coverage**: Manual closure scenarios can be tested, though they are less common than the standard workflow path.
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: Before update on x_1118046_partne_0_requests
// Condition: state.changesTo(3) || state.changesTo(4) || state.changesTo(7)

(function executeRule(current, previous) {
    var state = current.state;
    var stage = current.stage;

    // Prevent overriding a final stage already set by another rule
	if (stage.toString() === "request_rejected" ||
		stage.toString() === "canceled" ||
		stage.toString() === "complete" ||
		stage.toString() === "closed_incomplete") {
		return true;
	}

    switch (String(state)) {
        case '4': // closed incomplete
            current.stage = 'closed_incomplete';
            break;
        case '7': // canceled
            current.stage = 'canceled';
            break;
        default: // else, complete
            current.stage = 'complete';
            break;
    }
})(current, previous);
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that manually changing a Request's `state` to "Closed Complete" also changes its `stage` to "Complete".
- [ ] Verify that manually changing a Request's `state` to "Closed Incomplete" also changes its `stage` to "Closed Incomplete".
- [ ] Verify that manually changing a Request's `state` to "Canceled" also changes its `stage` to "Canceled".
- [ ] Verify that if the `stage` is already "Request Rejected", manually changing the `state` to "Canceled" does NOT override the stage.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The script should be a "before" rule to ensure data consistency in a single transaction.
- [ ] The script must include logic to avoid interfering with stage changes made by other business rules or workflows.