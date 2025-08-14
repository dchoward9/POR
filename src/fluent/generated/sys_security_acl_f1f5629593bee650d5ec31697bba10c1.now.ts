import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'f1f5629593bee650d5ec31697bba10c1',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description: 'Allow-If ACL. Grants read access to the Work Notes field for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'work_notes',
    operation: 'read',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
