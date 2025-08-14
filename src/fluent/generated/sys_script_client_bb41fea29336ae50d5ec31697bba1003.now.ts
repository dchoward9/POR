import { ClientScript } from '@servicenow/sdk/core'

export default ClientScript({
    $id: 'bb41fea29336ae50d5ec31697bba1003',
    type: 'onLoad',
    ui_type: 'desktop',
    table: 'x_1118046_partne_0_requests',
    script: `function onLoad() {

    g_form.hideRelatedList('x_1118046_partne_0_tasks');

    var hasRole = g_user.hasRole('x_1118046_partne_0.user');

    if (hasRole) {
        g_form.showRelatedList('x_1118046_partne_0_tasks');
    }

}`,
    global: true,
    name: 'Hide tasks related list',
    active: true,
    applies_extended: false,
    isolate_script: true,
})
