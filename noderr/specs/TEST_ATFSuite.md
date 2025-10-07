File: noderr/specs/TEST_ATFSuite.md

# TEST_ATFSuite.md

## Purpose
To provide a comprehensive, automated suite of tests that validate the end-to-end functionality of the Partner Onboarding application. This suite ensures application stability, catches regressions, and verifies that core processes work as expected after any changes or platform upgrades.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: The test definitions are stored in `data/tests.json`, which represents the exported records from the Automated Test Framework (ATF) in ServiceNow.
- **Current interfaces**: The test suite is executed within the ServiceNow platform by navigating to the "Automated Test Framework (ATF)" > "Suites" module and running the "Partner Onboarding" suite.
- **Dependencies**: The entire application stack. The tests impersonate users, create records, and validate outcomes across multiple tables and UI components.
- **Dependents**: The development team, who relies on these tests to ensure quality and confidence before deploying changes.

## Core Logic & Functionality
The ATF suite is composed of multiple ordered tests that simulate real user actions. Key test cases include:
-   **POR Admin Access Test:**
    1.  Creates a new admin user.
    2.  Impersonates the admin.
    3.  Verifies the admin can see the correct Application Menus and Modules.
    4.  Verifies the admin can create, update, and delete Request and Task records.
    5.  Verifies the admin can access the application dashboards.
-   **POR Approval Exemption Test:**
    1.  Creates a manager user, an exempt user, and a fulfiller user.
    2.  Impersonates the exempt user.
    3.  Submits a new request via the Service Portal.
    4.  Validates that the request record is created correctly and that its `stage` is immediately "Waiting for Approval" (or a subsequent stage), bypassing the need for manager approval.
    5.  Validates that no fulfillment tasks have been created yet, as the approval step (even if bypassed) is the gate for task creation.

## Current Quality Assessment
- **Completeness**: The suite covers the most critical "happy path" scenarios for both admin and special user personas.
- **Code Quality**: N/A (ATF tests are configured records, not scripts in this context). The test steps are logical and well-ordered.
- **Test Coverage**: Provides good coverage for the core submission and approval logic.
- **Documentation**: Each test and test step has a clear, descriptive name and notes explaining its purpose.

## Technical Debt & Improvement Areas
-   **Fulfiller Path:** The suite could be expanded to include a full end-to-end test for the fulfiller persona, including impersonating a fulfiller, closing a task, and verifying that the parent request's stage updates accordingly.
-   **Negative Testing:** More "unhappy path" tests could be added, such as testing what happens when a manager rejects a request.

## Interface Definition
```servicenow
// This is not an API, but a configured test suite.
// Execution Steps:
// 1. Navigate to "Automated Test Framework (ATF)" > "Suites".
// 2. Find and open the "Partner Onboarding" test suite.
// 3. Click the "Run Test Suite" UI Action.
// 4. Monitor results in the "Test Results" module.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that the entire test suite runs to completion without errors.
- [ ] Verify that all test steps within the suite pass successfully.
- [ ] Verify that the tests correctly create and then clean up any records they generate.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that if a test step fails, it provides a clear error message and a screenshot of the failure.

### Quality Criteria
- [ ] The test suite should be reliable and produce consistent results.
- [ ] The tests should be independent and not rely on pre-existing data that isn't created by the test itself.
- [ ] Test steps should be clearly named and documented.