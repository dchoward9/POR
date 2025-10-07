File: noderr/specs/CONFIG_TaskNumber.md

# CONFIG_TaskNumber.md

## Purpose
To define and manage the automatic numbering scheme for records created in the `x_1118046_partne_0_tasks` table, ensuring each fulfillment task receives a unique, sequential, and prefixed identifier.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_number_0ee9fe4c933e6250d5ec31697bba10d7.now.ts` (This file represents the `sys_number` record).
- **Current interfaces**: This configuration is applied automatically by the ServiceNow platform whenever a new record is inserted into the `x_1118046_partne_0_tasks` table.
- **Dependencies**: `MODEL_Task`.
- **Dependents**: All components that display or reference a Task record, as they rely on this unique identifier.

## Core Logic & Functionality
-   This is a configuration record that instructs the platform's numbering engine.
-   **Table:** It is configured to act on the `x_1118046_partne_0_tasks` table.
-   **Prefix:** It sets a prefix of `PORTASK` for all new record numbers.
-   **Numbering:** It maintains a counter (starting at 10000) and assigns the next available number to a new record.
-   **Result:** A newly created task will have a number like `PORTASK10001`.

## Current Quality Assessment
- **Completeness**: The number record is fully configured and works as expected.
- **Code Quality**: N/A (This is a configuration record).
- **Test Coverage**: The creation of task records with the correct number format is validated in the ATF suite (`TEST_ATFSuite`).
- **Documentation**: The record name and prefix are self-documenting.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```servicenow
// This is a configuration record, not an API.
// Example output on a new GlideRecord('x_1118046_partne_0_tasks'):
// record.number -> "PORTASK10001"
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that creating a new record in the `x_1118046_partne_0_tasks` table results in a number field populated with the prefix "PORTASK".
- [ ] Verify that subsequent records are numbered sequentially (e.g., PORTASK10001, PORTASK10002).

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] Verify the prefix is unique and descriptive for the application.