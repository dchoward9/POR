import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '55289691937ee650d5ec31697bba1046',
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
 var isUser = gs.hasRole('x_1118046_partne_0.user');
//  var isManager = requestedForManager == userID;
//  var isDeptHead = deptHead == userID;

 // Grant access if any condition is true
 if (isRequestedFor || isUser) {
     answer = true;
 }
`,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants write access to the Comments field for the Requester and Fulfiller personas. Access is granted if the user is the 'Requested For' or has the 'user' role.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    field: 'comments',
    operation: 'write',
})
