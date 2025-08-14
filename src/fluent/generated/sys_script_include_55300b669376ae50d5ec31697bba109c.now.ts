import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '55300b669376ae50d5ec31697bba109c',
    table: 'sys_script_include',
    data: {
        access: 'package_private',
        active: true,
        api_name: 'x_1118046_partne_0.checkGroupMembership',
        client_callable: true,
        mobile_callable: false,
        name: 'checkGroupMembership',
        sandbox_callable: false,
        script: `var checkGroupMembership = Class.create();
checkGroupMembership.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    getMembershipAjax: function() {

        var user_id = this.getParameter('sysparm_user_id');
        var group_id = this.getParameter('sysparm_group_id');
        var result = this.getMembership(user_id, group_id);
        return result;
    },

    getMembership: function(user_id, group_id) {
        //gs.info('group id: ' + group_id);
        var userIsGroupMember = new GlideRecord('sys_user_grmember');
        userIsGroupMember.addQuery('group', group_id);
        userIsGroupMember.addQuery('user', user_id);
        userIsGroupMember.query();
        if (userIsGroupMember.next()) {
            //gs.info('TRUE');
            result = true;
        } else {
            //gs.info('FALSE');
			// test
            result = false;
        }
        return result;
    },

    type: 'checkGroupMembership'
});`,
        sys_name: 'checkGroupMembership',
    },
})
