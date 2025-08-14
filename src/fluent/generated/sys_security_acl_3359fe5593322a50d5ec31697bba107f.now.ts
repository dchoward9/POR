import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '3359fe5593322a50d5ec31697bba107f',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'deny',
    description:
        'Deny-Unless ACL. This rule acts as a gatekeeper, denying reporting access to all Task records by default. A specific "Allow-If" rule is required to grant access.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_tasks',
    operation: 'report_on',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
