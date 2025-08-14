import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'a39d92ba93dae290d5ec31697bba1090',
    table: 'sysevent_email_template',
    data: {
        collection: 'x_1118046_partne_0_tasks',
        message_html:
            '<p>Work notes: ${work_notes}<br><br>Short Description: ${short_description}<br>Assignment group: ${assignment_group}<br>Click here to view Task: ${mail_script:itsm_record_link}</p>',
        name: 'Partner Task Email Work Notes',
        subject: 'Work notes have been added to the Task ${number}',
        sys_name: 'Partner Task Email Work Notes',
        sys_version: 2,
    },
})
