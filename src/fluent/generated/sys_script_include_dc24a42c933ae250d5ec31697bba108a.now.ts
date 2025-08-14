import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'dc24a42c933ae250d5ec31697bba108a',
    table: 'sys_script_include',
    data: {
        access: 'package_private',
        active: false,
        api_name: 'x_1118046_partne_0.getUserInfo',
        client_callable: true,
        mobile_callable: false,
        name: 'getUserInfo',
        sandbox_callable: false,
        script: `var getUserInfo = Class.create();
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
});`,
        sys_name: 'getUserInfo',
    },
})
