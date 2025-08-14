import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'dd64ec2293e66a10d5ec31697bba10b1',
    table: 'sysevent_email_action',
    data: {
        action_insert: true,
        action_update: true,
        active: true,
        category: 'c97d83137f4432005f58108c3ffa917a',
        collection: 'x_1118046_partne_0_requests',
        condition: 'approvalCHANGESTOrejected^universal_requestISEMPTY^EQ',
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
        message_html: `<div style="font-family: lato,arial,sans; max-width: 564px;">
<table style="border-collapse: collapse; width: 100%; height: 156px;" border="0">
<tbody>
<tr style="border-bottom: 1px solid rgb(218, 221, 226); height: 36px;">
<td style="width: 100%; padding-bottom: 16px; height: 36px;" align="center"><span style="font-size: 22px; line-height: 36px; text-align: center;">Your partner onboarding request was rejected</span></td>
</tr>
<tr style="height: 24px;">
<td style="height: 24px;" height="24">&nbsp;</td>
</tr>
<tr style="height: 24px;">
<td style="width: 100%; font-size: 16px; line-height: 24px; height: 24px;">\${mail_script:request_greetings}</td>
</tr>
<tr style="height: 24px;">
<td style="width: 100%; font-size: 16px; line-height: 24px; padding-top: 16px; height: 24px;"><strong>\${number}</strong> was rejected.</td>
</tr>
<tr style="height: 48px;">
<td style="width: 100%; font-size: 16px; line-height: 24px; padding-top: 16px; height: 48px;">You can view your request to track any rejection comments. This request will be closed.</td>
</tr>
</tbody>
</table>
<div style="margin-top: 16px; margin-bottom: 16px; font-size: 12pt;">
<div style="font-size: 12pt; padding-bottom: 16px;">\${mail_script:about_the_request}<br>Partner full legal name: <strong>\${partner_full_legal_name}</strong><br>Partner contact information: <strong>\${partner_contact_information}</strong><br>Description of services: <strong>\${description_of_services}</strong><br>Business justification: <strong>\${business_justification}</strong><br>Sensitive data access: <strong>\${sensitive_data_access}</strong></div>
<div style="font-size: 12pt; padding-bottom: 8px;">Thank you,<br>Onboarding Team</div>
</div>
</div>`,
        name: 'POR request rejected',
        omit_watermark: false,
        order: 100,
        push_message_only: false,
        recipient_fields: 'opened_by,requested_for',
        send_self: true,
        subject: '${number} was Rejected',
        subscribable: false,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'POR request rejected',
        sys_version: 2,
        template: '1462e7ca918a3010f877b1d70a4d6a3d',
        type: 'email',
        weight: 0,
    },
})
