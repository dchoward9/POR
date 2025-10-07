File: noderr/specs/UI_AdminDashboardWidgets.md

# UI_AdminDashboardWidgets.md

## Purpose
To define the individual data visualizations (widgets) that are displayed on the `UI_AdminDashboard`. Each widget is a report configured to show a specific metric about the Partner Onboarding process.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `src/fluent/generated/par_dashboard_widget_*.ts` files associated with the Admin Dashboard canvas.
- **Current interfaces**: These are UI components that render data on a dashboard. They are configured reports that query the `x_1118046_partne_0_requests` and `metric_instance` tables.
- **Dependencies**: `MODEL_Request`, `UI_AdminDashboard`.
- **Dependents**: `UI_AdminDashboard`.

## Core Logic & Functionality
This logical component represents a collection of individual report widgets:

1.  **Total Open Requests (`d24d53f6...`):**
    -   **Type:** Single Score
    -   **Logic:** Performs a `COUNT` aggregation on the `MODEL_Request` table where `active=true`.
2.  **Requests by Stage (`96abe7e3...`):**
    -   **Type:** Pie Chart
    -   **Logic:** Performs a `COUNT` aggregation on the `MODEL_Request` table, grouped by the `stage` field.
3.  **Average Time per Stage (`23051643...`):**
    -   **Type:** Bar Chart
    -   **Logic:** Performs an `AVG` aggregation on the `duration` field of the `metric_instance` table, filtered for the "POR Stage Duration" metric definition and grouped by the `value` (stage name).
4.  **Request Outcomes (Last 90 Days) (`23051643...`):**
    -   **Type:** Bar Chart
    -   **Logic:** Performs a `COUNT` aggregation on the `MODEL_Request` table, filtered for records created in the last 90 days with a closed state, and grouped by `state`.

## Current Quality Assessment
- **Completeness**: The set of widgets provides a good administrative overview.
- **Code Quality**: N/A (Configured reports). The queries are efficient and correctly defined.
- **Test Coverage**: The visibility of the parent dashboard is tested in the ATF suite. The accuracy of the reports is verified by manual inspection.
- **Documentation**: Each widget has a clear title and description on the dashboard.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```
// These are configured UI components, not APIs.
// They are rendered as part of the UI_AdminDashboard.
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify the "Total Open Requests" widget displays the correct count of all active requests.
- [ ] Verify the "Requests by Stage" pie chart accurately reflects the distribution of active requests.
- [ ] Verify the "Average Time per Stage" bar chart correctly calculates and displays the average duration for each stage.
- [ ] Verify the "Request Outcomes" chart correctly filters for the last 90 days and groups by final state.

### Input Validation Criteria  
- [ ] N/A

### Error Handling Criteria
- [ ] Verify that widgets display "No data available" or a zero value, rather than an error, if their queries return no records.

### Quality Criteria
- [ ] Each widget's title and description should be clear and unambiguous.
- [ ] The choice of visualization (pie, bar, single score) should be appropriate for the data being displayed.