import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'b48209719332aa50d5ec31697bba10af',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants read access to the Work Notes field for the Fulfiller persona (user role).',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    field: 'work_notes',
    operation: 'read',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
