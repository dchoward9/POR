File: noderr/specs/UI_ManagerDashboardWidgets.md

# UI_ManagerDashboardWidgets.md

## Purpose
To define the individual data visualizations (widgets) that are displayed on the `UI_ManagerDashboard`. Each widget is a report configured to show metrics and lists relevant to a manager overseeing their team's onboarding requests.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/par_dashboard_widget_*.ts` files associated with the Manager Dashboard canvas.
- **Current interfaces**: These are UI components that render data on a dashboard. They are configured reports that query the `x_1118046_partne_0_requests` and `sysapproval_approver` tables.
- **Dependencies**: `MODEL_Request`, `UI_ManagerDashboard`.
- **Dependents**: `UI_ManagerDashboard`.

## Core Logic & Functionality
This logical component represents a collection of individual report widgets tailored for managers:

1.  **My Department's Open Requests (`d24d53f6...`):**
    -   **Type:** Single Score
    -   **Logic:** Performs a `COUNT` aggregation on the `MODEL_Request` table. The filter is dynamic, showing records where the `requested_for`'s manager is the current user OR the `requested_for`'s department head is the current user.
2.  **Average Onboarding Time for My Department (`d24d53f6...`):**
    -   **Type:** Single Score
    -   **Logic:** Performs an `AVG` aggregation on the `business_duration` field of closed `MODEL_Request` records, using the same dynamic filter as the "Open Requests" widget.
3.  **Requests Awaiting My Approval (`2b1c0808...`):**
    -   **Type:** List
    -   **Logic:** Displays records from the `sysapproval_approver` table where the `approver` is the current user, the `state` is "requested", and the source table is the `MODEL_Request` table.
4.  **My Department's Aging Requests (`2b1c0808...`):**
    -   **Type:** List
    -   **Logic:** Displays `MODEL_Request` records using the same dynamic manager/department head filter, but only shows records that are still `active` and were created more than 14 days ago.

## Current Quality Assessment
- **Completeness**: The set of widgets provides the necessary tools for a manager to perform their duties related to this process.
- **Code Quality**: N/A (Configured reports). The dynamic queries are correctly structured to be context-aware for the logged-in manager.
- **Test Coverage**: The visibility of the parent dashboard can be tested. The accuracy of the reports requires manual testing via impersonation.
- **Documentation**: Each widget has a clear title and description on the dashboard.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// These are configured UI components, not APIs.
// They are rendered as part of the UI_ManagerDashboard.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify the "My Department's Open Requests" widget correctly uses a dynamic filter to show the count of requests for the logged-in manager's team.
- [ ] Verify the "Average Onboarding Time" widget correctly calculates the average duration for the manager's team only.
- [ ] Verify the "Requests Awaiting My Approval" list is accurately filtered to the current user's pending approvals.
- [ ] Verify the "Aging Requests" list correctly filters for requests older than 14 days from the manager's team.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that widgets display "No data available" or an empty list, rather than an error, if their queries return no records.

### Quality Criteria
- [ ] The use of dynamic `(DYNAMIC me)` queries is essential for these widgets to be effective and must be correctly implemented.
- [ ] The columns displayed in the list widgets should be the most relevant for a manager to make a decision or identify an issue.