import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '04ac546b932aae10d5ec31697bba1006',
    script: ``,
    active: false,
    admin_overrides: false,
    decision_type: 'allow',
    local_or_existing: 'Local',
    type: 'record',
    table: 'sys_user',
    operation: 'read',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
