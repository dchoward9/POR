import { BooleanColumn, GenericColumn, ReferenceColumn, StringColumn, Table } from '@servicenow/sdk/core'

export const x_1118046_partne_0_requests = Table({
    name: 'x_1118046_partne_0_requests',
    label: 'Requests',
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
        rpt_date_diff: GenericColumn({
            label: 'Date Diff',
            function_definition: 'glidefunction:datediff(closed_at,opened_at)',
            maxLength: 40,
            column_type: 'glide_time',
        }),
        manager: ReferenceColumn({
            label: 'Manager',
            read_only: true,
            maxLength: 32,
            referenceTable: 'sys_user',
        }),
        business_justification: StringColumn({
            label: 'Business justification',
            mandatory: true,
            maxLength: 512,
        }),
        university: BooleanColumn({
            label: 'University',
            maxLength: 40,
        }),
        partner_contact_information: StringColumn({
            label: 'Partner contact information',
            mandatory: true,
            maxLength: 108,
        }),
        partner_full_legal_name: StringColumn({
            label: 'Partner full legal name',
            mandatory: true,
            maxLength: 108,
        }),
        sensitive_data_access: BooleanColumn({
            label: 'Sensitive data access',
            maxLength: 40,
        }),
        description_of_services: StringColumn({
            label: 'Description of services',
            mandatory: true,
            maxLength: 360,
        }),
        stage: GenericColumn({
            label: 'Stage',
            read_only: true,
            maxLength: 80,
            column_type: 'workflow',
            dropdown: 'dropdown_with_none',
            choices: {
                negotiating_pricing: {
                    label: 'Negotiating Pricing',
                    sequence: 2,
                    inactive_on_update: false,
                },
                request_rejected: {
                    label: 'Request Rejected',
                    sequence: 7,
                    inactive_on_update: false,
                },
                contract_redlining: {
                    label: 'Contract Redlining',
                    sequence: 3,
                    inactive_on_update: false,
                },
                closed_incomplete: {
                    label: 'Closed Incomplete',
                    sequence: 8,
                    inactive_on_update: false,
                },
                canceled: {
                    label: 'Canceled',
                    sequence: 9,
                    inactive_on_update: false,
                },
                security_review: {
                    label: 'Security Review',
                    sequence: 4,
                    inactive_on_update: false,
                },
                waiting_for_approval: {
                    label: 'Waiting for Approval',
                    sequence: 1,
                    inactive_on_update: false,
                },
                payment_setup: {
                    label: 'Payment Setup',
                    sequence: 5,
                    inactive_on_update: false,
                },
                complete: {
                    label: 'Complete',
                    sequence: 6,
                    inactive_on_update: false,
                },
            },
        }),
        requested_by: ReferenceColumn({
            label: 'Requested By',
            read_only: true,
            maxLength: 32,
            referenceTable: 'sys_user',
        }),
        requested_for: ReferenceColumn({
            label: 'Requested For',
            read_only: true,
            maxLength: 32,
            referenceTable: 'sys_user',
        }),
    },
})
