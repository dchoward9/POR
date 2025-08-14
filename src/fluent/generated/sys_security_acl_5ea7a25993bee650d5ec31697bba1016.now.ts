import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '5ea7a25993bee650d5ec31697bba1016',
    script: ``,
    active: true,
    admin_overrides: true,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the Work Notes field for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'work_notes',
    operation: 'write',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
