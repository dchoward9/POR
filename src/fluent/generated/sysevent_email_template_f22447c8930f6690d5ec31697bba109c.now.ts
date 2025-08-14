import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'f22447c8930f6690d5ec31697bba109c',
    table: 'sysevent_email_template',
    data: {
        collection: 'x_1118046_partne_0_tasks',
        message_html: `<p>Short Description: \${short_description}</p>
<p>Partner's Name: \${partner_onboarding_request.partner_full_legal_name}</p>
<p>Requested For: \${partner_onboarding_request.requested_for}</p>
<p>Click here to view the Request: \${partner_onboarding_request.URI_REF}</p>
<p>Click here to view Task: \${URI_REF}</p>`,
        name: 'Partner Task Email Assigned Tasks',
        sys_name: 'Partner Task Email Assigned Tasks',
        sys_version: 2,
    },
})
