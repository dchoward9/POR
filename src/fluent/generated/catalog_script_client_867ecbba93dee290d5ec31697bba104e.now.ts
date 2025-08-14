import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '867ecbba93dee290d5ec31697bba104e',
    table: 'catalog_script_client',
    data: {
        active: false,
        applies_catalog: true,
        applies_extended: false,
        applies_req_item: false,
        applies_sc_task: false,
        applies_target_record: false,
        applies_to: 'item',
        cat_item: 'cab0b53e93d6e290d5ec31697bba10fc',
        cat_variable: 'IO:e2887bd693e26a10d5ec31697bba109f',
        global: true,
        isolate_script: true,
        name: 'Show error on Change without manager',
        script: `function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    // var manager = g_form.getBooleanValue('manager');



    setTimeout(function() {

        //var mgr = g_form.getBooleanValue('manager');
        //var mgrValue = g_form.getValue('manager');

        if (newValue) {
            g_form.showFieldMsg("manager", "The selected user does not have an active manager. Please contact IT or select a different user.", "error");
        } else {
            g_form.hideFieldMsg("manager", true);
        }

    }, 0);
}`,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Show error on Change without manager',
        type: 'onChange',
        ui_type: 10,
        va_supported: false,
    },
})
