import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'f292fed593fee650d5ec31697bba1072',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'deny',
    description:
        'Deny-Unless ACL. This rule acts as a gatekeeper, denying report_view access to all Request records by default. This prevents users with broad, inherited roles (like itil) from viewing these records in reports. A specific "Allow-If" rule is required to grant access.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'x_1118046_partne_0_requests',
    operation: 'report_view',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
