(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    //var answer = [];

    var request_number = request.queryParams.request_number;
    var requestFound = false;

    if (!request_number) {
        response.setError(new sn_ws_err.NotFoundError('No query parameters defined.'));
        response.setStatus(404);
        return;
    }

    var requestTable = 'x_1118046_partne_0_requests';
    var requestGr = new GlideRecord(requestTable);
    if (request_number) {
        requestFound = requestGr.get('number', request_number.toString());
    }

    if (!requestFound) {
        response.setError(new sn_ws_err.NotFoundError('No records found.'));
        response.setStatus(404);
        return;
    }

    if (requestFound) {
        var requestObj = {
            "number": requestGr.number,
            "stage": requestGr.stage.getDisplayValue(),
            "state": requestGr.state.getDisplayValue(),
            "short_description": requestGr.short_description,
        };
    }

    response.setBody(requestObj);







    // external system makes request
    // take inputs, called flow API in scripted rest API (script)
    // figure out webhook to send data/success back to external system async
    // "v2"
    // webhooks in ServiceNow




})(request, response);