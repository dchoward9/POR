File: noderr/specs/UI_AdminDashboard.md

# UI_AdminDashboard.md

## Purpose
To provide a high-level, administrative overview of the entire Partner Onboarding process. This dashboard aggregates key metrics and reports, allowing administrators to monitor system health, identify bottlenecks, and track overall performance.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/par_dashboard_9e1a503d933e6a50d5ec31697bba10c2.now.ts` (This file represents the `par_dashboard` record).
- **Current interfaces**: This is a UI component accessed via the ServiceNow navigator under "Partner Onboarding Requests > Dashboards". Its visibility is controlled by roles.
- **Dependencies**: `UI_AdminDashboardWidgets`, `MODEL_Request`, `ACL_RequestRecords` (to allow the widgets to read the data).
- **Dependents**: Administrators who use this dashboard for process oversight.

## Core Logic & Functionality
This component is a container for various data visualizations (widgets). It does not contain business logic itself but arranges and displays reports that do. The key widgets it contains are:
-   **Total Open Requests:** A single score KPI showing the count of all active requests.
-   **Requests by Stage:** A pie chart showing the distribution of active requests across all workflow stages.
-   **Average Time per Stage:** A bar chart displaying the average duration requests spend in each stage, helping to identify bottlenecks.
-   **Request Outcomes (Last 90 Days):** A bar chart comparing the number of completed vs. canceled requests over the last quarter.

## Current Quality Assessment
- **Completeness**: The dashboard provides a comprehensive overview of the key metrics for the onboarding process.
- **Code Quality**: N/A (This is a configured UI component). The layout is clean and logical.
- **Test Coverage**: The visibility of the dashboard is checked in the `TEST_ATFSuite`.
- **Documentation**: The dashboard has a clear title and description.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// This is a UI component, not an API.
// Access: Navigate to "Partner Onboarding Requests > Dashboards" in the ServiceNow UI.
// Required Role: x_1118046_partne_0.admin
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that a user with the `admin` role can view the dashboard.
- [ ] Verify that a user without the `admin` role cannot access the dashboard.
- [ ] Verify that all widgets on the dashboard load and display data correctly.
- [ ] Verify that clicking on a report widget allows the user to drill down into the underlying list of records.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that if a widget fails to load data, it displays a "No data available" message rather than a system error.

### Quality Criteria
- [ ] The dashboard layout should be intuitive and easy to understand.
- [ ] The reports and widgets should have clear, descriptive titles.
- [ ] The data presented should be accurate and relevant to an administrative user.