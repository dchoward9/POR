import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'a28e777993d76a50d5ec31697bba10c3',
    table: 'sys_script_include',
    data: {
        access: 'package_private',
        active: true,
        api_name: 'x_1118046_partne_0.UniversityDataUtil',
        client_callable: true,
        mobile_callable: false,
        name: 'UniversityDataUtil',
        sandbox_callable: false,
        script: `var UniversityDataUtil = Class.create();
UniversityDataUtil.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getUniversityInfo: function() {
        try {
            var universityName = this.getParameter("sysparm_university_name");
            var request = new sn_ws.RESTMessageV2();
            request.setEndpoint("http://universities.hipolabs.com/search?");
            request.setQueryParameter("name", universityName);
			request.setHttpMethod('get');

            var response = request.execute();
            var httpResponseStatus = response.getStatusCode();
            var body = response.getBody();

            if (httpResponseStatus == '200' && body.length > 2) {
                var obj = global.JSON.parse(body);
                var returnObj = {};
                returnObj.name = obj[0].name;
                returnObj.country = obj[0].country;
                returnObj.web_pages = obj[0].web_pages[0];
				return JSON.stringify(returnObj);
            }

        } catch (ex) {
            gs.error("getUniversityInfo Error: " + ex)
            return null;
        }
    },

    type: 'UniversityDataUtil'
});`,
        sys_name: 'UniversityDataUtil',
    },
})
