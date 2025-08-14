import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '2604b29993fee650d5ec31697bba1070',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants reporting access for the Viewer persona. This allows users with the x_1118046_partne_0.viewer role to create reports on Request records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'report_on',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
