import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'f72563ca936ee610d5ec31697bba10ec',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants read access to a Request record for the Fulfiller persona. This allows users with the x_1118046_partne_0.user role to read Request records.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'read',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
