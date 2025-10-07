File: noderr/specs/ACL_TaskConfigRecords.md

# ACL_TaskConfigRecords.md

## Purpose
To define and enforce the security rules (Access Control Lists) for the `x_1118046_partne_0_task_config` table. This ensures that only administrators can manage the records that define how and when fulfillment tasks are created.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `sys_security_acl` records where `name` = `x_1118046_partne_0_task_config`.
- **Current interfaces**: These ACLs are triggered by the ServiceNow security engine whenever a user attempts to perform a CRUD operation on a Task Config record.
- **Dependencies**: `MODEL_TaskConfig`, the `x_1118046_partne_0.admin` role.
- **Dependents**: `FLOW_MainRequest` depends on these records being readable by the system user.

## Core Logic & Functionality
The security model for this table is highly restrictive, as these records control core business logic.
- **Admin-Only Access:** Only users with the `x_1118046_partne_0.admin` role are granted full CRUD (Create, Read, Update, Delete) access.
- **Default Deny:** All other users, including standard fulfillers and viewers, are denied access to prevent unauthorized changes to the workflow logic.

## Current Quality Assessment
- **Completeness**: The ACLs are complete and correctly restrict access to administrators only.
- **Code Quality**: The rules are simple role-based checks and require no scripting.
- **Test Coverage**: Administrative access is implicitly tested by the ATF suite's ability to run.
- **Documentation**: ACLs have clear descriptions.

## Technical Debt & Improvement Areas
- None identified. The configuration is simple and secure.

## Interface Definition
```servicenow
// This is a conceptual representation of the ACL rules.

// ALLOW IF admin
{ operation: 'read', table: 'task_config', role: 'admin' }
{ operation: 'write', table: 'task_config', role: 'admin' }
{ operation: 'create', table: 'task_config', role: 'admin' }
{ operation: 'delete', table: 'task_config', role: 'admin' }

// DENY all other roles implicitly.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify a user with the `admin` role can create, read, update, and delete Task Config records.
- [ ] Verify a user with only the `user` (Fulfiller) role CANNOT read or write to any Task Config records.
- [ ] Verify a user with only the `viewer` role CANNOT read or write to any Task Config records.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that a non-admin user attempting to access the table list or a record URL is shown a "Security constraints prevent access" message.

### Quality Criteria
- [ ] Security review confirms that no non-admin roles can modify these critical configuration records.