import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'fe04c3e593dfe650d5ec31697bba10b0',
    table: 'sys_transform_entry',
    data: {
        choice_action: 'create',
        coalesce: false,
        coalesce_case_sensitive: false,
        coalesce_empty_fields: false,
        date_format: 'yyyy-MM-dd HH:mm:ss',
        map: 'f604c32593dfe650d5ec31697bba10c8',
        source_field: 'u_business_justification',
        source_script: `answer = (function transformEntry(source) {

	// Add your code here
	return ""; // return the value to be put into the target field

})(source);`,
        source_table: 'u_imp_tmpl_x_1118046_partne_0_requests',
        sys_name: 'u_business_justification',
        target_field: 'business_justification',
        target_table: 'x_1118046_partne_0_requests',
        use_source_script: false,
    },
})
