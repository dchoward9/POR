function onChange(control, oldValue, newValue, isLoading, isTemplate) {
   if (isLoading) {
      return;
   }

   g_form.clearValue('assigned_to');
   
}