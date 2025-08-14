import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'f538688293db6a50d5ec31697bba1052',
    table: 'sys_ui_policy',
    data: {
        active: true,
        conditions: 'task_config.task_type=university_verification^EQ',
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
        short_description: 'Show/Hide University Name',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Show/Hide University Name',
        table: 'x_1118046_partne_0_tasks',
        ui_type: 0,
    },
})
