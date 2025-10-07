File: noderr/specs/ACL_TaskRecords.md

# ACL_TaskRecords.md

## Purpose
To define and enforce the security rules (Access Control Lists) for the `x_1118046_partne_0_tasks` table. This ensures that fulfillers can only access tasks assigned to them or their group, and that requesters/managers can view the status of tasks related to their requests.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `sys_security_acl` records where `name` = `x_1118046_partne_0_tasks`.
- **Current interfaces**: These ACLs are triggered by the ServiceNow security engine whenever a user attempts to perform a CRUD operation on a Task record.
- **Dependencies**: `MODEL_Task`, various user roles (`x_1118046_partne_0.admin`, `x_1118046_partne_0.user`, `x_1118046_partne_0.viewer`).
- **Dependents**: The entire fulfillment and request tracking process depends on these ACLs.

## Core Logic & Functionality
Similar to the Request table, this component uses a "deny-by-default" model to ensure data security.
- **Default Deny:** Table-level `read` and `write` ACLs deny access to all users unless another rule grants it.
- **Admin Access:** The `admin` role has full CRUD access to all task records.
- **Fulfiller Access (`user` role):** A user with the `user` role can read and write to a task if they are a member of the `assignment_group` on that task. This is the primary rule for fulfillers.
- **Requester/Manager Access:** The original requester and their manager can read tasks associated with their parent request to maintain visibility.
- **Field-Level Security:** Specific fields, like `partner_onboarding_request`, are made read-only after creation to maintain data integrity.

## Current Quality Assessment
- **Completeness**: The ACLs cover all necessary operations and roles for the fulfillment process.
- **Code Quality**: The rules use simple conditions and role checks, following platform best practices.
- **Test Coverage**: Validated as part of the ATF suite (`TEST_ATFSuite`), which includes impersonating fulfillers to check access.
- **Documentation**: ACLs have clear descriptions explaining their purpose.

## Technical Debt & Improvement Areas
- None identified. The model is effective for the current requirements.

## Interface Definition
```servicenow
// This is a conceptual representation of the ACL rules.

// DENY ALL (Read)
{ operation: 'read', table: 'tasks', role: 'viewer', condition: 'deny' }

// ALLOW IF...
{ operation: 'read', table: 'tasks', role: 'admin' }
{ operation: 'read', table: 'tasks', role: 'user', condition: 'currentUser.isMemberOf(record.assignment_group)' }
{ operation: 'read', table: 'tasks', condition: 'isRequesterOrManagerForParentRequest(currentUser, record.partner_onboarding_request)' }

// DENY ALL (Write)
{ operation: 'write', table: 'tasks', role: 'viewer', condition: 'deny' }

// ALLOW IF...
{ operation: 'write', table: 'tasks', role: 'admin' }
{ operation: 'write', table: 'tasks', role: 'user', condition: 'currentUser.isMemberOf(record.assignment_group)' }
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify a user with the `admin` role can read and write to any Task record.
- [ ] Verify a fulfiller with the `user` role can read and write to a Task assigned to their group.
- [ ] Verify a fulfiller CANNOT read or write to a Task assigned to a different group.
- [ ] Verify a requester can read (but not write to) the Tasks associated with their parent Request.
- [ ] Verify a user with only the `itil` role CANNOT read any Task records.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that an unauthorized user attempting to access a task record URL is shown a "Security constraints prevent access" message.

### Quality Criteria
- [ ] Security review confirms that fulfillers cannot access or modify tasks outside their assigned group.
- [ ] Maintainability assessment confirms the rules are clear and easy to manage.