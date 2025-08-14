import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'a9f06f4e93feea50d5ec31697bba1010',
    table: 'sys_ui_policy',
    data: {
        active: false,
        conditions: 'active=false^EQ',
        global: true,
        inherit: false,
        isolate_script: true,
        on_load: true,
        order: 200,
        reverse_if_false: false,
        run_scripts: false,
        script_false: `function onCondition() {

}`,
        script_true: `function onCondition() {

}`,
        short_description: 'Fields read-only when PORTASK is inactive',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Fields read-only when PORTASK is inactive',
        table: 'x_1118046_partne_0_tasks',
        ui_type: 0,
    },
})
