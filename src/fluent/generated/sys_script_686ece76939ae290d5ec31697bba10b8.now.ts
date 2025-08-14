import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: '686ece76939ae290d5ec31697bba10b8',
    action: ['update', 'insert'],
    filter_condition: `partner_full_legal_nameVALCHANGES^EQ`,
    script: `(function executeRule(current, previous /*null when async*/) {

	current.short_description = 'Partner Onboarding Request: ' + current.partner_full_legal_name;

})(current, previous);`,
    table: 'x_1118046_partne_0_requests',
    name: 'Update request short description',
    order: 100,
    when: 'before',
    active: true,
    add_message: false,
    abort_action: false,
})
