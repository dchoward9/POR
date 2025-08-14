import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '02863fa0937a2650d5ec31697bba1030',
    table: 'sys_ui_policy',
    data: {
        active: true,
        conditions: 'active=false^EQ',
        global: true,
        inherit: false,
        isolate_script: true,
        on_load: true,
        order: 100,
        reverse_if_false: true,
        run_scripts: false,
        script_false: `function onCondition() {

}`,
        script_true: `function onCondition() {

}`,
        short_description: 'Fields read-only when PARTREQ is inactive',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Fields read-only when PARTREQ is inactive',
        table: 'x_1118046_partne_0_requests',
        ui_type: 0,
    },
})
