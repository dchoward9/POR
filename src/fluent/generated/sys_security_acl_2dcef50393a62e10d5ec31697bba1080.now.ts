import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '2dcef50393a62e10d5ec31697bba1080',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'llow-If ACL. Grants delete access for the Admin persona. This allows administrators with the x_1118046_partne_0.admin role to delete Task records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'delete',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
