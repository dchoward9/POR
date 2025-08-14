import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '4d33aa5a932e2a10d5ec31697bba10d3',
    script: `// if (
//     (current.requested_for == gs.getUserID()) || // the request was submitted for this user
//     (gs.hasRole('x_1118046_partne_0.viewer')) || // user has app viewer role
// 	(current.requested_for.manager == gs.getUserID()) || // user is requested for's manager
// 	(current.requested_for.department.dept_head == gs.getUserID()) // user is requested for's department head
// ) {
//     answer = true;
// }

// test where any of these conditions return null, such as department doesn't exist, manager doesn't exist
// consider explicit answer = false for else statement

 answer = false;

 // Get current user ID once
 var userID = gs.getUserID();

 // Defensive checks
 var requestedFor = current.requested_for;
//  var requestedForManager = requestedFor.manager;
//  var requestedForDept = requestedFor.department;
//  var deptHead = requestedForDept ? requestedForDept.dept_head : null;

 // Check access conditions
 var isRequestedFor = requestedFor == userID;
 var isViewer = gs.hasRole('x_1118046_partne_0.viewer');
//  var isManager = requestedForManager == userID;
//  var isDeptHead = deptHead == userID;

 // Grant access if any condition is true
 if (isRequestedFor || isViewer) {
     answer = true;
 }`,
    active: true,
    admin_overrides: false,
    decision_type: 'deny',
    description:
        'Deny-Unless ACL. This rule acts as a gatekeeper, denying read access to all Request records by default. This prevents users with broad, inherited roles (like itil) from seeing records they shouldn\'t. Specific "Allow-If" rules are required to grant access.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'read',
})
