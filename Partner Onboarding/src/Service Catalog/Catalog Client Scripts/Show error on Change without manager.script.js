function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    // var manager = g_form.getBooleanValue('manager');



    setTimeout(function() {

        //var mgr = g_form.getBooleanValue('manager');
        //var mgrValue = g_form.getValue('manager');

        if (newValue) {
            g_form.showFieldMsg("manager", "The selected user does not have an active manager. Please contact IT or select a different user.", "error");
        } else {
            g_form.hideFieldMsg("manager", true);
        }

    }, 0);
}