# ServiceNow Code Generation Knowledge Base

## Naming Conventions
All custom applications, tables, and fields must be prefixed with `x_` followed by the unique application scope name. This prefix is managed by the ServiceNow platform and must be included in all definitions.

## Core Fluent Objects

### Table Object
Creates a new database table to store records.
#### Properties
- `name`: The unique system name for the table (e.g., `x_scope_name_table_name`).
- `label`: The human-readable name for the table.
- `schema`: An object defining the table's columns.
- `access`: A string defining the access level (e.g., 'public', 'package_private').

#### Example
```typescript
import { Table, StringColumn, ReferenceColumn, BooleanColumn, GenericColumn } from '@servicenow/sdk-core';

new Table({
    name: 'x_scope_name_my_task',
    label: 'My Task',
    access: 'public',
    schema: {
        short_description: new StringColumn({
            label: 'Short Description',
            mandatory: true,
            maxLength: 100
        }),
        assigned_to: new ReferenceColumn({
            label: 'Assigned To',
            reference: 'sys_user'
        }),
        active: new BooleanColumn({
            label: 'Active',
            default: 'true'
        }),
        state: new GenericColumn({
            label: 'State',
            type: 'integer',
            choices: [
                { label: 'Open', value: 1 },
                { label: 'In Progress', value: 2 },
                { label: 'Closed', value: 3 }
            ]
        })
    }
});
```

### BusinessRule Object
Defines server-side logic that runs when records are displayed, inserted, updated, or deleted.
#### Properties
- `name`: The name of the Business Rule.
- `table`: The table the rule runs against.
- `when`: When the rule executes (`before`, `after`, `async`, `display`).
- `action`: The database operations that trigger the rule (`insert`, `update`, `delete`, `query`).
- `script`: A function containing the server-side code to execute.

#### Example
```typescript
import { BusinessRule } from '@servicenow/sdk-core';

new BusinessRule({
    name: 'Log Task Assignment',
    table: 'x_scope_name_my_task',
    when: 'after',
    action: 'insert,update',
    script: ({ current, previous, gs }) => {
        if (current.assigned_to.changes()) {
            gs.info(`Task ${current.number} assigned to ${current.assigned_to.getDisplayValue()}`);
        }
    }
});
```

### ClientScript Object
Defines client-side logic that runs in the browser for a specific table's forms.
#### Properties
- `name`: The name of the Client Script.
- `table`: The table the script applies to.
- `type`: When the script runs (`onLoad`, `onChange`, `onSubmit`).
- `fieldName`: The field that triggers an `onChange` script.
- `script`: A function containing the client-side code to execute.

#### Example
```typescript
import { ClientScript } from '@servicenow/sdk-core';

new ClientScript({
    name: 'Validate Short Description',
    table: 'x_scope_name_my_task',
    type: 'onSubmit',
    script: ({ g_form }) => {
        const desc = g_form.getValue('short_description');
        if (desc.length < 10) {
            g_form.addErrorMessage('Short description must be at least 10 characters.');
            return false; // Prevents form submission
        }
    }
});
```

### Acl (Access Control) Object
Defines a security rule to restrict permissions on a table or field.
#### Properties
- `name`: The object to secure (`<table>`, `<table>.*`, `<table>.<field>`).
- `operation`: The operation to secure (`read`, `write`, `create`, `delete`).
- `role`: The role required to pass the ACL check.
- `script`: An optional script for conditional logic.

#### Example
```typescript
import { Acl, Role } from '@servicenow/sdk-core';

const taskUserRole = new Role({ name: 'x_scope_name.task_user' });

new Acl({
    name: 'x_scope_name_my_task',
    operation: 'write',
    role: taskUserRole
});
```

### Role Object
Defines a user role for granting access to applications and modules.
#### Properties
- `name`: The system name of the role (e.g., `x_scope_name.role_name`).
- `label`: The human-readable name for the role.

#### Example
```typescript
import { Role } from '@servicenow/sdk-core';

new Role({
    name: 'x_scope_name.task_user',
    label: 'Task User'
});
```

### Property Object
Creates a system property to store configuration data for an application.
#### Properties
- `name`: The name of the property, including scope (e.g., `x_scope_name.property_name`).
- `label`: The human-readable label.
- `type`: The data type (`string`, `integer`, `boolean`, `choice`).
- `value`: The default value of the property.

#### Example
```typescript
import { Property } from '@servicenow/sdk-core';

new Property({
    name: 'x_scope_name.default_assignment_group',
    label: 'Default Assignment Group',
    type: 'string',
    value: 'Service Desk'
});
```

### ApplicationMenu Object
Creates a new application entry in the main ServiceNow navigation menu.
#### Properties
- `name`: The name of the application menu.
- `label`: The text displayed in the navigation menu.
- `roles`: A comma-separated string or array of role names that can see the menu.
- `modules`: An array of module objects to display under the application menu.

#### Example
```typescript
import { ApplicationMenu } from '@servicenow/sdk-core';

new ApplicationMenu({
    name: 'My Custom App',
    label: 'My Custom App',
    roles: 'x_scope_name.task_user',
    modules: [
        { label: 'Create New Task', type: 'URL', path: 'x_scope_name_my_task.do' },
        { label: 'All Tasks', type: 'LIST', table: 'x_scope_name_my_task' }
    ]
});
```

## Table Schema Column Types
Define columns within the `schema` property of a `Table` object.

### StringColumn
For text fields.
```typescript
import { StringColumn } from '@servicenow/sdk-core';
//...
short_description: new StringColumn({ label: 'Short Description', mandatory: true, maxLength: 255 })
```

### ReferenceColumn
For creating a reference to a record in another table.
```typescript
import { ReferenceColumn } from '@servicenow/sdk-core';
//...
assigned_to: new ReferenceColumn({ label: 'Assigned To', reference: 'sys_user' })
```

### BooleanColumn
For true/false fields.
```typescript
import { BooleanColumn } from '@servicenow/sdk-core';
//...
active: new BooleanColumn({ label: 'Active', default: 'true' })
```

### GenericColumn (with choices)
For fields with a predefined set of choices, like a dropdown list.
```typescript
import { GenericColumn } from '@servicenow/sdk-core';
//...
priority: new GenericColumn({
    label: 'Priority',
    type: 'integer',
    choices: [
        { label: '1 - High', value: 1 },
        { label: '2 - Medium', value: 2 },
        { label: '3 - Low', value: 3 }
    ]
})
```

## Common Server-Side APIs (GlideRecord)
Used in server-side scripts (e.g., Business Rules) to query and manipulate records.

```typescript
// Initialize a GlideRecord for the 'incident' table
const gr = new GlideRecord('incident');

// Add a query to find active incidents
gr.addQuery('active', true);

// Add a complex query using an encoded query string
gr.addEncodedQuery('priority=1^state!=6');

// Execute the query against the database
gr.query();

// Iterate through the result set
while (gr.next()) { /* ... process record ... */ }

// Retrieve a single record by its sys_id
if (gr.get('a83820b58f723300e7e16c2ea64123b2')) { /* ... process record ... */ }

// Set the value of a field
gr.setValue('short_description', 'New short description');

// Insert the current record as a new row in the database
const newRecordSysId = gr.insert();

// Update the current record in the database
gr.update();

// Delete the current record from the database
gr.deleteRecord();
```

## Common Client-Side APIs
These APIs are available within `ClientScript` scripts and execute in the user's browser.

### g_form API
Used to customize forms, including changing field values, attributes, and displaying messages.

```javascript
// Get the value from the 'short_description' field
const desc = g_form.getValue('short_description');

// Set the value of the 'state' field to 2
g_form.setValue('state', 2);

// Get the display value (e.g., user's name) from the 'assigned_to' reference field
const assigneeName = g_form.getDisplayValue('assigned_to');

// Clear the value from the 'assignment_group' field
g_form.clearValue('assignment_group');

// Make the 'close_notes' field mandatory
g_form.setMandatory('close_notes', true);

// Disable the 'priority' field, making it read-only
g_form.setDisabled('priority', true);

// Hide the 'work_notes' field from the form
g_form.setVisible('work_notes', false);

// Show an error message at the top of the form
g_form.addErrorMessage('The category and subcategory are required.');

// Show an informational message at the top of the form
g_form.addInfoMessage('Remember to fill out the work notes before saving.');

// Get the table name of the current record's form
const tableName = g_form.getTableName();

// Get the sys_id of the current record
const recordSysId = g_form.getUniqueValue();
```

### g_user API
Provides information about the currently logged-in user.

```javascript
// Get the sys_id of the current user
const userId = g_user.userID;

// Get the login name of the current user (e.g., 'admin')
const userName = g_user.userName;

// Get the first name of the current user
const firstName = g_user.firstName;

// Get the last name of the current user
const lastName = g_user.lastName;

// Check if the current user has the 'itil' role
const hasRole = g_user.hasRole('itil');

// Check if the current user has the custom application role
const hasAppRole = g_user.hasRole('x_scope_name.task_user');
```

## Server-Side APIs (Predictive Intelligence - ML)
These APIs are part of the `sn_ml` namespace and are used for creating, training, and managing machine learning solutions.

### ClassificationSolutionStore Object
Enables storing and retrieving classification solution objects.

#### Methods
- `get(solutionName)`: Retrieves a `ClassificationSolution` object from the store by its unique name.

#### Example
```javascript
// Get a solution object from the store
var mlSolution = sn_ml.ClassificationSolutionStore.get('ml_incident_categorization');
```

### ClassificationSolution Object
Represents a machine learning classification solution definition.

#### Methods
- `new sn_ml.ClassificationSolution(config)`: Creates a classification solution object.
- `getActiveVersion()`: Gets the active `ClassificationSolutionVersion` object.
- `getLatestVersion()`: Gets the latest `ClassificationSolutionVersion` object.
- `submitTrainingJob()`: Submits the solution for training and returns a `ClassificationSolutionVersion` object.

#### Example: Create, Store, and Train a Solution
```javascript
// 1. Define the dataset
var myData = new sn_ml.DatasetDefinition({
 'tableName' : 'incident',
 'fieldNames' : ['category', 'short_description'],
 'encodedQuery' : 'activeANYTHING'
});

// 2. Create the solution definition
var mySolution = new sn_ml.ClassificationSolution({
 'label': "My Solution Definition",
 'dataset' : myData,
 'predictedFieldName' : 'category',
 'inputFieldNames': ['short_description']
});

// 3. Add the solution to the store
var my_unique_name = sn_ml.ClassificationSolutionStore.add(mySolution);

// 4. Train the solution (this is a long-running job)
var myClassifierVersion = mySolution.submitTrainingJob();
```

### ClassificationSolutionVersion Object
Represents a trained version of a `ClassificationSolution`.

#### Methods
- `getStatus(includeDetails)`: Gets the training completion status. Returns a JSON object with `state`, `percentComplete`, `hasJobEnded`, and optional `details`.
- `getTrainingStatistics()`: Gets training statistics, including precision, coverage, and recall for each class.
- `getVersionNumber()`: Gets the version number of the solution object.
- `predict(input, options)`: Gets prediction results for the given input data.
    - `input`: A `GlideRecord` or an array of JSON objects.
    - `options`: An object to filter results, e.g., `{ top_n: 3, apply_threshold: false }`.

#### Example: Get Status and Predict
```javascript
// Get a solution from the store
var mlSolution = sn_ml.ClassificationSolutionStore.get('ml_incident_categorization');

// Get the active version
var activeVersion = mlSolution.getActiveVersion();

// Get its status
var trainingStatus = activeVersion.getStatus();
gs.print(JSON.stringify(JSON.parse(trainingStatus), null, 2));

// Prepare input for prediction (using a GlideRecord)
var incidentGR = new GlideRecord("incident");
incidentGR.get("<sys_id_of_incident>");

// Set prediction options
var options = { top_n: 3, apply_threshold: false };

// Get prediction results
var results = activeVersion.predict(incidentGR, options);
gs.print(JSON.stringify(JSON.parse(results), null, 2));
```

## Server-Side APIs (UI - GlideListProperties)
Controls the display properties of a list view, such as whether headers, filters, or navigation controls are visible.

### Methods
```javascript
// Instantiation
var list = new GlideListProperties();

// Controls breadcrumbs visibility.
list.setHasBreadcrumbs(true);

// Controls bottom pagination controls (first, last, next, previous).
list.setHasBottomVCR(true);

// Controls the filter icon's visibility.
list.setHasFilter(true);

// Controls the list header visibility.
list.setHasHeader(true);

// Controls the context menu on each column header.
list.setHasHeaderContextMenu(true);

// Controls the list personalization icon (gear icon).
list.setHasListMechanic(true);

// Controls if the list can have popup/modal windows.
list.setHasPopup(true);

// Controls the context menu on each list row.
list.setHasRowContextMenu(true);

// Controls the search bar in the list header.
list.setHasSearch(true);

// Controls the list title visibility in the header.
list.setHasTitle(true);

// Controls the context menu next to the list title.
list.setHasTitleContextMenu(true);

// Controls top pagination controls.
list.setHasTopVCR(true);

// Hides all rows in the list.
list.setHideRows(true);

// Sets a unique ID for the list.
list.setListID("a9dd1483d99f5700964f387107a8a3ec");

// Defines a name for the list.
list.setListName("my_custom_list");

// Hides the 'Save Filter' button in the condition builder.
list.setSaveFilterHidden(true);

// Controls visibility of related links.
list.setShowLinks(true);

// Defines the title for the list.
list.setTitle("My List Title");

// Controls the icon to show/hide column headers.
list.setToggleHeader(true);

// Controls both top and bottom pagination controls.
list.setVCR(true);
```

## Server-Side APIs (GlideLocale)
Provides information about display settings for the local instance, such as decimal and grouping separators.

### Methods
```javascript
// Instantiation (no constructor, use static get())
var locale = GlideLocale.get();

// Returns the decimal separator (e.g., '.')
var decimalSeparator = locale.getDecimalSeparator();

// Returns the grouping separator (e.g., ',')
var groupingSeparator = locale.getGroupingSeparator();
```

## Server-Side APIs (GlideQuery)
A modern, fluent alternative to GlideRecord for performing server-side CRUD operations.

### Methods
```javascript
// Basic query to find active tasks, group by priority, and aggregate the reassignment count.
new global.GlideQuery('task')
    .where('active', true)
    .groupBy('priority')
    .aggregate('sum', 'reassignment_count')
    .having('sum', 'reassignment_count', '>', 4)
    .select('priority', 'sum.reassignment_count')
    .forEach(function(result) {
        gs.info("Priority " + result.priority + " has " + result.sum.reassignment_count + " reassignments.");
    });

// Get a single user record by sys_id
var user = new global.GlideQuery('sys_user')
    .get('5137153cc611227c000bbd1bd8cd2005', ['first_name', 'last_name'])
    .orElse({ first_name: 'Default', last_name: 'User' });

// Insert a new user record
var fred = new global.GlideQuery('sys_user')
    .insert({ first_name: 'Fred', last_name: 'Luddy' })
    .get();

// Update an existing record by sys_id
var updateRecord = new global.GlideQuery('sys_user')
    .where('sys_id', '0a826bf03710200044e0bfc8bcbe5d7a')
    .update({ city: 'Los Angeles' });

// Update multiple records matching a query
var updatedCount = new global.GlideQuery('sys_user')
    .where('active', false)
    .where('last_name', 'Griffey')
    .updateMultiple({ active: true }); // Returns an object like {rowCount: 1}

// Delete multiple records matching a query
new global.GlideQuery('sys_user')
    .where('active', true)
    .where('last_name', 'Jeter')
    .deleteMultiple();

// Count active users
var userCount = new global.GlideQuery('sys_user')
    .where('active', true)
    .count();
```

## Server-Side APIs (GlideOAuthClient)
Provides methods for requesting and revoking OAuth refresh and access tokens. Use the `sn_auth` namespace in scoped scripts.

### Methods
```javascript
// Instantiation
var oAuthClient = new sn_auth.GlideOAuthClient();

// Example: Resource Owner Password grant type request
var params = {grant_type:"password", username:"itil", password:'itil'};
var json = new JSON();
var text = json.encode(params);
var tokenResponse = oAuthClient.requestToken('TestClient', text);
var token = tokenResponse.getToken();

gs.log("AccessToken:" + token.getAccessToken());
gs.log("AccessTokenExpiresIn:" + token.getExpiresIn());
gs.log("RefreshToken:" + token.getRefreshToken());
```

## Server-Side APIs (Notify)
The Notify APIs (`SNC.NotifyNow`, `sn_notify.Notify`, `NotifyPhoneNumber`, `NotifySMS`, `NotifyUtil`) provide methods for sending SMS, initiating voice calls, and managing conference calls.

### SNC.NotifyNow API
Provides methods for initiating notifications and managing conference calls.

#### Methods
```javascript
// Get a user's preferred E.164-compliant phone number for SMS messages.
// @param user {String | GlideRecord} The sys_id or GlideRecord of the user.
// @return {String} The phone number or null.
var E164Number = new SNC.NotifyNow().getPreferredE164SMSNumber('<user_sys_id>');

// Get a user's preferred E.164-compliant phone number for voice calls.
// @param user {String | GlideRecord} The sys_id or GlideRecord of the user.
// @return {String} The phone number or null.
var E164Number = new SNC.NotifyNow().getPreferredE164VoiceNumber('<user_sys_id>');

// Get a user's preferred email address.
// @param user {String | GlideRecord} The sys_id or GlideRecord of the user.
// @return {String} The email address or null.
var email = new SNC.NotifyNow().getPreferredEmailAddress("some_user_sys_id");

// Check if Notify is set up correctly (requires notifynow_admin role).
// @return {Boolean} True if Notify is set up correctly.
var isReady = new SNC.NotifyNow().getReadyState();

// Get the current status of the Notify configuration (requires notifynow_admin role).
// @return {String} A status message (e.g., 'ACCOUNT_OK_MESSAGE').
var status = new SNC.NotifyNow().getStatus();

// Initiate a conference call.
// @param participants {String[]} Array of user sys_ids or E.164 phone numbers.
// @param title {String} The title of the conference call (max 40 chars).
// @param sourceRecord {GlideRecord} [Optional] Record to associate with the call (e.g., an incident).
// @return {GlideRecord} The conference call record, or null on error.
var participants = ['+15551234567', '<user_sys_id>'];
var incidentGR = new GlideRecord('incident');
incidentGR.get('<incident_sys_id>');
var conferenceCall = new SNC.NotifyNow().initiateConferenceCall(participants, "Major Incident Bridge", incidentGR);

// Send an SMS message.
// @param phoneNumber {String} The E.164-compliant phone number.
// @param smsBody {String} The message to send (max 1600 chars).
// @param source {GlideRecord} [Optional] The source record to associate with the message.
new SNC.NotifyNow().sendSMS("+15551234567", "This is a test message", current);

// Send an SMS question.
// @param phoneNumber {String} The E.164-compliant phone number.
// @param question {String | GlideRecord} The sys_id or GlideRecord of the question to send.
// @param sourceRecord {GlideRecord} [Optional] The source record to associate with the message.
// @return {String} The conversation sys_id or null.
var conversationId = new SNC.NotifyNow().sendSMSQuestion('+15551234567', '<notifynow_question_sys_id>', current);

// Remove a participant from a conference call.
// @param participant {GlideRecord} The 'notifynow_participant' record to remove.
// @return {Boolean} True if the participant was removed.
var participantGR = new GlideRecord('notifynow_participant');
if (participantGR.get('<participant_sys_id>')) {
    var result = new SNC.NotifyNow().kick(participantGR);
}

// Mute a participant on a conference call.
// @param participant {GlideRecord} The 'notifynow_participant' record to mute.
// @return {Boolean} True if the participant was muted.
var participantGR = new GlideRecord('notifynow_participant');
if (participantGR.get('<participant_sys_id>')) {
    var result = new SNC.NotifyNow().mute(participantGR);
}

// Unmute a participant on a conference call.
// @param participant {GlideRecord} The 'notifynow_participant' record to unmute.
// @return {Boolean} True if the participant was unmuted.
var participantGR = new GlideRecord('notifynow_participant');
if (participantGR.get('<participant_sys_id>')) {
    var result = new SNC.NotifyNow().unmute(participantGR);
}
```

### NotifyPhoneNumber API
Provides methods to query information about a Notify phone number. Use `SNC.Notify` for global scope and `sn_notify.NotifyScoped` for scoped applications.

#### Methods
```javascript
// Get all available phone numbers
var numbers = SNC.Notify.getPhoneNumbers(); // Global
var numbersScoped = sn_notify.NotifyScoped.getPhoneNumbers(); // Scoped

// Check if any numbers were returned
if (numbers.size() > 0) {
    var number = numbers.get(0); // Get the first NotifyPhoneNumber object

    // Get the E.164-compliant phone number.
    var e164 = number.getNumber(); // e.g., "+15551234567"

    // Get the international dialing code for the number's country.
    var dialCode = number.getDialCode(); // e.g., "+1"

    // Get the country associated with the phone number.
    var country = number.getTerritory(); // e.g., "United States"

    // Check if the number supports conference calling.
    var canConference = number.supportsConferenceCall(); // returns boolean

    // Check if the number supports outgoing SMS.
    var canSendSms = number.supportsOutgoingSMS(); // returns boolean
}
```
## Client-Side APIs (GlideList2)
Provides methods to control and manipulate list views in the browser. The `GlideList2` object is the modern replacement for the deprecated `GlideListV3` (`g_list`).

### Methods
```javascript
// Get the list object for a specific list ID (e.g., a related list on a form)
var list = GlideList2.get(listId); // listId is often available in the context of UI Actions

// Get the encoded query string for the list, with options to include sorting and fixed queries
var fullQuery = list.getQuery({orderby: true, groupby: true, fixed: true});

// Get the table name for the list
var tableName = list.getTableName();

// Get the view name for the list
var viewName = list.getView();

// Get the title of the list
var title = list.getTitle();

// Check if the list has been personalized by the user
var isPersonalized = list.isUserList();

// Refresh the list, ignoring any orderBy part of the filter
list.refresh(1); // The '1' indicates to start from the first row

// Refresh the list, including the orderBy part of the filter
list.refreshWithOrderBy();

// Set a new filter (encoded query) for the list, ignoring orderBy and groupBy parts
list.setFilter("active=true^priority=1");

// Set a new filter and immediately refresh the list
list.setFilterAndRefresh("state=2^ORDERBYnumber");

// Set the first row to display when the list is refreshed
list.setFirstRow(10); // Starts display from the 10th record

// Set the groupBy criteria for the list
list.setGroupBy('category');

// Set the orderBy criteria for the list
list.setOrderBy('orderByDescnumber'); // Sorts by number descending

// Set the number of rows to display per page
list.setRowsPerPage(20);

// Sort the list by a field in ascending order
list.sort('priority');

// Sort the list by a field in descending order
list.sortDescending('priority');
```

## Client-Side APIs (GlideModal & GlideModalForm)
Provides methods for displaying content overlays, forms, and interactive windows (modals).

### GlideModalForm
Used to display a standard ServiceNow form inside a modal window.

```javascript
// Constructor: new GlideModalForm(title, tableName, [callback])
var gm = new GlideModalForm('Create New Incident', 'incident');

// Set a preference/parameter to pass to the form
gm.setPreference('table', 'incident');

// Set the sys_id for the form to load (-1 for a new record)
gm.setSysID('-1');

// Add a parameter to the URL, similar to g_form.addParm()
gm.addParm('sysparm_query', 'active=true');

// Set a callback function to run after the form is submitted
gm.setCompletionCallback(function(action_verb, sys_id, table, displayValue) {
    g_form.addInfoMessage(displayValue + ' was created.');
});

// Set a callback function to run after the modal form has loaded
gm.setOnloadCallback(function(glideModalForm) {
    // glideModalForm is the GlideModalForm object, useful for manipulation on load
});

// Render the modal window
gm.render();
```

### GlideModal
A more generic API for displaying custom content (from UI Pages or HTML) in a modal.

```javascript
// Constructor: new GlideModal(uiPageName, readOnly, width)
var gm = new GlideModal('my_custom_ui_page', false, 600);

// Set the title of the modal window
gm.setTitle('Custom Dialog');

// Set a preference to pass data into the UI Page being rendered
gm.setPreference('my_preference_name', 'my_value');

// Render the modal window using the specified UI Page
gm.render();

// Alternatively, render a modal with custom HTML content directly
gm.renderWithContent('<p>This is custom HTML content.</p>');

// Close the currently open modal
gm.destroy();

// Statically get a handle to an open modal to close it from another script
var currentModal = GlideModal.get();
if (currentModal) {
    currentModal.destroy();
}
```

## Client-Side APIs (GlideNavigation)
Provides methods to control and refresh the main navigator and frames, accessed via the global `g_navigation` object.

```javascript
// Redirects the current frame to a new URL
g_navigation.open('incident_list.do?sysparm_query=active=true');

// Opens a specified URL in a popup window
g_navigation.openPopup('incident_list.do', 'Active Incidents');

// Redirects to a specific record form
g_navigation.openRecord('incident', '4e49c0e81bf198101363ff37dc4bcb8a');

// Refreshes the main navigator (left-hand navigation pane)
g_navigation.refreshNavigator();

// Reloads the entire current window/frame
g_navigation.reloadWindow();
```

## Scripted REST APIs

This section details how to interact with various ServiceNow REST APIs from server-side scripts using `sn_ws.RESTMessageV2` or from external clients using tools like cURL.

### Advanced Work Assignment (AWA) APIs

#### Update Agent Capacities
Updates an agent's universal capacity and/or maximum capacity for specific service channels.

- **Endpoint**: `PUT /api/now/awa/agents/{user_id}/capacities`
- **Path Parameters**:
  - `user_id` (String): Sys_id of the agent.
- **Request Body**:
  ```json
  {
      "channels": {
          "<channel_sys_id>": <max_capacity_number>,
          "<channel_sys_id_2>": <max_capacity_number_2>
      },
      "universal_capacity": <max_capacity_across_all_channels>
  }
  ```
- **Example**:
  ```bash
  curl "https://instance.service-now.com/api/now/awa/agents/46d44a23a9fe19810012d100cca80666/capacities" \
  --request PUT \
  --header "Accept:application/json" \
  --header "Content-Type:application/json" \
  --data "{ \"channels\": { \"27f675e3739713004a905ee515f6a7c3\": 6 }, \"universal_capacity\" : 12 }" \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "channels": [
        {
          "channel_sys_id": "27f675e3739713004a905ee515f6a7c3",
          "max_capacity": 6
        }
      ],
      "universal_capacity": 12
    }
  }
  ```

#### Get Rejection Reasons
Gets the work item rejection reasons for a specified service channel.

- **Endpoint**: `GET /api/now/awa/inbox/actions/reject_reasons/{channel_id}`
- **Path Parameters**:
  - `channel_id` (String): Sys_id of the service channel.
- **Example**:
  ```bash
  curl "https://instance.service-now.com/api/now/awa/inbox/actions/reject_reasons/27f675e3739713004a905ee515f6a7c3" \
  --request GET \
  --header "Accept:application/json" \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": [
      {
        "order": 2,
        "value": "Not my expertise",
        "display_value": "Not my expertise",
        "sys_id": "31e3fa29b38023002e7b6e5f26a8dc17"
      },
      {
        "order": 1,
        "value": "Busy",
        "display_value": "Busy",
        "sys_id": "4e93fa29b38023002e7b6e5f26a8dc20"
      }
    ]
  }
  ```

#### Accept Work Item
Accepts a work item in a 'Pending Accept' state on behalf of an agent.

- **Endpoint**: `POST /api/now/awa/inbox/actions/accept`
- **Request Body**:
  ```json
  {
      "agent_id": "<agent_sys_id>",
      "work_item_id": "<work_item_sys_id>"
  }
  ```
- **Example**:
  ```bash
  curl "https://instance.service-now.com/api/now/awa/inbox/actions/accept" \
  --request POST \
  --header "Accept:application/json" \
  --header "Content-Type:application/json" \
  --data "{ \"agent_id\":\"46c9e158a9fe198101d44d0d22cb640d\", \"work_item_id\":\"fd69abfc878b01101ae365b83cbb35fe\" }" \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "documentSysId": "57af7aec73d423002728660c4cf6a71c",
      "documentTable": "incident"
    }
  }
  ```

#### Reject Work Item
Rejects a work item in a 'Pending Accept' state on behalf of an agent.

- **Endpoint**: `POST /api/now/awa/inbox/actions/reject`
- **Request Body**:
  ```json
  {
      "agent_id": "<agent_sys_id>",
      "work_item_id": "<work_item_sys_id>",
      "reject_reason_id": "<reject_reason_sys_id>"
  }
  ```
- **Example**:
  ```bash
  curl "https://instance.service-now.com/api/now/awa/inbox/actions/reject" \
  --request POST \
  --header "Accept:application/json" \
  --header "Content-Type:application/json" \
  --data "{ \"agent_id\":\"46c9e158a9fe198101d44d0d22cb640d\", \"work_item_id\":\"3ed5df4d87cf01101ae365b83cbb35af\", \"reject_reason_id\":\"31e3fa29b38023002e7b6e5f26a8dc17\" }" \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "work_item_id": "3ed5df4d87cf01101ae365b83cbb35af",
      "reject_reason_id": "31e3fa29b38023002e7b6e5f26a8dc17",
      "agent_id": "46c9e158a9fe198101d44d0d22cb640d"
    }
  }
  ```

### Batch API
Sends multiple REST API requests in a single call.

- **Endpoint**: `POST /api/now/v1/batch`
- **Request Body**:
  ```json
  {
    "batch_request_id": "unique_batch_id",
    "rest_requests": [
      {
        "id": "request_1",
        "method": "GET",
        "url": "/api/now/table/incident?sysparm_limit=1"
      },
      {
        "id": "request_2",
        "method": "POST",
        "url": "/api/now/table/incident",
        "headers": [
          { "name": "Content-Type", "value": "application/json" }
        ],
        "body": "BASE64_ENCODED_JSON_STRING"
      }
    ]
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "batch_request_id": "unique_batch_id",
    "serviced_requests": [
      {
        "id": "request_1",
        "status_code": 200,
        "body": "BASE64_ENCODED_RESPONSE_BODY"
      },
      {
        "id": "request_2",
        "status_code": 201,
        "body": "BASE64_ENCODED_RESPONSE_BODY"
      }
    ],
    "unserviced_requests": []
  }
  ```

### Case API (Customer Service Management)
Retrieves and updates Customer Service Management (CSM) case records.

#### Get Case Activities
Retrieves the activity stream for a specified CSM case.

- **Endpoint**: `GET /api/sn_customerservice/case/{id}/activities`
- **Path Parameters**:
  - `id` (String): The sys_id or case number of the CSM case.
- **Query Parameters**:
  - `sysparm_activity_type` (String): Comma-separated list of activity types to return (e.g., `attachment,work_notes,comments`). Default is all types.
  - `sysparm_limit` (Number): Maximum number of records to return.
  - `sysparm_offset` (Number): Starting record index for pagination.
- **Example**:
  ```bash
  curl "https://instance.servicenow.com/api/sn_customerservice/case/f352dc9387632300d6b0a7da0acb0b60/activities" \
  --request GET \
  --header "Accept: application/json" \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "display_value": "CS0001401",
      "sys_id": "f352dc9387632300d6b0a7da0acb0b60",
      "entries": [
        {
          "sys_created_on_adjusted": "2020-05-04 14:15:44",
          "user_sys_id": "da419c1fc312310015519f2974d3ae15",
          "name": "John Jason",
          "value": "Hi, Alex. Can you please send me a photo...",
          "element": "comments"
        }
      ]
    }
  }
  ```
  ### Contact API (CSM)

#### Create Contact
Creates a new Customer Service Management (CSM) contact.

- **Endpoint**: `POST /api/now/contact`
- **Request Headers**:
  - `Accept`: `application/json`
  - `Content-Type`: `application/json`
- **Key Request Body Parameters**:
  - `account` (String): Sys_id of the associated account record.
  - `first_name` (String): Contact's first name.
  - `last_name` (String): Contact's last name.
  - `email` (String): Contact's email address.
  - `phone` (String): Contact's business phone number.
  - `title` (String): Contact's business title.
  - `active` (Boolean): Flag indicating if the contact is active. Default is `true`.
- **Example**:
  ```bash
  curl "https://instance.servicenow.com/api/now/contact" \
  --request POST \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --data '{ \
    "first_name": "Dora", \
    "last_name": "Warren", \
    "email": "dora.warren@mailinator.com", \
    "phone": "+1 858 287 7834", \
    "account": "86837a386f0331003b3c498f5d3ee4ca", \
    "title": "Network Administrator" \
  }' \
  --user 'username':'password'
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "result": "62fe1c97db76c3006b7a9646db961999"
  }
  ```

### CI/CD API
A set of asynchronous APIs for automating application deployment and testing. Most endpoints initiate a process and return a `progress_id` or `result_id` to check the status later. The `sn_cicd.sys_ci_automation` role is required.

#### Get Batch Install Results
Returns the results of a batch installation.

- **Endpoint**: `GET /api/sn_cicd/app/batch/results/{result_id}`
- **Path Parameters**:
  - `result_id` (String): The sys_id of the batch installation to check.
- **Example**:
  ```bash
  curl 'instance.servicenow.com/api/sn_cicd/app/batch/results/df24b1e9db2d0110b5e3f6c5ae97c561' \
  --request GET \
  --header 'Accept: application/json' \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "batch_plan": {
        "name": "Release 2.0 IT Operations",
        "id": "df24b1e9db2d0110b5e3f6c5ae97c561",
        "state": "Installed",
        "notes": "User specified notes for batch install plan"
      },
      "batch_items": [
        {
          "name": "com.sn_cicd_spoke",
          "type": "Application",
          "version": "7.0.0",
          "state": "Installed",
          "id": "c159b1e9db1c0010b5e3f6c5ae961903"
        }
      ]
    }
  }
  ```

#### Get Progress/Status
Returns the current progress and status of an asynchronous CI/CD function.

- **Endpoint**: `GET /api/sn_cicd/progress/{progress_id}`
- **Path Parameters**:
  - `progress_id` (String): The unique identifier for the process to check.
- **Example**:
  ```bash
  curl 'instance.servicenow.com/api/sn_cicd/progress/a4fae8911bdc00103d374087bc4bcbbd' \
  --request GET \
  --header 'Accept: application/json' \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "links": {
        "progress": {
          "id": "a4fae8911bdc00103d374087bc4bcbbd",
          "url": "..."
        }
      },
      "status": "2",
      "status_label": "Successful",
      "status_message": "This operation succeeded",
      "percent_complete": 100
    }
  }
  ```

#### Get Test Suite Results
Returns the results of an ATF test suite run.

- **Endpoint**: `GET /api/sn_cicd/testsuite/results/{result_id}`
- **Path Parameters**:
  - `result_id` (String): The unique identifier for the test suite results.
- **Example**:
  ```bash
  curl 'instance.servicenow.com/api/sn_cicd/testsuite/results/2891389d1b1040103d374087bc4bcb09' \
  --request GET \
  --header 'Accept: application/json' \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "links": { ... },
      "status": "2",
      "status_label": "Successful",
      "test_suite_status": "success",
      "test_suite_duration": "1 Second",
      "rolledup_test_success_count": 1,
      "rolledup_test_failure_count": 0,
      "test_suite_name": "Quick Test"
    }
  }
  ```

#### Start Batch Install
Installs two or more packages (applications or plugins) in a single batch.

- **Endpoint**: `POST /api/sn_cicd/app/batch/install`
- **Request Body**:
  ```json
  {
    "name": "Release 2.2 Deployment",
    "packages": [
      {
        "id": "syd_id_abcefghi",
        "type": "application",
        "requested_version": "1.0.2"
      },
      {
        "id": "com.glide.some.plugin",
        "type": "plugin"
      }
    ]
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "links": {
        "progress": { "id": "c159b1e9db1c0010b5e3f6c5ae961903", ... },
        "results": { "id": "df24b1e9db2d0110b5e3f6c5ae97c561", ... },
        "rollback":{ "id": "a329f82e871da64c724ba21c82a764f2" }
      },
      "status": "0",
      "status_label": "Pending",
      "percent_complete": 0
    }
  }
  ```

#### Start Instance Scan
Runs all active checks on an instance (`full_scan`) or against a specific record (`point_scan`).

- **Endpoint (Full)**: `POST /api/sn_cicd/instance_scan/full_scan`
- **Endpoint (Point)**: `POST /api/sn_cicd/instance_scan/point_scan`
- **Query Parameters (Point Scan)**:
  - `target_table` (String): Required. The table name of the record to scan.
  - `target_sys_id` (String): Required. The sys_id of the record to scan.
- **Example (Full Scan)**:
  ```bash
  curl 'instance.service-now.com/api/sn_cicd/instance_scan/full_scan' \
  --request POST \
  --header 'Accept: application/json' \
  --user 'username':'password'
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "result": {
      "links": {
        "progress": {
          "id": "a4fae8911bdc00103d374087bc4bcbbd",
          "url": "..."
        }
      },
      "status": "0",
      "status_label": "Pending"
    }
  }
  ```

  ## Product Catalog Open API

### GET /sn_tmf_api/catalogmanagement/productSpecification/{id}
- **Description**: Retrieves a specified product specification record.
- **Path Parameters**:
    - `id` (String): The sys_id or initial version of the product specification to retrieve.
- **Query Parameters**:
    - `fields` (String): Comma-separated list of fields to return in the response.
    - `state` (String): Filter by state. Accepted values: `archived`, `draft`, `published`, `retired`.
- **Response Body**: A JSON object representing the product specification with the following key fields:
    - `id` (String): Sys_id or external ID of the product specification.
    - `href` (String): Relative link to the resource record.
    - `name` (String): Name of the specification.
    - `displayName` (String): Display name for the product specification.
    - `description` (String): Description of the specification.
    - `isBundle` (Boolean): `true` if the specification is a product bundle; `false` for a single product.
    - `lifecycleStatus` (String): Current life cycle status (e.g., `Active`, `Inactive`, `Draft`).
    - `status` (String): Status of the product specification (e.g., `draft`, `published`).
    - `version` (String): External version of the product specification.
    - `internalVersion` (String): Internal version of the product specification.
    - `validFor` (Object): Date range the specification is valid for, containing `startDateTime` and `endDateTime`.
    - `productSpecCharacteristic` (Array of Objects): List of product characteristics. Each object contains:
        - `name` (String): Name of the characteristic.
        - `description` (String): Description of the characteristic.
        - `valueType` (String): Value type (e.g., `choice`, `yes_no`).
        - `productSpecCharacteristicValue` (Array of Objects): List of possible values. Each object contains:
            - `value` (String): The characteristic value.
            - `isDefault` (Boolean): Flag if this is the default value.
            - `isMandatory` (Boolean): Flag if this value is mandatory.
    - `productSpecificationRelationship` (Array of Objects): Relationships to other product specifications.
    - `resourceSpecification` (Array of Objects): List of related resource specifications.
    - `serviceSpecification` (Array of Objects): List of related service specifications.

- **Example Request**:
    ```bash
    curl --location --request GET \
     "https://instance.service-now.com/api/sn_tmf_api/catalogmanagement/productSpecification/cfe5ef6a53702010cd6dddeeff7b12f6" \
    --header "Accept:application/json" \
    --user 'username':'password'
    ```
- **Example Response**:
    ```json
    {
        "id": "cfe5ef6a53702010cd6dddeeff7b12f6",
        "href": "/api/sn_tmf_api/catalogmanagement/productSpecification/497a39a7c3d312105acc9e62b540dd14",
        "name": "SD-WAN Service Package",
        "displayName": "SD-WAN Service Package v4",
        "isBundle": true,
        "lifecycleStatus": "Active",
        "productSpecificationRelationship": [
            {
                "id": "a6514bd3534560102f18ddeeff7b1247",
                "name": "SD-WAN Security",
                "type": "Service",
                "compatibilityRelationshipType": ""
            }
        ],
        "productSpecCharacteristic": [
            {
                "name": "Down Time",
                "description": "Down Time",
                "valueType": "choice",
                "productSpecCharacteristicValue": [
                    {
                        "value": "0.01",
                        "isDefault": false,
                        "isMandatory": false
                    }
                ]
            }
        ]
    }
    ```

### PATCH /sn_tmf_api/catalogmanagement/productOffering/{id}
- **Description**: Updates a specified product offering.
- **Path Parameters**:
    - `id` (String): The sys_id of the product offering to update.
- **Request Body**: A JSON object representing the product offering fields to update. Key fields include:
    - `name` (String): Name of the product offering.
    - `displayName` (String): Display name of the product offering.
    - `description` (String): Description of the product offering.
    - `isBundle` (Boolean): Flag indicating if the offering is a bundle.
    - `isSellable` (Boolean): Flag indicating if the product can be sold separately.
    - `lifecycleStatus` (String): `Active`, `Inactive`, or `Draft`.
    - `status` (String): `draft` or `published`.
    - `category` (Array of Objects): List of categories the product belongs to. Each object has `id` and `name`.
    - `channel` (Array of Objects): List of channels for selling the product. Each object has `id` and `name`.
    - `productOfferingPrice` (Array of Objects): Price information. Each object contains:
        - `priceType` (String): `nonRecurring` or `recurring`.
        - `price` (Object): Contains `taxIncludedAmount` object with `unit` and `value`.
    - `bundledProductOffering` (Array of Objects): List of product offerings included in a bundle.
    - `productSpecification` (Object): The product specification for the product, with `id`, `name`, etc.

- **Example Request**:
    ```bash
    curl "http://instance.servicenow.com/api/sn_tmf_api/catalogmanagement/productOffering/313b917843235210a82ed6085bb8f2c7" \
    --request PATCH \
    --header "Accept:application/json" \
    --user 'username':'password' \
    --data '{
        "name": "Internet bundle",
        "displayName": "Internet bundle",
        "lifecycleStatus": "Draft",
        "isBundle": true,
        "productOfferingPrice": [
            {
                "priceType": "recurring",
                "price": {
                    "taxIncludedAmount": {
                        "unit": "USD",
                        "value": "0"
                    }
                }
            }
        ]
    }'
    ```
- **Example Response**:
    ```json
    {
        "id": "313b917843235210a82ed6085bb8f2c7",
        "href": "/api/sn_tmf_api/catalogmanagement/productOffering/313b917843235210a82ed6085bb8f2c7",
        "name": "Internet bundle",
        "displayName": "Internet bundle",
        "lifecycleStatus": "Draft",
        "isBundle": true,
        "status": "draft"
    }
    ```

    ## Service Contract API

### Create Service Contract Line
Creates a service contract line, its child lines, and associated entitlements.

- **Endpoint**: `POST /api/sn_pss_core/servicecontract/contractline`
- **Key Request Body Parameters**:
    - `state` (String): Required. Current state of the contract line (e.g., `active`, `draft`).
    - `contract` (String): Sys_id of the parent service contract.
    - `name` (String): Required. Name of the service contract line.
    - `starts` (String): Required. Start date of the contract line (Format: `yyyy-mm-dd`).
    - `entitlements` (Array of Objects): List of entitlements for this contract line.
        - `entitlement_name` (String): Required. Name of the entitlement.
        - `start_date` (String): Required. Start date of the entitlement.
        - `state` (String): Required. State of the entitlement (e.g., `active`).
        - `entitlement_characteristics` (Array of Objects): Characteristics of the entitlement.
            - `characteristic` (String): Required. Sys_id of the characteristic record.
            - `type` (String): Type of characteristic (e.g., `coverage`, `coverage_and_usage`).
            - `value` (String): Value of the characteristic.
    - `sold_products_covered` (Array of Objects): List of sold products covered.
        - `sold_product` (String): Sys_id of the sold product.
    - `install_base_items_covered` (Array of Objects): List of install base items covered.
        - `install_base` (String): Sys_id of the install base item.
    - `child_contract_lines` (Array of Objects): Nested child contract lines with the same structure as the parent.

- **Example cURL Request**:
    ```bash
    curl "https://instance.servicenow.com/api/sn_pss_core/servicecontract/contractline" \
    --request POST \
    --header "Accept:application/json" \
    --header "Content-Type:application/json" \
    --user 'username':'password' \
    --data '{
      "state": "active",
      "contract": "a4b415d1d1f53110f8776589fa411f20",
      "name": "CLI",
      "starts": "2022-12-03",
      "entitlements": [{
        "state": "active",
        "entitlement_name": "ENTL 1",
        "start_date": "2022-12-03",
        "entitlement_characteristics": [{
          "characteristic": "63418db7539e61106bfcddeeff7b1238",
          "characteristic_option": "495149b7539e61106bfcddeeff7b1262",
          "value": "20",
          "type": "coverage_and_usage",
          "entitlement_usage": { "used_units": "3" }
        }]
      }],
      "child_contract_lines": [{
        "state": "active",
        "name": "Child CLI",
        "starts": "2022-12-03",
        "entitlements": [{
          "state": "active",
          "entitlement_name": "Child CLI - ENTL",
          "start_date": "2022-12-03"
        }]
      }]
    }'
    ```

- **Example Success Response**:
    ```json
    {
      "result": {
        "sys_id": "16e451d1d1f53110f8776589fa411f80",
        "name": "CLI",
        "number": "CTRL00000001",
        "child_contract_lines": [
          {
            "sys_id": "3a39ecdc01154f4ab782da0169c9c922",
            "name": "Child CLI",
            "number": "CTRL00000001",
            "entitlements": [
              {
                "sys_id": "7439fd84c2494ba6951e58f333cfe8d4",
                "entitlement_name": "Child CLI - ENTL"
              }
            ]
          }
        ],
        "entitlements": [
          {
            "sys_id": "9ee451d1d1f53110f8776589fa411f83",
            "entitlement_name": "ENTL 1"
          }
        ]
      }
    }
    ```

## Service Order Open API (TMF)

### Get Service Orders
Retrieves a list of all service orders.

- **Endpoint**: `GET /api/sn_tmf_api/order/serviceOrder`
- **Key Query Parameters**:
    - `fields` (String): Comma-separated list of fields to return.
    - `limit` (Number): Maximum number of records to return (Default: 20, Max: 100).
    - `offset` (Number): Starting index for pagination.
    - `state` (String): Filter orders by a specific state.

- **Example cURL Request**:
    ```bash
    curl "http://instance.service-now.com/api/sn_tmf_api/order/serviceOrder" \
    --request GET \
    --header "Accept:application/json" \
    --user 'username':'password'
    ```

- **Example Success Response**:
    ```json
    [
      {
        "id": "bd30366ec3a83010abc8b5183c40dd92",
        "href": "/api/sn_tmf_api/order/serviceOrder/bd30366ec3a83010abc8b5183c40dd92",
        "state": "completed",
        "serviceOrderItem": [
          {
            "id": "100",
            "action": "add",
            "state": "active",
            "service": {
              "id": "4b5072aec3a83010abc8b5183c40dd42",
              "serviceType": "cfs",
              "serviceCharacteristic": [
                {
                  "name": "Firewall coverage",
                  "value": "Premium(Up to 50 sites)\n\t\t"
                }
              ]
            }
          }
        ]
      }
    ]
    ```

### Create/Update/Delete Service Order
Creates, updates, or deletes a service order or its line items based on the `action` property.

- **Endpoint**: `POST /api/sn_tmf_api/order/serviceOrder`
- **Key Query Parameters**:
    - `mode` (String): Set to `async` for asynchronous processing.
- **Key Request Body Parameters**:
    - `externalId` (String): An external identifier for the order.
    - `requestedCompletionDate` (String): Requested completion date (Format: `YYYY-MM-DDTHH:MM:SSZ`).
    - `relatedParty` (Array of Objects): Contacts for the order (e.g., customer, consumer).
    - `serviceOrderItem` (Array of Objects): Required. List of line items and their actions.
        - `id` (String): Required. Unique identifier for the line item.
        - `action` (String): Required. The action to perform (`add`, `change`, `delete`, `no-change`, `resume`, `suspend`).
        - `service` (Object): Details of the service being ordered.
            - `serviceSpecification` (Object): Contains the `id` of the service specification.
            - `serviceCharacteristic` (Array of Objects): List of characteristics with `name` and `value`.

- **Example cURL Request (Add Action)**:
    ```bash
    curl "https://instance.service-now.com/api/sn_tmf_api/serviceorder" \
    --request POST \
    --header "Accept:application/json" \
    --header "Content-Type:application/json" \
    --user 'username':'password' \
    --data '{
      "externalId": "BSS748",
      "requestedStartDate": "2018-01-15T09:37:40.508Z",
      "serviceOrderItem": [{
        "id": "100",
        "action": "add",
        "actionReason": "adding service package OLI",
        "quantity": 1,
        "service": {
          "@type": "CFS",
          "serviceCharacteristic": [{
            "name": "Firewall Security",
            "value": "Standard"
          }],
          "serviceSpecification": {
            "id": "f99546ff07266010a7955b7e0ad300a8"
          }
        }
      }]
    }'
    ```

- **Example Success Response**:
    ```json
    {
      "externalId": "BSS748",
      "id": "4f2af65ac3a030106e2473ce3640ddcf",
      "state": "new",
      "serviceOrderItem": [
        {
          "id": "100",
          "action": "add",
          "state": "new",
          "service": {
            "serviceCharacteristic": [
              {
                "name": "Firewall Security",
                "value": "Standard"
              }
            ]
          }
        }
      ]
    }
    ```

    ## Table API (REST)
Provides direct, record-level access (CRUD operations) to ServiceNow tables.

### Endpoints

#### Create a Record
- **Method**: `POST`
- **Endpoint**: `/api/now/table/{tableName}`
- **Description**: Inserts a single record into the specified table.

#### Update a Record (Partial)
- **Method**: `PATCH`
- **Endpoint**: `/api/now/table/{tableName}/{sys_id}`
- **Description**: Updates specific fields of an existing record without modifying others.

#### Update a Record (Full)
- **Method**: `PUT`
- **Endpoint**: `/api/now/table/{tableName}/{sys_id}`
- **Description**: Replaces an entire existing record with the data provided in the request body. Fields not included in the request are set to null or their default value.

### Path Parameters
- `tableName` (String): Required. The name of the table to operate on (e.g., `incident`).
- `sys_id` (String): Required for `PATCH` and `PUT`. The unique identifier of the record to update.
- `api_version` (String): Optional. The version of the endpoint to use (e.g., `v1`, `v2`).

### Common Query Parameters
- `sysparm_display_value` (String): Determines data format in the response.
    - `true`: Returns display values (e.g., user names for reference fields).
    - `false`: (Default) Returns actual database values (e.g., sys_ids for reference fields).
    - `all`: Returns both actual and display values.
- `sysparm_fields` (String): Comma-separated list of field names to return in the response.
- `sysparm_input_display_value` (Boolean): Determines how input data is processed.
    - `true`: Treats input values as display values (e.g., sending a user's name for a reference field will be converted to the correct sys_id).
    - `false`: (Default) Treats input values as actual database values.
- `sysparm_exclude_reference_link` (Boolean): If `true`, excludes the `link` object for reference fields in the response. Default is `false`.
- `sysparm_view` (String): Specifies the UI view to use, which can affect which fields are returned by default (e.g., `desktop`, `mobile`). `sysparm_fields` takes precedence.

### Request Body
A JSON object containing key-value pairs where the key is the field name and the value is the data to be set.

### Request Headers
- `Accept`: `application/json` or `application/xml`. Default is `application/json`.
- `Content-Type`: `application/json` or `application/xml`. Default is `application/json`.
- `X-no-response-body` (Boolean): If `true`, suppresses the response body for create/update operations.

### Response Headers
- `Location`: Returned on a successful `POST` request. Contains the URL to the newly created resource.

### Status Codes
- `201 Created`: Successful record creation (`POST`).
- `200 OK`: Successful record update (`PATCH`, `PUT`).
- `400 Bad Request`: Malformed request or invalid data.
- `404 Not Found`: The specified record or table was not found.

### Examples

#### Create an Incident (POST)
```bash
curl "https://instance.servicenow.com/api/now/table/incident" \
--request POST \
--header "Accept:application/json" \
--header "Content-Type:application/json" \
--data "{'short_description':'Unable to connect to office wifi','assignment_group':'287ebd7da9fe198100f92cc8d1d2154e','urgency':'2'}" \
--user 'username':'password'
```
**Success Response (201 Created)**
```json
{
  "result": {
    "sys_id": "c537bae64f411200adf9f8e18110c76e",
    "number": "INC0010002",
    "short_description": "Unable to connect to office wifi",
    "urgency": "2",
    "assignment_group": {
      "link": "...",
      "value": "287ebd7da9fe198100f92cc8d1d2154e"
    }
  }
}
```

#### Update an Incident (PATCH)
```bash
curl "https://instance.servicenow.com/api/now/table/incident/ef43c6d40a0a0b5700c77f9bf387afe3" \
--request PATCH \
--header "Accept:application/json" \
--header "Content-Type:application/json" \
--data "{'urgency':'1','comments':'Elevating urgency, this is a blocking issue'}" \
--user 'username':'password'
```
**Success Response (200 OK)**
```json
{
  "result": {
    "sys_id": "ef43c6d40a0a0b5700c77f9bf387afe3",
    "number": "INC0000050",
    "urgency": "1",
    "comments": "Elevating urgency, this is a blocking issue"
  }
}
```

## Server-Side APIs (Outbound REST)

### sn_ws.RESTMessageV2
Used in server-side scripts to send outbound REST requests to external web services.

#### Key Methods
- `setEndpoint(url)`: Sets the full URL of the REST endpoint.
- `setMethod(method)`: Sets the HTTP method (e.g., 'get', 'post', 'put', 'patch', 'delete').
- `setRequestHeader(name, value)`: Adds a request header.
- `setRequestBody(body)`: Sets the body content for POST, PUT, or PATCH requests.
- `setQueryParameter(name, value)`: Adds a parameter to the request URL.
- `execute()`: Executes the request and returns a `RESTResponseV2` object.
- `executeAsync()`: Executes the request asynchronously.

### sn_ws.RESTResponseV2
The object returned by `RESTMessageV2.execute()`.

#### Key Methods
- `getBody()`: Returns the response body as a string.
- `getStatusCode()`: Returns the HTTP status code as an integer.
- `getHeader(name)`: Returns the value of a specific response header.
- `getHeaders()`: Returns all response headers.
- `getErrorMessage()`: Returns any error message if the request failed.
- `haveError()`: Returns `true` if there was an error executing the request.

### Example: Calling an External API
```javascript
try {
    // Create and configure the REST message
    const request = new sn_ws.RESTMessageV2();
    request.setEndpoint('https://api.example.com/data');
    request.setMethod('post');
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    
    const requestBody = {
        "key": "value",
        "incident_number": current.number.toString()
    };
    request.setRequestBody(JSON.stringify(requestBody));

    // Execute the request
    const response = request.execute();
    const httpStatus = response.getStatusCode();
    const responseBody = response.getBody();

    // Process the response
    if (httpStatus === 200 || httpStatus === 201) {
        gs.info('Successfully sent data. Response: ' + responseBody);
        const parsedResponse = JSON.parse(responseBody);
        current.correlation_id = parsedResponse.transaction_id;
    } else {
        gs.error('Request failed. Status: ' + httpStatus + ', Body: ' + responseBody);
    }

} catch (ex) {
    gs.error('REST Message script failed: ' + ex.getMessage());
}
```

## Script Includes
Define reusable server-side code, typically as a JavaScript class. They can be called from other server scripts (Business Rules, UI Actions) or from client scripts via GlideAjax.

### Defining a Script Include
- **Name**: The name of the Script Include, which must match the class name.
- **API Name**: The scoped name used to call the script (e.g., `x_scope_name.MyUtil`).
- **Client callable**: Must be checked to allow access from client-side scripts (GlideAjax).
- **Script**: Contains the class definition.

#### Example: General Utility Script Include
```javascript
// Script Include Name: MyTaskUtils
// API Name: x_scope_name.MyTaskUtils
var MyTaskUtils = Class.create();
MyTaskUtils.prototype = {
    initialize: function() {
        // Constructor logic here
    },

    /**
     * Checks if a task has any open child tasks.
     * @param {string} parentSysId - The sys_id of the parent task.
     * @returns {boolean} - True if open child tasks exist, false otherwise.
     */
    hasOpenChildTasks: function(parentSysId) {
        if (!parentSysId) {
            return false;
        }
        const childTask = new GlideRecord('x_scope_name_my_task');
        childTask.addQuery('parent', parentSysId);
        childTask.addQuery('active', true);
        childTask.setLimit(1);
        childTask.query();
        return childTask.hasNext();
    },

    type: 'MyTaskUtils'
};
```

#### Calling from another Server Script
```javascript
// In a Business Rule or other server script
const utils = new x_scope_name.MyTaskUtils();
const hasOpenChildren = utils.hasOpenChildTasks(current.getUniqueValue());
if (hasOpenChildren) {
    gs.addErrorMessage('Cannot close task with open child tasks.');
    current.setAbortAction(true);
}
```

## UI Actions
Add buttons, links, and context menu items to forms and lists. They can contain both client-side and server-side logic.

### Properties
- `name`: The display name of the button/link.
- `table`: The table where the UI Action appears.
- `action_name`: The system name, used for scripting.
- `client`: A boolean. If `true`, the `onClick` script runs first.
- `form_button`, `form_link`, `list_button`, etc.: Booleans to control where the UI Action appears.
- `on_click`: A function containing the client-side script to run. Must call `gsftSubmit()` to trigger the server script.
- `script`: A string containing the server-side script to run.

### Example: Client and Server-side UI Action
This UI Action asks for confirmation on the client, then runs server-side code to close a task.

- **Name**: `Close Task`
- **Table**: `x_scope_name_my_task`
- **Client**: `true`
- **Form button**: `true`

#### `on_click` (Client Script)
```javascript
function closeTaskOnClick() {
    // Ask for confirmation before proceeding
    if (confirm('Are you sure you want to close this task?')) {
        // If confirmed, call the server-side script
        gsftSubmit(null, g_form.getFormElement(), 'close_my_task'); // 'close_my_task' is the Action name
    }
}
```

#### `script` (Server Script)
```javascript
// This code runs after the client script calls gsftSubmit()
current.state = 3; // 3 = Closed
current.active = false;
current.update();

// Redirect the user back to the list view
action.setRedirectURL(current.getTableName() + '_list.do');
```

## GlideAjax
A mechanism for a client-side script to call a server-side Script Include asynchronously without reloading the page.

### 1. The Script Include (Server-Side)
Must be **client-callable** and extend `AbstractAjaxProcessor`.

- **Name**: `MyTaskAjaxUtils`
- **API Name**: `x_scope_name.MyTaskAjaxUtils`
- **Client callable**: `true`

```javascript
var MyTaskAjaxUtils = Class.create();
MyTaskAjaxUtils.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    /**
     * Gets the display name of the assigned_to user for a given task.
     */
    getAssigneeName: function() {
        const taskSysId = this.getParameter('sysparm_task_id');
        const taskGR = new GlideRecord('x_scope_name_my_task');
        if (taskGR.get(taskSysId)) {
            return taskGR.assigned_to.getDisplayValue();
        }
        return 'User not found';
    },

    type: 'MyTaskAjaxUtils'
});
```

### 2. The Client Script (Client-Side)
Calls the Script Include and processes the response.

- **Type**: `onChange`
- **Table**: `some_other_table`
- **Field name**: `task_reference_field`

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    // Create a new GlideAjax instance pointing to the Script Include
    const ga = new GlideAjax('x_scope_name.MyTaskAjaxUtils');
    
    // Specify the method to call in the Script Include
    ga.addParam('sysparm_name', 'getAssigneeName');
    
    // Pass a parameter to the method
    ga.addParam('sysparm_task_id', newValue);
    
    // Execute the call and set a callback function to handle the response
    ga.getXML(handleResponse);
}

function handleResponse(response) {
    // The 'answer' variable contains the return value from the server method
    const assigneeName = response.responseXML.documentElement.getAttribute('answer');
    g_form.setValue('assignee_name_field', assigneeName);
    g_form.addInfoMessage('Task assignee is: ' + assigneeName);
}
```