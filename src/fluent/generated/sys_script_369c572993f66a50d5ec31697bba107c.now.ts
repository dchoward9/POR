import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: '369c572993f66a50d5ec31697bba107c',
    action: ['update'],
    filter_condition: `commentsVALCHANGES^EQ`,
    script: `(function executeRule(current, previous /*null when async*/ ) {

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
}`,
    table: 'x_1118046_partne_0_tasks',
    name: 'PORTASK comments to PARTREQ',
    order: 100,
    when: 'before',
    active: true,
    add_message: false,
    abort_action: false,
    condition: "current.comments && current.comments.indexOf('DoNotCopy') == -1",
})
