import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '1a1625be9396e290d5ec31697bba10b0',
    table: 'sys_app_module',
    data: {
        active: true,
        application: '624b71fa931ae290d5ec31697bba1058',
        filter: 'active=true^EQ',
        link_type: 'LIST',
        mobile_title: 'Requests',
        mobile_view_name: 'Mobile',
        name: 'x_1118046_partne_0_requests',
        order: 100,
        override_menu_roles: false,
        require_confirmation: true,
        roles: 'x_1118046_partne_0.viewer',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Requests',
        title: 'Requests',
        uncancelable: false,
    },
})
