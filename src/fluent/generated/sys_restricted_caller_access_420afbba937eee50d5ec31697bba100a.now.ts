import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '420afbba937eee50d5ec31697bba100a',
    table: 'sys_restricted_caller_access',
    data: {
        operation: 'read',
        rca_type: 'real_rca',
        source_scope: '5d9789f3eb51310007e48c1cf106fe9e',
        source_type: 5,
        status: 2,
        sys_name: '5d9789f3eb51310007e48c1cf106fe9e',
        target_scope: '2ac1af2e931ea290d5ec31697bba10f0',
        target_table: 'sysevent_register',
        target_type: 3,
    },
})
