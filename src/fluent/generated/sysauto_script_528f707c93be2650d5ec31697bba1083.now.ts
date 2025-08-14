import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '528f707c93be2650d5ec31697bba1083',
    table: 'sysauto_script',
    data: {
        active: true,
        conditional: false,
        entered_time: '1970-01-01 02:00:00',
        name: 'POR Viewer Group Manager',
        offset_type: 0,
        run_as: '6816f79cc0a8016401c5a33be04be441',
        run_dayofmonth: 1,
        run_dayofweek: 1,
        run_start: '2025-07-15 02:15:41',
        run_time: '1970-01-01 08:00:00',
        run_type: 'daily',
        script: `var grp = gs.getProperty('x_1118046_partne_0.por.viewers'); // viewers group
var arrManagersDeptHeads = [];
var arrExistingMembers = [];

// function to remove duplicates from arrays
function removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) === index);
}

// get managers
var grUser = new GlideRecord("sys_user");
grUser.addActiveQuery();
grUser.addNotNullQuery('manager');
grUser.query();

while (grUser.next()) {
    arrManagersDeptHeads.push(grUser.manager.sys_id.toString());
}

// get department heads
var grDept = new GlideRecord("cmn_department");
grDept.addNotNullQuery('dept_head');
grDept.query();

while (grDept.next()) {
    arrManagersDeptHeads.push(grDept.dept_head.sys_id.toString());
}

// remove duplicates from list of managers/deptHeads
arrManagersDeptHeads = removeDuplicates(arrManagersDeptHeads);

// get existing group members
var grMembership = new GlideRecord("sys_user_grmember");
grMembership.addQuery('group', grp);
grMembership.query();

while (grMembership.next()) {
    // if existing member is not in manager/depthead list then remove from group
    if (!arrManagersDeptHeads.includes(grMembership.user.sys_id.toString())) {
		gs.info(grMembership.user.name + ' should be removed.');
        grMembership.deleteRecord();
    } else { // else push to existingMembers array
		arrExistingMembers.push(grMembership.user.sys_id.toString());
    }
}

//if manager/deptHead is NOT a member of the group already, then add them to the group
for (var i = 0; i < arrManagersDeptHeads.length; i++) {
    if (!arrExistingMembers.includes(arrManagersDeptHeads[i])) {
        grMembership.initialize();
        grMembership.group = grp;
        grMembership.user = arrManagersDeptHeads[i];
        grMembership.insert();
    }
}`,
        sys_name: 'POR Viewer Group Manager',
        time_zone: 'US/Central',
        upgrade_safe: false,
    },
})
