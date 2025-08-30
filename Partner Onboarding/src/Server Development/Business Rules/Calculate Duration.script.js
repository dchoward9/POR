(function executeRule(current, previous /*null when async*/ ) {

    var gdt1 = new GlideDateTime(current.opened_at);
    var gdt2 = new GlideDateTime(current.closed_at);
    var dur = GlideDateTime.subtract(gdt1, gdt2);
    //gs.info(dur.getDisplayValue());
	current.business_duration = dur;
	//test3

})(current, previous);