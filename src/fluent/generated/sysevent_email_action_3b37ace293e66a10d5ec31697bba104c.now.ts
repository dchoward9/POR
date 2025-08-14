import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '3b37ace293e66a10d5ec31697bba104c',
    table: 'sysevent_email_action',
    data: {
        action_insert: false,
        action_update: true,
        active: true,
        category: 'c97d83137f4432005f58108c3ffa917a',
        collection: 'x_1118046_partne_0_requests',
        condition: 'activeCHANGESTOfalse^stateCHANGESTO3^EQ',
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
<div style="text-align: center; line-height: 30px; padding-bottom: 24px; border-bottom: 1px solid #DADDE2;"><span style="font-size: 18pt;">Your partner onboarding request was successfully completed</span></div>
<div style="padding-top: 24px; padding-bottom: 16px; font-size: 12pt;">\${mail_script:request_greetings}</div>
<div style="padding-bottom: 16px;"><span style="font-size: 12pt; font-weight: 600;">\${number} </span><span style="font-size: 12pt;">has been marked complete.</span></div>
<div style="padding-bottom: 16px;"><span style="font-size: 12pt;">You can view your request to track any comments.</span></div>
<div style="font-size: 12pt;">
<div style="font-size: 12pt; padding-bottom: 16px;">\${mail_script:about_the_request}<br>Partner full legal name: <strong>\${partner_full_legal_name}</strong><br>Partner contact information: <strong>\${partner_contact_information}</strong><br>Description of services: <strong>\${description_of_services}</strong><br>Business justification: <strong>\${business_justification}</strong><br>Sensitive data access: <strong>\${sensitive_data_access}</strong></div>
<div style="font-size: 12pt; padding-bottom: 8px;">Thank you,<br>Onboarding Team</div>
</div>
</div>`,
        name: 'POR request completed',
        omit_watermark: false,
        order: 100,
        push_message_only: false,
        recipient_fields: 'opened_by,requested_for',
        send_self: true,
        subject: 'Partner Onboarding Request ${number} was completed',
        subscribable: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'POR request completed',
        sys_version: 2,
        template: '1462e7ca918a3010f877b1d70a4d6a3d',
        type: 'email',
        weight: 0,
    },
})
