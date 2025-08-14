import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '16856131931f2a50d5ec31697bba10fd',
    table: 'sys_script_include',
    data: {
        access: 'package_private',
        active: true,
        api_name: 'x_1118046_partne_0.PartnerVerificationAPI',
        client_callable: true,
        mobile_callable: false,
        name: 'PartnerVerificationAPI',
        sandbox_callable: false,
        script: `var PartnerVerificationAPI = Class.create();
PartnerVerificationAPI.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    verifyPartnerName: function() {
        var partnerName = this.getParameter("sysparm_partner_name");
        var grUser = new GlideRecord('sys_user');
        grUser.get("user_name", userName);

        // Build the payload. You can return additional data if needed. 
        var result = {
            "manager": grUser.getDisplayValue('manager')
        };
        return JSON.stringify(result);
    },

    type: 'PartnerVerificationAPI'
});`,
        sys_name: 'PartnerVerificationAPI',
    },
})
