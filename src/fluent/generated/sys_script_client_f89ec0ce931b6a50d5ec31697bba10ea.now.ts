import { ClientScript } from '@servicenow/sdk/core'

export default ClientScript({
    $id: 'f89ec0ce931b6a50d5ec31697bba10ea',
    type: 'onChange',
    ui_type: 'desktop',
    table: 'x_1118046_partne_0_tasks',
    script: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    g_form.hideFieldMsg('university_name', true);

    var ga = new GlideAjax('UniversityDataUtil'); // the script include name 
    ga.addParam('sysparm_name', 'getUniversityInfo'); // the function in the script include that we're calling 
    ga.addParam('sysparm_university_name', newValue); // the University Name 
    ga.getXMLAnswer(function(response) {
        if (response) {
            var result = JSON.parse(response);
            var successString = "Verification Found: " + result.name + " (" + result.country + ") - " + result.web_pages;
            g_form.showFieldMsg("university_name", successString, "info");
        } else {
            g_form.showFieldMsg("university_name", "Verification for " + newValue + " failed or returned no results.", "error");
        }
    });
}`,
    global: true,
    field: 'university_name',
    name: 'Get University Info',
    active: true,
    applies_extended: false,
    description: `- Calls UniversityDataUtil Script Include using GlideAjax.
- Passes the new university name to the getUniversityInfo function.
- On a successful return, it parses the JSON string and formats a message like this: "Verification Found: Stanford University (United States) - www.stanford.edu"
- The message is pasted into the work_notes`,
    isolate_script: true,
})
