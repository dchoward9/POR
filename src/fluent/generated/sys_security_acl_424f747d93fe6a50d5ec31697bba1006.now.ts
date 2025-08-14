import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '424f747d93fe6a50d5ec31697bba1006',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the Comments field for the Fulfiller persona (user role).',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'comments',
    operation: 'write',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
