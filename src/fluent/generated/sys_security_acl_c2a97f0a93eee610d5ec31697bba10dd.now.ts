import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'c2a97f0a93eee610d5ec31697bba10dd',
    script: ``,
    active: true,
    admin_overrides: false,
    condition:
        'requested_for.managerDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORrequested_for.department.dept_headDYNAMIC90d1921e5f510100a9ad2572f2b477fe^EQ',
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants read access to a Request record for the Manager persona (via the 'viewer' role). Access is granted if the current user is the manager of the 'Requested For' user, or the head of their department.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'read',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
