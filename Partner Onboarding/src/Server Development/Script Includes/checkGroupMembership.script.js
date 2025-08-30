var checkGroupMembership = Class.create();
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
});