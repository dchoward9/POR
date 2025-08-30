// (function executeRule(current, previous /*null when async*/) {

// 	var task = current.sys_id;
// 	var parent = current.partner_onboarding_request;

// 	var gr = new GlideRecord("x_1118046_partne_0_requests");

// 	if (gr.get(parent)) {

// 		task.partner_full_legal_name = parent.partner_full_legal_name;
// 		task.partner_contact_information = parent.partner_contact_information;
// 		task.description_of_services = parent.description_of_services;
// 		task.business_justification = parent.business_justification;
// 		task.sensitive_data_access = parent.sensitive_data_access;
// 		task.requested_by = parent.requested_by;
// 		task.requested_for = parent.requested_for;
// 		// task.update();
//      // test;//
// 	}
	

// })(current, previous);