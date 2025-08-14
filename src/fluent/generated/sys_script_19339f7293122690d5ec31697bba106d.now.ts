import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: '19339f7293122690d5ec31697bba106d',
    action: ['update', 'insert'],
    filter_condition: `business_justificationVALCHANGES^ORdescription_of_servicesVALCHANGES^ORpartner_contact_informationVALCHANGES^ORsensitive_data_accessVALCHANGES^ORpartner_full_legal_nameVALCHANGES^ORrequested_byVALCHANGES^ORrequested_forVALCHANGES^EQ`,
    script: `// (function executeRule(current, previous /*null when async*/) {

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
	

// })(current, previous);`,
    set_field_value:
        'description_of_servicesSAMEASpartner_onboarding_request.description_of_services^business_justificationSAMEASpartner_onboarding_request.business_justification^partner_contact_informationSAMEASpartner_onboarding_request.partner_contact_information^partner_full_legal_nameSAMEASpartner_onboarding_request.partner_full_legal_name^sensitive_data_accessSAMEASpartner_onboarding_request.sensitive_data_access^requested_bySAMEASpartner_onboarding_request.requested_by^requested_forSAMEASpartner_onboarding_request.requested_for^EQ',
    table: 'x_1118046_partne_0_tasks',
    name: 'Cascade Partner Information from Parent',
    order: 100,
    when: 'before',
    active: false,
    add_message: false,
    abort_action: false,
})
