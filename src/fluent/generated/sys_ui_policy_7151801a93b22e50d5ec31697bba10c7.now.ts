import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '7151801a93b22e50d5ec31697bba10c7',
    table: 'sys_ui_policy',
    data: {
        active: true,
        conditions: 'stateIN3,4,7^ORactive=false^EQ',
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
        short_description: 'Work notes mandatory when state is closed',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Work notes mandatory when state is closed',
        table: 'x_1118046_partne_0_tasks',
        ui_type: 0,
    },
})
