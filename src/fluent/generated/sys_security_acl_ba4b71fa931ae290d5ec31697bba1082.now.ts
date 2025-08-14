import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'ba4b71fa931ae290d5ec31697bba1082',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'deny',
    description:
        'Deny-Unless ACL. This rule acts as a gatekeeper, denying read access to all Task records by default. This prevents users with broad, inherited roles (like itil) from seeing records they shouldn\'t. Specific "Allow-If" rules are required to grant access.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'read',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
