File: noderr/specs/UI_ManagerDashboard.md

# UI_ManagerDashboard.md

## Purpose
To provide a strategic dashboard for managers and department heads. This dashboard allows them to monitor the status of onboarding requests submitted by their team members, track aging requests, and handle any pending approvals.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/par_dashboard_d4faaa5d93bee650d5ec31697bba10dc.now.ts` (This file represents the `par_dashboard` record).
- **Current interfaces**: This is a UI component accessed via the ServiceNow navigator under "Partner Onboarding Requests > Dashboards". Its visibility is controlled by the `viewer` role.
- **Dependencies**: `UI_ManagerDashboardWidgets`, `MODEL_Request`, `MODEL_Task`, `ACL_RequestRecords`.
- **Dependents**: Managers and department heads who use this dashboard for oversight and approvals.

## Core Logic & Functionality
This component is a container for widgets tailored to a manager's needs. It arranges and displays reports that provide an overview of team activity. The key widgets it contains are:
-   **My Department's Open Requests:** A single score KPI showing the total count of active requests submitted by the manager's direct reports or department members.
-   **Average Onboarding Time for My Department:** A single score KPI showing the average business duration for all completed requests from their team, helping them understand the typical experience.
-   **Requests Awaiting My Approval:** A list of approval records (`sysapproval_approver`) assigned to the current user, allowing for quick action.
-   **My Department's Aging Requests:** A list of active requests from their team that were created more than 14 days ago, highlighting potential delays.

## Current Quality Assessment
- **Completeness**: The dashboard provides the key information a manager needs for both tactical approvals and strategic oversight.
- **Code Quality**: N/A (This is a configured UI component). The layout is clean and prioritizes actionable information.
- **Test Coverage**: The visibility of the dashboard can be manually tested by impersonating a manager.
- **Documentation**: The dashboard and its widgets have clear, descriptive titles.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// This is a UI component, not an API.
// Access: Navigate to "Partner Onboarding Requests > Dashboards" in the ServiceNow UI.
// Required Role: x_1118046_partne_0.viewer
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that a user with the `viewer` role (e.g., a manager) can view the dashboard.
- [ ] Verify that a user without the `viewer` role (e.g., a standard fulfiller) cannot access this specific dashboard.
- [ ] Verify that the "My Department's Open Requests" widget correctly filters for requests where the `requested_for` is a direct report or department member of the current user.
- [ ] Verify that the "Requests Awaiting My Approval" list only shows active approvals assigned to the current user.
- [ ] Verify that the "Aging Requests" list correctly filters for requests older than 14 days from the user's team.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that widgets display "No data available" or a zero value, rather than an error, if their queries return no records.

### Quality Criteria
- [ ] The dashboard layout should be intuitive for a manager.
- [ ] The reports should use dynamic queries (e.g., `manager DYNAMIC 90d1921e5f510100a9ad2572f2b477fe`) to correctly filter data for the logged-in user.