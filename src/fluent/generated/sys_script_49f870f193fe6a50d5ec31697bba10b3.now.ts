import { BusinessRule } from '@servicenow/sdk/core'

export default BusinessRule({
    $id: '49f870f193fe6a50d5ec31697bba10b3',
    action: ['update'],
    filter_condition: `commentsVALCHANGES^EQ`,
    script: `(function executeRule(current, previous /*null when async*/ ) {

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
}`,
    table: 'x_1118046_partne_0_requests',
    name: 'PARTREQ comments to PORTASK',
    order: 100,
    when: 'before',
    active: true,
    add_message: false,
    abort_action: false,
    condition: "current.comments && current.comments.indexOf('DoNotCopy') == -1",
})
