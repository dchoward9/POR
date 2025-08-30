function onSubmit() {

    g_form.hideFieldMsg("manager", true);

	if (!g_form.isVisible('manager')) {
		return true;
	}

    var usr = g_form.getValue('requested_for');
    var mgr = g_form.getValue('manager');
    var usrName = g_form.getDisplayValue('requested_for');

    var msg = usrName + " does not have an active manager listed on their user profile. Please select a different user, or contact IT to have their user profile updated.";

    if (usr && !mgr) { // if requested_for user is selected, but the manager field is empty
        alert(msg);
        g_form.showErrorBox('manager', msg, "error", true);
        return false;
    }
}