import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'b1e089fd93fe6a50d5ec31697bba10ee',
    script: ``,
    active: true,
    admin_overrides: false,
    condition: 'definition=ad106435937e6a50d5ec31697bba102a^EQ',
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants read access to metric_instance records for the Admin persona. This is required for dashboard reports, such as 'Average Time per Stage', to function correctly.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'metric_instance',
    operation: 'read',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
