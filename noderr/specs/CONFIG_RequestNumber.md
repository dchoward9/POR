File: noderr/specs/CONFIG_RequestNumber.md

# CONFIG_RequestNumber.md

## Purpose
To define and manage the automatic numbering scheme for records created in the `x_1118_partne_0_requests` table, ensuring each request receives a unique, sequential, and prefixed identifier.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_number_321665be9396e290d5ec31697bba103c.now.ts` (This file represents the `sys_number` record).
- **Current interfaces**: This configuration is applied automatically by the ServiceNow platform whenever a new record is inserted into the `x_1118046_partne_0_requests` table.
- **Dependencies**: `MODEL_Request`.
- **Dependents**: All components that display or reference a Request record, as they rely on this unique identifier.

## Core Logic & Functionality
-   This is a configuration record that instructs the platform's numbering engine.
-   **Table:** It is configured to act on the `x_1118046_partne_0_requests` table.
-   **Prefix:** It sets a prefix of `PARTREQ` for all new record numbers.
-   **Numbering:** It maintains a counter (starting at 1000) and assigns the next available number to a new record.
-   **Result:** A newly created request will have a number like `PARTREQ1001`.

## Current Quality Assessment
- **Completeness**: The number record is fully configured and works as expected.
- **Code Quality**: N/A (This is a configuration record).
- **Test Coverage**: The creation of records with the correct number format is validated in the ATF suite (`TEST_ATFSuite`).
- **Documentation**: The record name and prefix are self-documenting.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```servicenow
// This is a configuration record, not an API.
// Example output on a new GlideRecord('x_1118046_partne_0_requests'):
// record.number -> "PARTREQ1001"
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that creating a new record in the `x_1118046_partne_0_requests` table results in a number field populated with the prefix "PARTREQ".
- [ ] Verify that subsequent records are numbered sequentially (e.g., PARTREQ1001, PARTREQ1002).

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] Verify the prefix is unique and descriptive for the application.