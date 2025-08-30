var getUserInfo = Class.create();
getUserInfo.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
    getUser: function() {
        var userGR = new GlideRecord('sys_user');
        userGR.addQuery('name', 'CONTAINS', 'ella johnson');
        userGR.query();
        if (userGR.next()) {
            var user = {};
            user.name = userGR.getValue('name');
            user.email = userGR.getValue('email');
            user.user_name = userGR.getValue('user_name');
            user.sys_id = userGR.getValue('sys_id');
            return JSON.stringify(user);
        }
        return null;
    },
    type: 'getUserInfo'
});