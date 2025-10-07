File: noderr/specs/SCRIPT_CalculateRequestDuration.md

# SCRIPT_CalculateRequestDuration.md

## Purpose
To automatically calculate and store the total business duration of a Partner Onboarding Request when it is closed. This provides a key metric for reporting and process improvement.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_c79cd26593b26a50d5ec31697bba1039.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a server-side "after update" Business Rule that triggers when a Request record's `active` field changes to `false`.
- **Dependencies**: `MODEL_Request` (specifically the `opened_at`, `closed_at`, and `business_duration` fields).
- **Dependents**: Any reports or dashboards (`UI_AdminDashboard`) that display the average onboarding time.

## Core Logic & Functionality
1.  The Business Rule is triggered after a record in the `x_1118046_partne_0_requests` table is updated.
2.  The trigger condition is `active` changes to `false`.
3.  The script creates two `GlideDateTime` objects: one from the `opened_at` timestamp and one from the `closed_at` timestamp.
4.  It uses the `GlideDateTime.subtract()` method to calculate the duration between these two timestamps.
5.  The resulting duration is then stored in the `business_duration` field of the current record.
6.  Because this is an "after" rule, it updates the record without triggering another round of business rules, preventing recursive loops.

## Current Quality Assessment
- **Completeness**: The script correctly calculates the duration as required.
- **Code Quality**: The script is simple, efficient, and uses the recommended ServiceNow APIs for date/time calculations.
- **Test Coverage**: The closure of a request and the subsequent calculation are part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: After update on x_1118046_partne_0_requests
// Condition: current.active.changesTo(false)

(function executeRule(current, previous) {
    var gdt1 = new GlideDateTime(current.opened_at);
    var gdt2 = new GlideDateTime(current.closed_at);
    var dur = GlideDateTime.subtract(gdt1, gdt2);
	current.business_duration = dur;
})(current, previous);
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when a Request record's `active` field is set to `false`, the `business_duration` field is populated with a valid duration value.
- [ ] Verify that the calculated duration is the correct difference between the `closed_at` and `opened_at` timestamps.
- [ ] Verify that the script does not run if other fields on the Request are updated but `active` remains `true`.

### Input Validation Criteria  
- [ ] The script should handle cases where `opened_at` or `closed_at` might be null, although this is unlikely due to platform defaults.

### Error Handling Criteria
- [ ] The script should not throw an unhandled exception if date fields are in an unexpected format.

### Quality Criteria
- [ ] The script should use the `GlideDateTime` API for all date/time operations, as this is best practice.