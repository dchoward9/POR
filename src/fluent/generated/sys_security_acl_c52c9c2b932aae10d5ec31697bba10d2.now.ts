import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'c52c9c2b932aae10d5ec31697bba10d2',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants read access to group membership records for the Fulfiller persona (user role). This is required for reference fields (like 'Assigned to') to correctly display a list of users who are members of a specific group.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'sys_user_grmember',
    operation: 'read',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
