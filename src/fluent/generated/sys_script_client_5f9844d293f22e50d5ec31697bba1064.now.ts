import { ClientScript } from '@servicenow/sdk/core'

export default ClientScript({
    $id: '5f9844d293f22e50d5ec31697bba1064',
    type: 'onChange',
    ui_type: 'desktop',
    table: 'x_1118046_partne_0_tasks',
    script: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading) {
      return;
   }

   g_form.clearValue('assigned_to');
   
}`,
    global: true,
    field: 'assignment_group',
    name: 'Clear assigned to if group changes',
    active: true,
    applies_extended: false,
    isolate_script: true,
})
