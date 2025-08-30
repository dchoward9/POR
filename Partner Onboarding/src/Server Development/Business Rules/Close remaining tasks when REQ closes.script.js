(function executeRule(current, previous /*null when async*/) {

	var gr = new GlideRecord("x_1118046_partne_0_tasks");
	gr.addQuery("partner_onboarding_request", current.sys_id);
	gr.addActiveQuery();
	gr.query();

	while (gr.next()) {
		gr.state = current.state;
		gr.update();
	}
	

})(current, previous);