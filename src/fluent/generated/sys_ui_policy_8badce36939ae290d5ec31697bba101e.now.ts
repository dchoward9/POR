import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '8badce36939ae290d5ec31697bba101e',
    table: 'sys_ui_policy',
    data: {
        active: true,
        conditions: 'sys_created_onISEMPTY^EQ',
        global: true,
        inherit: false,
        isolate_script: true,
        on_load: true,
        order: 100,
        reverse_if_false: false,
        run_scripts: false,
        script_false: `function onCondition() {

}`,
        script_true: `function onCondition() {

}`,
        short_description: 'Task - isNewRecord - Adjust fields',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Task - isNewRecord - Adjust fields',
        table: 'x_1118046_partne_0_tasks',
        ui_type: 10,
    },
})
