import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '1fa52531931f2a50d5ec31697bba1058',
    script: ``,
    active: true,
    admin_overrides: true,
    decision_type: 'allow',
    local_or_existing: 'Local',
    type: 'client_callable_script_include',
    name: 'PartnerVerificationAPI',
    operation: 'execute',
    roles: ['f2c1af2e931ea290d5ec31697bba10fa'],
})
