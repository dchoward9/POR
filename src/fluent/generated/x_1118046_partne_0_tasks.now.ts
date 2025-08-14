import { BooleanColumn, ReferenceColumn, StringColumn, Table } from '@servicenow/sdk/core'

export const x_1118046_partne_0_tasks = Table({
    name: 'x_1118046_partne_0_tasks',
    label: 'Tasks',
    audit: true,
    scriptable_table: false,
    allow_web_service_access: true,
    allow_new_fields: false,
    allow_client_scripts: false,
    allow_ui_actions: false,
    extensible: false,
    accessible_from: 'public',
    extends: 'task',
    actions: ['read'],
    schema: {
        requested_for: ReferenceColumn({
            label: 'Requested For',
            read_only: true,
            maxLength: 32,
            referenceTable: 'sys_user',
        }),
        task_config: ReferenceColumn({
            label: 'Task Config',
            read_only: true,
            maxLength: 32,
            referenceTable: 'x_1118046_partne_0_task_config',
        }),
        partner_full_legal_name: StringColumn({
            label: 'Partner full legal name',
            read_only: true,
            mandatory: true,
            maxLength: 32,
        }),
        partner_contact_information: StringColumn({
            label: 'Partner Contact Information',
            read_only: true,
            mandatory: true,
            maxLength: 512,
        }),
        partner_onboarding_request: ReferenceColumn({
            label: 'Partner Onboarding Request',
            mandatory: true,
            maxLength: 32,
            referenceTable: 'x_1118046_partne_0_requests',
        }),
        sensitive_data_access: BooleanColumn({
            label: 'Sensitive Data Access',
            read_only: true,
            maxLength: 40,
        }),
        university_name: StringColumn({
            label: 'University Name',
            maxLength: 255,
        }),
        business_justification: StringColumn({
            label: 'Business Justification',
            read_only: true,
            mandatory: true,
            maxLength: 512,
        }),
        description_of_services: StringColumn({
            label: 'Description of Services',
            read_only: true,
            mandatory: true,
            maxLength: 5012,
        }),
        requested_by: ReferenceColumn({
            label: 'Requested By',
            read_only: true,
            maxLength: 32,
            referenceTable: 'sys_user',
        }),
    },
})
