function onChange(control, oldValue, newValue, isLoading, isTemplate) {
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
}