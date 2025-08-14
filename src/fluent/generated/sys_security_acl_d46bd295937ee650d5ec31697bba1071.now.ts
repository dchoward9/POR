import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'd46bd295937ee650d5ec31697bba1071',
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
 //var isViewer = gs.hasRole('x_1118046_partne_0.viewer');
//  var isManager = requestedForManager == userID;
//  var isDeptHead = deptHead == userID;

 // Grant access if any condition is true
 if (isRequestedFor) {
     answer = true;
 }`,
    active: true,
    admin_overrides: false,
    condition: 'requested_forDYNAMIC90d1921e5f510100a9ad2572f2b477fe^EQ',
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants read access to a Request record for the Requester persona. Access is granted if the current user is the person listed in the 'Requested For' field.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'read',
})
