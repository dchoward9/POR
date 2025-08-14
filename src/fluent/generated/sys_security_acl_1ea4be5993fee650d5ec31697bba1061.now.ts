import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '1ea4be5993fee650d5ec31697bba1061',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants report_view access for the Viewer persona. This allows users with the x_1118046_partne_0.viewer role to view Request records in reports.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'report_view',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
