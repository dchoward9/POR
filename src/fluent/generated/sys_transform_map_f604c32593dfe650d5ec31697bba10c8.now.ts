import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'f604c32593dfe650d5ec31697bba10c8',
    table: 'sys_transform_map',
    data: {
        active: true,
        copy_empty_fields: false,
        create_new_record_on_empty_coalesce_fields: false,
        enforce_mandatory_fields: 'No',
        name: 'u_imp_tmpl_x_1118046_partne_0_requests',
        order: 100,
        run_business_rules: true,
        run_script: false,
        script: `(function transformRow(source, target, map, log, isUpdate) {

	// Add your code here

})(source, target, map, log, action==="update");`,
        source_table: 'u_imp_tmpl_x_1118046_partne_0_requests',
        sys_name: 'u_imp_tmpl_x_1118046_partne_0_requests',
        target_table: 'x_1118046_partne_0_requests',
    },
})
