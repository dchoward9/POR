File: noderr/specs/SCRIPT_PopulateManager.md

# SCRIPT_PopulateManager.md

## Purpose
To improve the user experience on the `UI_RequestForm` by automatically populating the "Manager" field based on the selected "Requested For" user. This script also handles hiding the manager field if the selected user is exempt from approvals.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/catalog_script_client_2d617022932a6a10d5ec31697bba104f.now.ts` (This file represents the Catalog Client Script record).
- **Current interfaces**: This is an `onChange` client script that runs on the `UI_RequestForm`. It triggers whenever the `requested_for` variable changes.
- **Dependencies**: `UI_RequestFormVariables` (specifically `requested_for` and `manager`), `SCRIPT_checkGroupMembership` (via GlideAjax).
- **Dependents**: The user experience of the request form.

## Core Logic & Functionality
1.  The script triggers when the `requested_for` field is changed.
2.  It clears any existing error messages on the `manager` field and ensures the field is visible by default.
3.  It then makes an asynchronous server call (GlideAjax) to the `SCRIPT_checkGroupMembership` script include to check if the newly selected user is in the approval exemption group.
4.  **Exemption Path:** If the server returns `true` (user is exempt), the script hides the `manager` field using `g_form.setVisible('manager', false)`.
5.  **Standard Path:** If the server returns `false` (user is not exempt), the script proceeds to auto-populate the manager. The `manager` variable on the form is already configured to be dynamically populated based on the `manager` field of the selected `requested_for` user record. This script simply ensures the field is visible and any old errors are cleared.

## Current Quality Assessment
- **Completeness**: The script correctly handles both the manager population and the exemption logic.
- **Code Quality**: The script correctly uses an asynchronous GlideAjax call, which is a best practice.
- **Test Coverage**: This functionality is validated in the ATF suite (`TEST_ATFSuite`), which covers both standard users and exempt users.
- **Documentation**: The script has a clear, descriptive name.

## Technical Debt & Improvement Areas
- The `onLoad` logic for checking exemption is handled by a separate client script (`SCRIPT_CheckExemption`). These could potentially be combined into a single script for better maintainability, but the current separation is functional.

## Interface Definition
```javascript
// This is a client-side script, not a direct API.
// Trigger: onChange of 'requested_for' variable on the catalog item.

function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    g_form.hideErrorBox('manager');
	g_form.setVisible('manager', true);

    var usr = g_form.getValue('requested_for');
    var exemptionGroup = g_form.getValue('exemption_group');

    var ga = new GlideAjax('x_1118046_partne_0.checkGroupMembership');
    ga.addParam('sysparm_name', 'getMembershipAjax');
    ga.addParam('sysparm_user_id', usr);
    ga.addParam('sysparm_group_id', exemptionGroup);
    ga.getXML(checkMembershipParse);

    function checkMembershipParse(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        if (answer == "true") {
            g_form.setVisible('manager', false);
        }
    }
}
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that changing the "Requested For" user to a standard user correctly populates the "Manager" field with that user's manager.
- [ ] Verify that changing the "Requested For" user to a member of the exemption group hides the "Manager" field.
- [ ] Verify that changing from an exempt user back to a standard user makes the "Manager" field visible again and populates it correctly.

### Input Validation Criteria  
- [ ] The script should handle the `requested_for` field being cleared, which it does by returning early.

### Error Handling Criteria
- [ ] The script should not throw a client-side error if the GlideAjax call fails.

### Quality Criteria
- [ ] The script must use an asynchronous GlideAjax call.
- [ ] The script should clear any previous error messages related to the manager field when the user changes.