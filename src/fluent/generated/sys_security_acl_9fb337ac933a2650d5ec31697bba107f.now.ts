import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '9fb337ac933a2650d5ec31697bba107f',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the Assignment Group field for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'assignment_group',
    operation: 'write',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
