import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'a414621e932e2a10d5ec31697bba1012',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants delete access for the Admin persona. This allows administrators with the x_1118046_partne_0.admin role to delete Request records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'delete',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
