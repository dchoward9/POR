import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '7d48a28893fa6250d5ec31697bba10be',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the State field for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    field: 'state',
    operation: 'write',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
