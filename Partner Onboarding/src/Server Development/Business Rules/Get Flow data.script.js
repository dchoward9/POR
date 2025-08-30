(function executeRule(current, previous /*null when async*/ ) {

    if (!current.isNewRecord()) {
        g_scratchpad.flowData = new PartnerFlowUtil().getFlowData(current);
    }

})(current, previous);