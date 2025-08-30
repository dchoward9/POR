(function executeRule(current, previous /*null when async*/ ) {

    stageManager();

    function stageManager() {

        var stage = current.stage;
        var stageName = current.stage.getDisplayValue();

        switch (String(stage)) {
            case 'waiting_for_approval': // the value can be the same as the display value
                current.comments = 'This request is awaiting manager approval.';
                current.state = '-5'; // pending
                break;
            case "negotiating_pricing":
                current.comments = 'This request was approved and has moved to the following stage: ' + stageName;
                current.state = '2'; // work in progress
                break;
            case "contract_redlining":
            case "security_review":
            case "payment_setup":
                current.comments = 'This request has moved to the following stage: ' + stageName;
                current.state = '2'; // work in progress
                break;
            case "complete":
                current.comments = 'This request has completed successfully.';
                current.state = '3'; // closed complete
                break;
            case "request_rejected":
                current.state = '7'; // canceled
                addRejectionComment();
                break;
            case "closed_incomplete":
                current.comments = 'This request was completed unsuccessfully and is no longer active.';
                current.state = '4'; // closed incomplete
                break;
            case "canceled":
                current.comments = 'This request was canceled and is no longer active.';
                current.state = '7'; // canceled
                break;
            default:
                current.comments = 'This request has completed successfully. No further action is required.';
                current.state = '1'; // open
                break;
        }
    }

    function addRejectionComment() {

        var rejectionComment = '';
        var gr = new GlideRecord("sysapproval_approver");
        gr.addQuery('document_id', current.sys_id);
        gr.query();

        if (gr.next()) {
            if (gr.comments.getJournalEntry(1)) {
                rejectionComment = gr.comments.getJournalEntry(1);
                current.comments = 'This request was rejected. Rejection comment: \n\n' + rejectionComment;
            } else {
                current.comments = 'This request was rejected.';
            }
        }
    }
	
})(current, previous);