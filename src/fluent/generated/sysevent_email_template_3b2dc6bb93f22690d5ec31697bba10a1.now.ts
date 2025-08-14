import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '3b2dc6bb93f22690d5ec31697bba10a1',
    table: 'sysevent_email_template',
    data: {
        collection: 'sysapproval_approver',
        message_html: `<p><strong>Partner Onboarding Request: Approval Needed</strong>&nbsp;</p>
<hr>
<p>Hi \${approver.first_name},<br><br></p>
<p>A new partner onboarding request has been submitted and requires your approval to proceed. Please review the details below.</p>
<div>&nbsp;</div>
<div><button type="button">\${mailto:mailto.approval}</button></div>
<div>&nbsp;</div>
<div><button type="button">\${mailto:mailto.rejection}</button></div>
<div>&nbsp;</div>
<div>
<div>\${mail_script:por_request_summary}</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
</div>
<div><span style="font-size: 8pt;"><em>You are receiving this email because you are listed as the manager for the "On Behalf Of" user. This approval is the first step in the official onboarding process.</em></span></div>
<div>&nbsp;</div>
<div>
<div><hr></div>
</div>
<div>&nbsp;</div>
<div>Click here to view the approval request: \${URI+&amp;sysparm_record_target=sysapproval_approver}</div>
<div>Click here to view the request: \${sysapproval.URI}</div>`,
        name: 'POR Approval Request',
        subject: 'Action Required: Partner Onboarding Request for ${sysapproval}',
        sys_name: 'POR Approval Request',
        sys_version: 2,
    },
})
