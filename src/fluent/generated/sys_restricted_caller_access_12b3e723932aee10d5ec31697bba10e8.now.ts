import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '12b3e723932aee10d5ec31697bba10e8',
    table: 'sys_restricted_caller_access',
    data: {
        operation: 'read',
        rca_type: 'real_rca',
        source: 'f8168600eb3311001c13abf11206fe55',
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
