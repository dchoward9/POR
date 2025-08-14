import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '2b7f325293ee2a10d5ec31697bba1081',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants read access to all Task records for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'read',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
