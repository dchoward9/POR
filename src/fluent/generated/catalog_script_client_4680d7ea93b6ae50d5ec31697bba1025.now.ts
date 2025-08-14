import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '4680d7ea93b6ae50d5ec31697bba1025',
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
        global: true,
        isolate_script: true,
        name: 'onLoad, hide manager if is user exempt',
        script: `function onLoad() {

    setTimeout(function() {

        var usr = g_form.getValue('requested_for');
        //alert(usr);
        var exemptionGroup = g_form.getValue('exemption_group'); // variable stores value of exemption group system property
		//alert(exemptionGroup);

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


    }, 1);

}`,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'onLoad, hide manager if is user exempt',
        type: 'onLoad',
        ui_type: 10,
        va_supported: false,
    },
})
