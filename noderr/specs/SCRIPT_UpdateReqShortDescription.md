File: noderr/specs/SCRIPT_UpdateReqShortDescription.md

# SCRIPT_UpdateReqShortDescription.md

## Purpose
To automatically generate a clear and consistent `short_description` for a Partner Onboarding Request record. This ensures that all requests are easily identifiable in lists and reports.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_686ece76939ae290d5ec31697bba10b8.now.ts` (This file represents the Business Rule record).
- **Current interfaces**: This is a "before insert/update" Business Rule that triggers when the `partner_full_legal_name` field on a Request record changes.
- **Dependencies**: `MODEL_Request` (specifically the `partner_full_legal_name` and `short_description` fields).
- **Dependents**: Any UI component (lists, forms, dashboards) that displays the `short_description` of a request.

## Core Logic & Functionality
1.  The Business Rule is triggered before a `x_1118046_partne_0_requests` record is saved to the database.
2.  The trigger condition is `partner_full_legal_name` changes.
3.  The script takes the value from the `partner_full_legal_name` field.
4.  It concatenates this value with the static string "Partner Onboarding Request: ".
5.  It sets the `short_description` field to this new concatenated string.
6.  Because this is a "before" rule, the change is saved as part of the original database transaction.

## Current Quality Assessment
- **Completeness**: The script successfully and consistently formats the short description.
- **Code Quality**: The script is extremely simple and efficient.
- **Test Coverage**: The correct formatting of the short description is validated in the ATF suite (`TEST_ATFSuite`).
- **Documentation**: The Business Rule has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a server-side script (Business Rule), not a direct API.
// Trigger: Before insert/update on x_1118046_partne_0_requests
// Condition: current.partner_full_legal_name.changes()

(function executeRule(current, previous) {
	current.short_description = 'Partner Onboarding Request: ' + current.partner_full_legal_name;
})(current, previous);
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when a new Request is created with a partner name of "Example Inc.", the short description is set to "Partner Onboarding Request: Example Inc.".
- [ ] Verify that if an existing Request's partner name is changed, the short description is updated accordingly.
- [ ] Verify that the script does not run if other fields are changed but the partner name is not.

### Input Validation Criteria  
- [ ] The script should gracefully handle cases where `partner_full_legal_name` is empty.

### Error Handling Criteria
- [ ] N/A

### Quality Criteria
- [ ] The use of a "before" business rule is the most efficient method for this operation.
- [ ] The naming convention for the short description should be consistent and easy to understand.