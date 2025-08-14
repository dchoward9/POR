import { ClientScript } from '@servicenow/sdk/core'

export default ClientScript({
    $id: 'b5bcebba933eee50d5ec31697bba1037',
    type: 'onChange',
    ui_type: 'desktop',
    table: 'x_1118046_partne_0_requests',
    script: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '' || isNewRecord()) {
        return;
    }

    if (!g_form.isNewRecord()) {
        var testing = g_scratchpad.flowData.hasFlows;
        alert(testing);
    }



}`,
    global: true,
    field: 'state',
    name: 'test',
    active: false,
    applies_extended: false,
    isolate_script: true,
})
