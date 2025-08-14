import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: 'c79cd26593b26a50d5ec31697bba1039',
    action: ['update'],
    filter_condition: `activeCHANGESTOfalse^EQ`,
    table: 'x_1118046_partne_0_requests',
    name: 'Calculate Duration',
    order: 100,
    when: 'after',
    active: true,
    add_message: false,
    abort_action: false,
    script: `(function executeRule(current, previous /*null when async*/ ) {

    var gdt1 = new GlideDateTime(current.opened_at);
    var gdt2 = new GlideDateTime(current.closed_at);
    var dur = GlideDateTime.subtract(gdt1, gdt2);
    //gs.info(dur.getDisplayValue());
	current.business_duration = dur;
	//test2

})(current, previous);`,
})
