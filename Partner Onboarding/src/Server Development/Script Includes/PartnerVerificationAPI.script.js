var PartnerVerificationAPI = Class.create();
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
});