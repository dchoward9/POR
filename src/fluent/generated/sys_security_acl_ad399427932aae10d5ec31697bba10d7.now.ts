import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'ad399427932aae10d5ec31697bba10d7',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the Assigned To field for the Fulfiller persona (user role).',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'assigned_to',
    operation: 'write',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
