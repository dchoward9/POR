import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'a37f325293ee2a10d5ec31697bba108c',
    script: ``,
    active: true,
    admin_overrides: false,
    applies_to: 'assignment_groupDYNAMICd6435e965f510100a9ad2572f2b47744^EQ',
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants write access to a Task record for the Fulfiller persona (user role). Access is granted if the current user is a member of the Task's Assignment Group.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'write',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
