function onChange(control, oldValue, newValue, isLoading) {
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

}