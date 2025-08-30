var PartnerFlowUtil = Class.create();
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
};