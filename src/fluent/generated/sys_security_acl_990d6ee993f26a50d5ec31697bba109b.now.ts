import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '990d6ee993f26a50d5ec31697bba109b',
    script: ``,
    active: true,
    admin_overrides: false,
    applies_to: 'sys_scope=2ac1af2e931ea290d5ec31697bba10f0^EQ',
    decision_type: 'allow',
    description:
        'Allow-If ACL. Grants read access to dashboard widget configurations for the Viewer persona. This allows users with the x_1118046_partne_0.viewer role to see the dashboards for this application.',
    local_or_existing: 'Local',
    type: 'record',
    table: 'par_dashboard_widget',
    operation: 'read',
    roles: ['0341e702936ee610d5ec31697bba1068'],
})
