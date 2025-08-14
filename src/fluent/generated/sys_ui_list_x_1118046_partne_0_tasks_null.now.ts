import { List } from '@servicenow/sdk/core'

export default List({
    $id: 'd2bade4493ba6250d5ec31697bba10d1',
    view: 'default_view' as any /*Generated*/,
    table: 'x_1118046_partne_0_tasks',
    columns: [
        'number',
        'partner_onboarding_request',
        'state',
        'assignment_group',
        'assigned_to',
        'partner_onboarding_request.requested_by',
        'partner_onboarding_request.requested_for',
        'partner_onboarding_request.partner_full_legal_name',
        'partner_onboarding_request.sensitive_data_access',
    ],
})
