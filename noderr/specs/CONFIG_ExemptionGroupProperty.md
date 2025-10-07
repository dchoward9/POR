File: noderr/specs/CONFIG_ExemptionGroupProperty.md

# CONFIG_ExemptionGroupProperty.md

## Purpose
To provide a centralized, configurable setting that stores the `sys_id` of the "Partner Onboarding - Approval Exempt" group. This allows the application's logic to be modified without requiring code changes.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_properties_a4c612be9376ee50d5ec31697bba100f.now.ts` (This file represents the system property record `sys_properties`).
- **Current interfaces**: The property is accessed server-side via the GlideSystem API: `gs.getProperty('x_1118046_partne_0.por.exemption')`.
- **Dependencies**: The `sys_user_group` record for the "Partner Onboarding - Approval Exempt" group must exist for the stored `sys_id` to be valid.
- **Dependents**: `SCRIPT_CheckExemption` (Client Script) uses this property (via a GlideAjax call to `SCRIPT_checkGroupMembership`) to determine if the manager approval field should be hidden on the request form.

## Core Logic & Functionality
-   This component is a simple key-value pair stored in the ServiceNow database.
-   **Key:** `x_1118046_partne_0.por.exemption`
-   **Value:** The `sys_id` of the group whose members are exempt from manager approval.
-   By using a system property, administrators can change which group is used for exemptions by simply updating the value of this record, rather than editing and deploying new code.

## Current Quality Assessment
- **Completeness**: The property is created and correctly stores the `sys_id`.
- **Code Quality**: N/A (This is a configuration record).
- **Test Coverage**: The functionality that uses this property is tested in the ATF suite (`TEST_ATFSuite`), specifically in the "POR Approval Exemption" test.
- **Documentation**: The property has a clear description explaining its purpose.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// Server-side access pattern
var exemptionGroupId = gs.getProperty('x_1118046_partne_0.por.exemption');
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that the system property `x_1118046_partne_0.por.exemption` exists in the system.
- [ ] Verify that its value is a valid 32-character `sys_id`.
- [ ] Verify that the `sys_id` corresponds to the "Partner Onboarding - Approval Exempt" group.
- [ ] Verify that changing the value of this property correctly changes the exemption behavior in the `UI_RequestForm` without any code changes.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that scripts using this property handle cases where the property might be empty or contain an invalid `sys_id`.

### Quality Criteria
- [ ]