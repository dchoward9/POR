import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'd512f2269336ae50d5ec31697bba1080',
    script: ``,
    active: true,
    admin_overrides: true,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants write access to the Watch List field for the Viewer persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    field: 'watch_list',
    operation: 'write',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
