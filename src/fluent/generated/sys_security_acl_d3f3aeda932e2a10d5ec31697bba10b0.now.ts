import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'd3f3aeda932e2a10d5ec31697bba10b0',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to all fields (*) on a Request record for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    field: '*',
    operation: 'write',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
