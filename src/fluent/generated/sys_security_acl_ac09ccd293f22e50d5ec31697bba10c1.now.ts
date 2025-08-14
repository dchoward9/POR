import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'ac09ccd293f22e50d5ec31697bba10c1',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants write access to the Partner Onboarding Request reference field for the Admin persona.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    field: 'partner_onboarding_request',
    operation: 'write',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
