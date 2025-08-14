import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '224b71fa931ae290d5ec31697bba106d',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'deny',
    description:
        'Deny-Unless ACL. This rule acts as a gatekeeper, denying the ability to create new Task records by default. This prevents users with broad, inherited roles (like itil) from creating records. A specific "Allow-If" rule is required to grant access.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'create',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
