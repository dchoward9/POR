import { BooleanColumn, ChoiceColumn, IntegerColumn, ReferenceColumn, StringColumn, Table } from '@servicenow/sdk/core'

export const x_1118046_partne_0_task_config = Table({
    name: 'x_1118046_partne_0_task_config',
    label: 'Task Config',
    scriptable_table: false,
    allow_web_service_access: true,
    allow_new_fields: false,
    allow_client_scripts: false,
    allow_ui_actions: false,
    extensible: false,
    accessible_from: 'public',
    actions: ['read'],
    schema: {
        order: IntegerColumn({
            label: 'Order',
            maxLength: 40,
        }),
        condition: BooleanColumn({
            label: 'Condition',
            maxLength: 40,
        }),
        active: BooleanColumn({
            label: 'Active',
            maxLength: 40,
        }),
        short_description: StringColumn({
            label: 'Short Description',
            maxLength: 108,
        }),
        stage: ChoiceColumn({
            label: 'Stage',
            maxLength: 40,
            dropdown: 'dropdown_with_none',
            referenceTable: 'x_1118046_partne_0_requests',
            dynamic_value_definitions: {
                type: 'choices_from_other_table',
                table: 'x_1118046_partne_0_requests',
                field: 'stage',
            },
        }),
        conditional_field: StringColumn({
            label: 'Conditional Field',
            maxLength: 108,
        }),
        task_type: ChoiceColumn({
            label: 'Task Type',
            maxLength: 40,
            dropdown: 'dropdown_with_none',
            choices: {
                finance: {
                    label: 'Finance',
                    sequence: 4,
                    inactive_on_update: false,
                },
                legal: {
                    label: 'Legal',
                    sequence: 2,
                    inactive_on_update: false,
                },
                procurement: {
                    label: 'Procurement',
                    sequence: 1,
                    inactive_on_update: false,
                },
                security: {
                    label: 'Security',
                    sequence: 3,
                    inactive_on_update: false,
                },
                university_verification: {
                    label: 'University Verification',
                    sequence: 5,
                    inactive_on_update: false,
                },
            },
        }),
        assignment_group: ReferenceColumn({
            label: 'Assignment Group',
            reference_qual: 'active=true^EQ',
            maxLength: 32,
            referenceTable: 'sys_user_group',
        }),
    },
    index: [{ name: 'index', element: 'assignment_group', unique: false }],
})
