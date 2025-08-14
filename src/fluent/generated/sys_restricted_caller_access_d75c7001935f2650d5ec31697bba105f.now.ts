import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'd75c7001935f2650d5ec31697bba105f',
    table: 'sys_restricted_caller_access',
    data: {
        operation: 'read',
        rca_type: 'real_rca',
        source: '36f3f32493b842109cfe9b948189186c',
        source_scope: 'fd254d9443a161100967247e6bb8f200',
        source_table: 'sys_script_include',
        source_type: 2,
        status: 2,
        sys_name: 'fd254d9443a161100967247e6bb8f200',
        target_scope: '2ac1af2e931ea290d5ec31697bba10f0',
        target_table: 'sys_scope',
        target_type: 3,
    },
})
