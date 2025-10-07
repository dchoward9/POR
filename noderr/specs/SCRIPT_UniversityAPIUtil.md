File: noderr/specs/SCRIPT_UniversityAPIUtil.md

# SCRIPT_UniversityAPIUtil.md

## Purpose
To provide a reusable, server-side utility for calling an external, public API to verify university names. This script include encapsulates the logic for making the outbound REST call.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/sys_script_include_a28e777993d76a50d5ec31697bba10c3.now.ts` (This file represents the Script Include record).
- **Current interfaces**: This is a client-callable Script Include. It exposes a method `getUniversityInfo` that can be called via GlideAjax from client scripts.
- **Dependencies**: Relies on the external API endpoint `http://universities.hipolabs.com`.
- **Dependents**: A client script on the Task form (`sys_script_client_f89ec0ce931b6a50d5ec31697bba10ea.now.ts`) calls this utility to provide real-time feedback to fulfillers.

## Core Logic & Functionality
1.  The script extends `AbstractAjaxProcessor`, making it callable from the client.
2.  It defines a function `getUniversityInfo`.
3.  This function retrieves the university name passed as a parameter (`sysparm_university_name`) from the client.
4.  It constructs a `RESTMessageV2` object, setting the endpoint to the public university API.
5.  It adds the university name as a query parameter to the API request.
6.  It executes the GET request.
7.  Upon receiving a successful response (HTTP status 200 and a non-empty body), it parses the JSON response.
8.  It extracts the first result, creating a new, simplified object containing the university's name, country, and first web page.
9.  It stringifies this new object and returns it to the client-side caller.
10. If the API call fails or returns no results, it returns `null`.

## Current Quality Assessment
- **Completeness**: The script successfully calls the external API and processes the response.
- **Code Quality**: The script uses the recommended `sn_ws.RESTMessageV2` API for outbound REST calls. It includes basic error handling with a `try...catch` block.
- **Test Coverage**: This is not covered by the ATF suite as it relies on an external API. Manual testing is required.
- **Documentation**: The script include and its methods are clearly named.

## Technical Debt & Improvement Areas
- **Error Handling:** The `catch` block is generic. It could be improved to provide more specific error messages back to the client based on the HTTP status code.
- **Hardcoded URL:** The API endpoint is hardcoded. For a production application, this should be moved to a System Property (`sys_properties`) to allow administrators to change it without modifying code.

## Interface Definition
```javascript
// Client-side GlideAjax call pattern
var ga = new GlideAjax('x_1118046_partne_0.UniversityDataUtil');
ga.addParam('sysparm_name', 'getUniversityInfo');
ga.addParam('sysparm_university_name', 'Stanford');
ga.getXMLAnswer(function(response) {
    // response will be a JSON string like:
    // '{"name":"Stanford University","country":"United States","web_pages":"http://www.stanford.edu/"}'
    // or null on failure.
});
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that calling the script with a valid university name (e.g., "Stanford") returns a JSON string with the correct name, country, and web page.
- [ ] Verify that calling the script with a non-existent university name returns `null` or an empty response.

### Input Validation Criteria  
- [ ] The script should be able to handle university names with spaces or special characters.

### Error Handling Criteria
- [ ] Verify that if the external API is down or returns an error (e.g., 500), the script does not throw an unhandled exception and returns `null` to the client.

### Quality Criteria
- [ ] The script must be client-callable.
- [ ] The script should use the `sn_ws.RESTMessageV2` API.
- [ ] For future improvement, the endpoint URL should be moved to a system property.