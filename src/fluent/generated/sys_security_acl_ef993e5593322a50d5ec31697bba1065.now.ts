import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'ef993e5593322a50d5ec31697bba1065',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants reporting access for the Fulfiller persona. This allows users with the x_1118046_partne_0.user role to create reports on Task records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'report_on',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
