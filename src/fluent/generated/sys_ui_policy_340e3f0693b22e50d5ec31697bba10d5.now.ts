import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '340e3f0693b22e50d5ec31697bba10d5',
    table: 'sys_ui_policy',
    data: {
        active: true,
        conditions: 'state!=1^assignment_groupISNOTEMPTY^EQ',
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
        short_description: 'Assigned To mandatory when active and state is not open',
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Assigned To mandatory when active and state is not open',
        table: 'x_1118046_partne_0_tasks',
        ui_type: 0,
    },
})
