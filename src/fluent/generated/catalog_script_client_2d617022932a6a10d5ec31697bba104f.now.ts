import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '2d617022932a6a10d5ec31697bba104f',
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
        name: 'Reset manager, then hide if usr exempt',
        script: `function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    g_form.hideErrorBox('manager');
	g_form.setVisible('manager', true);

    var usr = g_form.getValue('requested_for');
    var exemptionGroup = g_form.getValue('exemption_group'); // Group: Partner Onboarding - Approval Exempt

    var ga = new GlideAjax('x_1118046_partne_0.checkGroupMembership');
    ga.addParam('sysparm_name', 'getMembershipAjax');
    ga.addParam('sysparm_user_id', usr);
    ga.addParam('sysparm_group_id', exemptionGroup);
    ga.getXML(checkMembershipParse);

    function checkMembershipParse(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");

        if (answer == "true") {
            g_form.setVisible('manager', false);
            return;
        }
    }

}`,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Reset manager, then hide if usr exempt',
        type: 'onChange',
        ui_type: 10,
        va_supported: true,
    },
})
