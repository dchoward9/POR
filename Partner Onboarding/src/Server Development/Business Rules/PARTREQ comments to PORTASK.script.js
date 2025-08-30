(function executeRule(current, previous /*null when async*/ ) {

    // if (current.parent) {
    //     var parentInc = current.parent.getRefRecord();
    //     if (parentInc.isValidRecord() && parentInc.getTableName() == 'incident') {
    //         copyWorkNotes(parentInc, current['work_notes']);
    //     }
    // }
    var task = new GlideRecord('x_1118046_partne_0_tasks');
    task.addEncodedQuery('active=true^partner_onboarding_request=' + current.getUniqueValue());
    task.query();
    while (task.next()) {
		gs.info(task.number);
        copyComments(task, current.comments);
    }

})(current, previous);

function copyComments(taskGr, comments) {
    /* adding an invisible code snippet that can be detected by the BR condition */
    taskGr.comments = '[code]<p DoNotCopy></p>[/code]' + comments;
    taskGr.update();
}