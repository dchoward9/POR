import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '1136e2bf93762690d5ec31697bba10e3',
    table: 'sysevent_email_template',
    data: {
        collection: 'sysapproval_approver',
        message_html:
            '<p><button style="background: blue;" type="button"><span style="color: white;">Click here to approve ${sysapproval}</span></button></p>',
        name: 'mailto.por.btn.approval',
        subject: 'Re:${sysapproval} - approve',
        sys_name: 'mailto.por.btn.approval',
        sys_version: 2,
    },
})
