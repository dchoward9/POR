import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '00c09ed693d7ea50d5ec31697bba1045',
    table: 'sys_restricted_caller_access',
    data: {
        operation: 'read',
        rca_type: 'real_rca',
        source: 'bc010330c33310000f343b251eba8ffb',
        source_scope: 'global',
        source_table: 'sys_script_include',
        source_type: 2,
        status: 2,
        sys_name: 'global',
        target_scope: '2ac1af2e931ea290d5ec31697bba10f0',
        target_table: 'sys_scope',
        target_type: 3,
    },
})
