File: noderr/specs/SCRIPT_GetFlowData.md

# SCRIPT_GetFlowData.md

## Purpose
To provide the client-side UI with necessary context about the backend workflow associated with a Request record. This business rule populates a scratchpad object (`g_scratchpad`) that UI Actions can then use to decide their visibility and behavior.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_0cb7af7e93faee50d5ec31697bba1062.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a server-side "display" Business Rule that runs whenever a `x_1118046_partne_0_requests` record is displayed to a user.
- **Dependencies**: `MODEL_Request`, `PartnerFlowUtil` Script Include.
- **Dependents**: The "Flow Context" UI Action on the Request form, which uses `g_scratchpad.flowData` to determine if it should be visible.

## Core Logic & Functionality
1.  The Business Rule is triggered when a Request record form is being loaded for display.
2.  It only runs for existing records (not on a new record form).
3.  It instantiates the `PartnerFlowUtil` script include.
4.  It calls the `getFlowData()` method, passing in the current Request record (`current`).
5.  The `getFlowData()` method queries the `sys_flow_context` table to find any workflow contexts linked to the current Request record.
6.  It returns an object containing:
    -   `hasFlows` (boolean): Whether any flows were found.
    -   `hasMultipleFlows` (boolean): Whether more than one flow was found.
    -   `flowId` (string): The `sys_id` of the flow context if only one was found.
    -   `flowQuery` (string): An encoded query to find all related flows if multiple exist.
7.  The Business Rule places this returned object onto the scratchpad: `g_scratchpad.flowData = ...`.
8.  Client-side components, like UI Actions, can then access this object to make decisions (e.g., `if (g_scratchpad.flowData.hasFlows) { // show button }`).

## Current Quality Assessment
- **Completeness**: The script correctly identifies and provides context for associated flows.
- **Code Quality**: The logic is properly encapsulated in a separate Script Include (`PartnerFlowUtil`), which is a best practice for keeping Business Rules clean and reusable.
- **Test Coverage**: The visibility of the "Flow Context" UI Action, which depends on this script, is implicitly tested in the ATF suite.
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: On display of x_1118046_partne_0_requests record.

// Populates g_scratchpad with an object like this:
g_scratchpad.flowData = {
    hasFlows: true,
    hasMultipleFlows: false,
    flowId: 'a1b2c3d4e5f6...',
    flowQuery: 'source_record=f1e2d3c4b5a6...'
};
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when viewing a Request record that has an active workflow, `g_scratchpad.flowData.hasFlows` is `true`.
- [ ] Verify that when viewing a Request record with no active workflow, `g_scratchpad.flowData.hasFlows` is `false`.
- [ ] Verify that the "Flow Context" UI Action is visible on a record with a flow and hidden on a record without one.

### Input Validation Criteria  
- [ ] The script should handle the case of a new record (`current.isNewRecord()`) and not execute.

### Error Handling Criteria
- [ ] The `PartnerFlowUtil` script should handle cases where the query to `sys_flow_context` returns no records, and correctly set `hasFlows` to `false`.

### Quality Criteria
- [ ] The logic should be contained within a Script Include rather than directly in the Business Rule for better code organization.
- [ ] The scratchpad object should be named clearly and not conflict with other potential scratchpad objects.