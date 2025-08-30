(function executeRule(current, previous /*null when async*/ ) {

    // if (current.parent_onboarding_request) {
    //     var request = current.partner_onboarding_request.getRefRecord();
    //     if (request.isValidRecord() && request.getTableName() == 'x_1118046_partne_0_requests') {
    //         copyComments(request, current['comments']);
    //     }
    // }

    var task = new GlideRecord('x_1118046_partne_0_requests');
    if (task.get(current.partner_onboarding_request)) {
        gs.info(task.number);
        copyComments(task, current.comments);
    }

})(current, previous);

function copyComments(request, comments) {
    /* adding an invisible code snippet that can be detected by the BR condition */
    request.comments = '[code]<p DoNotCopy></p>[/code]' + comments;
    request.update();
}