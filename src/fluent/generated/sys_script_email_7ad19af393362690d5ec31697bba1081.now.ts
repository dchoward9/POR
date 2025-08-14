import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '7ad19af393362690d5ec31697bba1081',
    table: 'sys_script_email',
    data: {
        name: 'por_request_summary',
        new_lines_to_html: false,
        script: `(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    // find request
    // dot walk to each field
    // add to string
    // return string

    var lineBreak = '<br>';
    var message = '<b>Request Details</b>' + lineBreak;

    var gr = new GlideRecord("x_1118046_partne_0_requests");
    if (gr.get(current.sysapproval)) {
        message += lineBreak + 'Request Number: ' + gr.number;
        message += lineBreak + 'Submitted By: ' + gr.requested_by.getDisplayValue();
        message += lineBreak + gr.requested_for.getLabel() + ': ' + gr.requested_for.getDisplayValue() + lineBreak;
		message += lineBreak + '<b>Partner Information</b>' + lineBreak;
        message += lineBreak + gr.partner_full_legal_name.getLabel() + ': ' + gr.partner_full_legal_name + lineBreak;
        message += lineBreak + gr.partner_contact_information.getLabel() + ': ' + gr.partner_contact_information + lineBreak;
        message += lineBreak + gr.description_of_services.getLabel() + ': ' + gr.description_of_services + lineBreak;
        message += lineBreak + gr.business_justification.getLabel() + ': ' + gr.business_justification + lineBreak;
        message += lineBreak + gr.sensitive_data_access.getLabel() + ': ' + gr.sensitive_data_access;

    }

    template.print(message);


})(current, template, email, email_action, event);`,
        sys_name: 'por_request_summary',
    },
})
