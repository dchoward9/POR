import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '70cc754f93662e10d5ec31697bba10ea',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to all Task records for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'write',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
