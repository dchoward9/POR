import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'aa07efbe93faee50d5ec31697bba1052',
    table: 'sys_script_include',
    data: {
        access: 'package_private',
        active: true,
        api_name: 'x_1118046_partne_0.PartnerFlowUtil',
        client_callable: false,
        mobile_callable: false,
        name: 'PartnerFlowUtil',
        sandbox_callable: false,
        script: `var PartnerFlowUtil = Class.create();
PartnerFlowUtil.prototype = {
    initialize: function() {

	},

    getFlowData: function(partnerRequestGR) {
        var hasFlows = false;
        var hasMultipleFlows = false;
        var flowId = "";

        if (!partnerRequestGR || !partnerRequestGR.isValidRecord())
            return {
                hasFlows: hasFlows,
                hasMultipleFlows: hasMultipleFlows,
                flowId: flowId,
                flowQuery: ""
            };

        var flowContextGR = new GlideRecord("sys_flow_context");
        flowContextGR.addQuery("source_table", partnerRequestGR.getRecordClassName());
        flowContextGR.addQuery("source_record", partnerRequestGR.getUniqueValue());
        flowContextGR.query();
        if (flowContextGR.next()) {
            hasFlows = true;
            if (!flowContextGR.hasNext())
                flowId = flowContextGR.getUniqueValue();
            else
                hasMultipleFlows = true;
        }

        return {
            hasFlows: hasFlows,
            hasMultipleFlows: hasMultipleFlows,
            flowId: flowId,
            flowQuery: flowContextGR.getEncodedQuery()
        };
    },


    type: 'PartnerFlowUtil'
};`,
        sys_name: 'PartnerFlowUtil',
    },
})
