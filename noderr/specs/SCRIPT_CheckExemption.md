File: noderr/specs/SCRIPT_CheckExemption.md

# SCRIPT_CheckExemption.md

## Purpose
To provide dynamic, real-time UI behavior on the `UI_RequestForm`. This client-side script checks if the selected "Requested For" user is a member of the approval exemption group and hides the "Manager" field accordingly.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/catalog_script_client_4680d7ea93b6ae50d5ec31697bba1025.now.ts` (This file represents the Catalog Client Script record).
- **Current interfaces**: This is an `onLoad` and `onChange` client script that runs on the `UI_RequestForm`. It triggers when the form loads and whenever the `requested_for` variable changes.
- **Dependencies**: `UI_RequestFormVariables` (specifically `requested_for`, `manager`, and the hidden `exemption_group` variable), `SCRIPT_checkGroupMembership` (via GlideAjax).
- **Dependents**: The user experience of the request form.

## Core Logic & Functionality
1.  The script runs when the form loads or the `requested_for` user is changed.
2.  It reads the `sys_id` of the selected user and the `sys_id` of the exemption group (which is stored in a hidden form variable populated by `CONFIG_ExemptionGroupProperty`).
3.  It makes an asynchronous server call (GlideAjax) to the `SCRIPT_checkGroupMembership` script include.
4.  It passes the user's `sys_id` and the group's `sys_id` as parameters.
5.  The server-side script checks if the user is a member of the group and returns `true` or `false`.
6.  In the callback function, if the server returns `true`, the script hides the `manager` field on the form using the `g_form.setVisible()` API.
7.  If the server returns `false`, it ensures the `manager` field is visible.

## Current Quality Assessment
- **Completeness**: The script correctly implements the desired dynamic UI behavior.
- **Code Quality**: The script correctly uses GlideAjax for an asynchronous server call, which is a best practice to avoid locking up the user's browser.
- **Test Coverage**: This functionality is validated in the "POR Approval Exemption" test within the ATF suite (`TEST_ATFSuite`).
- **Documentation**: The script has a clear, descriptive name.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```javascript
// This is a client-side script, not a direct API.
// Trigger: onLoad and onChange of 'requested_for' variable on the catalog item.

function onLoad() {
    // Simplified logic
    var userId = g_form.getValue('requested_for');
    var groupId = g_form.getValue('exemption_group');
    
    var ga = new GlideAjax('x_1118046_partne_0.checkGroupMembership');
    ga.addParam('sysparm_name', 'getMembershipAjax');
    ga.addParam('sysparm_user_id', userId);
    ga.addParam('sysparm_group_id', groupId);
    ga.getXML(callback);
}

function callback(response) {
    var isMember = response.responseXML.documentElement.getAttribute("answer");
    if (isMember == "true") {
        g_form.setVisible('manager', false);
    } else {
        g_form.setVisible('manager', true);
    }
}
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when a user who is a member of the exemption group is selected as "Requested For", the "Manager" field is hidden.
- [ ] Verify that when a user who is NOT a member of the exemption group is selected, the "Manager" field is visible.
- [ ] Verify the logic works correctly both on initial form load and when the "Requested For" user is changed.

### Input Validation Criteria  
- [ ] The script should handle cases where the `requested_for` field is cleared.

### Error Handling Criteria
- [ ] The script should not throw a client-side error if the GlideAjax call fails.

### Quality Criteria
- [ ] The script must use an asynchronous GlideAjax call to prevent a poor user experience.
- [ ] The script should be isolated to this specific catalog item and not run globally.