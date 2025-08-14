import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '41b976d593322a50d5ec31697bba10e3',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants report_view access for the Fulfiller persona. This allows users with the x_1118046_partne_0.user role to view Task records in reports.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'report_view',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
