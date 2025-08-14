import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '7204c3e593dfe650d5ec31697bba10b6',
    table: 'sys_transform_entry',
    data: {
        choice_action: 'create',
        coalesce: true,
        coalesce_case_sensitive: false,
        coalesce_empty_fields: false,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        map: 'f604c32593dfe650d5ec31697bba10c8',
        source_field: 'u_sys_id',
        source_script: `answer = (function transformEntry(source) {

	// Add your code here
	return ""; // return the value to be put into the target field

})(source);`,
        source_table: 'u_imp_tmpl_x_1118046_partne_0_requests',
        sys_name: 'u_sys_id',
        target_field: 'sys_id',
        target_table: 'x_1118046_partne_0_requests',
        use_source_script: false,
    },
})
