function onLoad() {

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

}