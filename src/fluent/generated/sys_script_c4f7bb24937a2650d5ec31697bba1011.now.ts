import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: 'c4f7bb24937a2650d5ec31697bba1011',
    action: ['update'],
    filter_condition: `activeCHANGESTOfalse^EQ`,
    script: `(function executeRule(current, previous /*null when async*/) {

	var gr = new GlideRecord("x_1118046_partne_0_tasks");
	gr.addQuery("partner_onboarding_request", current.sys_id);
	gr.addActiveQuery();
	gr.query();

	while (gr.next()) {
		gr.state = current.state;
		gr.update();
	}
	

})(current, previous);`,
    table: 'x_1118046_partne_0_requests',
    name: 'Close remaining tasks when REQ closes',
    order: 100,
    when: 'after',
    active: true,
    add_message: false,
    abort_action: false,
})
