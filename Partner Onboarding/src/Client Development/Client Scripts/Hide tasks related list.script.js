function onLoad() {

    g_form.hideRelatedList('x_1118046_partne_0_tasks');

    var hasRole = g_user.hasRole('x_1118046_partne_0.user');

    if (hasRole) {
        g_form.showRelatedList('x_1118046_partne_0_tasks');
    }

}