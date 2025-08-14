import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: '0cb7af7e93faee50d5ec31697bba1062',
    script: `(function executeRule(current, previous /*null when async*/ ) {

    if (!current.isNewRecord()) {
        g_scratchpad.flowData = new PartnerFlowUtil().getFlowData(current);
    }

})(current, previous);`,
    table: 'x_1118046_partne_0_requests',
    name: 'Get Flow data',
    order: 100,
    when: 'display',
    active: true,
    add_message: false,
    abort_action: false,
})
