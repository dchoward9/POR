import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '15e3eada932e2a10d5ec31697bba10c9',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants create access for the Admin persona. This allows administrators with the x_1118046_partne_0.admin role to create new Request records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'create',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
