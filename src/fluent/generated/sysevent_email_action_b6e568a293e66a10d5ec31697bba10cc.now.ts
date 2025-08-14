import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'b6e568a293e66a10d5ec31697bba10cc',
    table: 'sysevent_email_action',
    data: {
        action_insert: true,
        action_update: true,
        active: true,
        category: 'c97d83137f4432005f58108c3ffa917a',
        collection: 'x_1118046_partne_0_requests',
        condition: 'approvalCHANGESTOapproved^universal_requestISEMPTY^EQ',
        content_type: 'text/html',
        digest_separator_html: `<p>&nbsp;</p>
<hr>
<p>&nbsp;</p>`,
        digest_separator_text: '\\n--------------------------------------------------------------------------------\\n',
        digestable: false,
        enable_dynamic_translation: false,
        event_name: 'activate.life.cycle.migration',
        event_parm_1: false,
        event_parm_2: false,
        exclude_delegates: false,
        force_delivery: false,
        generation_type: 'engine',
        include_attachments: false,
        item: 'event.parm1',
        mandatory: false,
        message_html: `<div style="font-family: lato,arial,sans; line-height: 24px;">
<div style="text-align: center; padding-bottom: 24px; line-height: 36px; border-bottom: 1px solid #DADDE2;"><span style="font-size: 18pt;">Your partner onboarding request was approved</span></div>
<div style="font-size: 12pt; padding-top: 24px; padding-bottom: 16px;">\${mail_script:request_greetings}</div>
<div style="font-size: 12pt; padding-bottom: 16px;"><span style="font-weight: 600;">\${number}</span> was approved, and we'll proceed with completing your request.</div>
<div style="font-size: 12pt; padding-bottom: 16px;">You can view your request to track updates and request changes.<br><br></div>
<div style="font-size: 12pt; padding-bottom: 16px;">\${mail_script:about_the_request}<br>Partner full legal name: <strong>\${partner_full_legal_name}</strong><br>Partner contact information: <strong>\${partner_contact_information}</strong><br>Description of services: <strong>\${description_of_services}</strong><br>Business justification: <strong>\${business_justification}</strong><br>Sensitive data access: <strong>\${sensitive_data_access}</strong></div>
<div style="font-size: 12pt; padding-bottom: 8px;">Thank you,<br>Onboarding Team</div>
</div>`,
        name: 'POR request approved',
        omit_watermark: false,
        order: 100,
        push_message_only: false,
        recipient_fields: 'opened_by,requested_for',
        send_self: true,
        subject: '${number} was Approved',
        subscribable: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'POR request approved',
        sys_version: 2,
        template: '1462e7ca918a3010f877b1d70a4d6a3d',
        type: 'email',
        weight: 0,
    },
})
