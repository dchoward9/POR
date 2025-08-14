import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '9aa16dc193136650d5ec31697bba10df',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Default access control on x_1118046_partne_0_task_config',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_task_config',
    operation: 'delete',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
