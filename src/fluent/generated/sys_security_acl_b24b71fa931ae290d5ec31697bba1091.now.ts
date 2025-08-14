import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'b24b71fa931ae290d5ec31697bba1091',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'deny',
    description:
        'Deny-Unless ACL. This rule acts as a gatekeeper, denying the ability to delete Task records by default. This prevents users with broad, inherited roles (like itil) from deleting records. A specific "Allow-If" rule is required to grant access.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'delete',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
