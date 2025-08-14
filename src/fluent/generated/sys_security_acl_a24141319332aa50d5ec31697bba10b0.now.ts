import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'a24141319332aa50d5ec31697bba10b0',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        "Allow-If ACL. Grants report_view access to metric_instance records for the Admin persona. This is required for dashboard reports, such as 'Average Time per Stage', to function correctly.",
    local_or_existing: 'Local',
    type: 'record',
    table: 'metric_instance',
    operation: 'report_view',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
