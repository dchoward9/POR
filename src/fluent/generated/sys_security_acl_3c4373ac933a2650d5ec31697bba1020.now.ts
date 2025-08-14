import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '3c4373ac933a2650d5ec31697bba1020',
    script: ``,
    active: true,
    admin_overrides: true,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the State field for the Fulfiller persona (user role).',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'state',
    operation: 'write',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
