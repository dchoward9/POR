(function executeRule(current, previous /*null when async*/ ) {

    var msg = "";

    if (previous.partner_full_legal_name != current.partner_full_legal_name) {
        msg += "The partner's full legal name has changed from '" + previous.partner_full_legal_name + "' to '" + current.partner_full_legal_name + "' .\n\n";
	}

	if (previous.partner_contact_information != current.partner_contact_information) {
		msg += "The partner contact information has changed from '" + previous.partner_contact_information + "' to '" + current.partner_contact_information + "' .\n\n";
	}

	if (previous.description_of_services != current.description_of_services) {
		msg += "The description of services has changed from '" + previous.description_of_services + "' to '" + current.description_of_services + "' .\n\n";
	}

    if (previous.business_justification != current.business_justification) {
        msg += "The business justification has changed from '" + previous.business_justification + "' to '" + current.business_justification + "' .\n\n";
    }

    if (previous.sensitive_data_access != current.sensitive_data_access) {
        msg += "Sensitive data access has changed from '" + previous.sensitive_data_access + "' to '" + current.sensitive_data_access + "' .\n\n";
    }

    var gr = new GlideRecord("x_1118046_partne_0_tasks");
    gr.addQuery("partner_onboarding_request", current.sys_id);
    gr.query(); // find child tasks, even inactive ones

    while (gr.next()) { // for each child task
        gr.work_notes = msg;
        gr.update();
    }

})(current, previous);