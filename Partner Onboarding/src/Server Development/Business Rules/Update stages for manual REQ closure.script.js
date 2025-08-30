(function executeRule(current, previous /*null when async*/ ) {

    var state = current.state;
    var stage = current.stage;

	if (stage.toString() === "request_rejected" ||
		stage.toString() === "canceled" ||
		stage.toString() === "complete" ||
		stage.toString() === "closed_incpmplete") {
			
		return true;
	}

    switch (String(state)) {
        case '4': // closed incomplete
            current.stage = 'closed_incomplete';
            break;
        case '7': // canceled
            current.stage = 'canceled';
            break;
        default: // else, complete
            current.stage = 'complete';
            break;
    }

})(current, previous);