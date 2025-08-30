function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '' || isNewRecord()) {
        return;
    }

    if (!g_form.isNewRecord()) {
        var testing = g_scratchpad.flowData.hasFlows;
        alert(testing);
    }



}