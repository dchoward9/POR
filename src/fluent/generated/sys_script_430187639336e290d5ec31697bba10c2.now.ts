import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: '430187639336e290d5ec31697bba10c2',
    action: ['update'],
    filter_condition: `stateCHANGESTO3^ORstateCHANGESTO4^ORstateCHANGESTO7^EQ`,
    script: `(function executeRule(current, previous /*null when async*/ ) {

    var state = current.state;
    var stage = current.stage;

	if (stage.toString() === "request_rejected" ||
		stage.toString() === "canceled" ||
		stage.toString() === "complete" ||
		stage.toString() === "closed_incpmplete") {
			
		return true;
	}

    switch (String(state)) {
        case '4': // closed incomplete
            current.stage = 'closed_incomplete';
            break;
        case '7': // canceled
            current.stage = 'canceled';
            break;
        default: // else, complete
            current.stage = 'complete';
            break;
    }

})(current, previous);`,
    table: 'x_1118046_partne_0_requests',
    name: 'Update stages for manual REQ closure',
    order: 100,
    when: 'before',
    active: true,
    add_message: false,
    abort_action: false,
})
