File: noderr/specs/ACL_RequestRecords.md

# ACL_RequestRecords.md

## Purpose
To define and enforce the security rules (Access Control Lists) for the `x_1118046_partne_0_requests` table, ensuring that users can only read, write, create, and delete records according to their defined roles and relationship to the data.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `sys_security_acl` records where `name` = `x_1118046_partne_0_requests`.
- **Current interfaces**: These ACLs are triggered by the ServiceNow security engine whenever a user attempts to perform a CRUD (Create, Read, Update, Delete) operation on a Request record.
- **Dependencies**: `MODEL_Request`, various user roles (`x_1118046_partne_0.admin`, `x_1118046_partne_0.user`, `x_1118046_partne_0.viewer`).
- **Dependents**: The entire application depends on these ACLs to function securely.

## Core Logic & Functionality
The system implements a "deny-by-default" security model for the Request table. A series of specific "allow-if" rules then grant access based on the user's role and their relationship to the record.
- **Default Deny:** A table-level `read` and `write` ACL denies access to all users unless another rule grants it. This prevents users with broad roles like `itil` from accessing the records.
- **Admin Access:** The `admin` role has full CRUD access to all records.
- **Fulfiller Access (`user` role):** Fulfillers can read and write to most fields (like comments and work notes) on all records.
- **Manager/Viewer Access (`viewer` role):** Managers and department heads can read requests submitted by their direct reports or department members.
- **Requester Access:** The user in the `requested_for` field can read their own request.

## Current Quality Assessment
- **Completeness**: The ACLs cover all standard CRUD operations and provide a strong, secure foundation.
- **Code Quality**: The conditions and scripts are simple and follow ServiceNow best practices.
- **Test Coverage**: Security rules are validated as part of the ATF suite (`TEST_ATFSuite`).
- **Documentation**: ACLs have clear descriptions explaining their purpose.

## Technical Debt & Improvement Areas
- None identified. The security model is robust for the current requirements.

## Interface Definition
```servicenow
// This is a conceptual representation of the ACL rules.

// DENY ALL (Read)
{ operation: 'read', table: 'requests', role: 'viewer', condition: 'deny' }

// ALLOW IF...
{ operation: 'read', table: 'requests', role: 'admin' }
{ operation: 'read', table: 'requests', role: 'user' }
{ operation: 'read', table: 'requests', condition: 'isRequester(currentUser)' }
{ operation: 'read', table: 'requests', role: 'viewer', condition: 'isManagerOrDeptHead(currentUser, record.requested_for)' }

// DENY ALL (Write)
{ operation: 'write', table: 'requests', role: 'viewer', condition: 'deny' }

// ALLOW IF...
{ operation: 'write', table: 'requests', role: 'admin' }
{ operation: 'write', table: 'requests.comments', role: 'user' }
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify a user with the `admin` role can read and write to any Request record.
- [ ] Verify a user with the `user` role (Fulfiller) can read any Request record and write to its `comments` and `work_notes` fields.
- [ ] Verify a user can read a Request record where they are the `requested_for`.
- [ ] Verify a manager can read a Request record where their direct report is the `requested_for`.
- [ ] Verify a user with only the `itil` role CANNOT read any Request records.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that an unauthorized user attempting to access a record URL is redirected to a "Security constraints prevent access" page.

### Quality Criteria
- [ ] Security review confirms no privilege escalation paths exist.
- [ ] Maintainability assessment confirms that adding new roles or conditions is straightforward.