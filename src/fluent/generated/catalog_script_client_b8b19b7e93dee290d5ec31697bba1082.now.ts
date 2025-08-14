import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'b8b19b7e93dee290d5ec31697bba1082',
    table: 'catalog_script_client',
    data: {
        active: true,
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
        name: 'Error onSubmit without manager',
        script: `function onSubmit() {

    g_form.hideFieldMsg("manager", true);

	if (!g_form.isVisible('manager')) {
		return true;
	}

    var usr = g_form.getValue('requested_for');
    var mgr = g_form.getValue('manager');
    var usrName = g_form.getDisplayValue('requested_for');

    var msg = usrName + " does not have an active manager listed on their user profile. Please select a different user, or contact IT to have their user profile updated.";

    if (usr && !mgr) { // if requested_for user is selected, but the manager field is empty
        alert(msg);
        g_form.showErrorBox('manager', msg, "error", true);
        return false;
    }
}`,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Error onSubmit without manager',
        type: 'onSubmit',
        ui_type: 10,
        va_supported: true,
    },
})
