import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'd15ebdcf93662e10d5ec31697bba10a8',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants create access for the Admin persona. This allows administrators with the x_1118046_partne_0.admin role to create new Task records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'create',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
