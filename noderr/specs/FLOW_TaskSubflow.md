File: noderr/specs/FLOW_TaskSubflow.md

# FLOW_TaskSubflow.md

## Purpose
To act as a reusable, modular workflow responsible for creating a single fulfillment task (`MODEL_Task`). It is called by the main request workflow (`FLOW_MainRequest`) for each task that needs to be generated.

## Current Implementation Status
✅ **IMPLEMENTED** - Component exists and is functional

## Implementation Details
- **Location**: `metadata/update/sys_hub_flow_0c3318eb93e6ae10d5ec31697bba106e.xml`
- **Current interfaces**:
    - **Trigger**: This is a subflow, so it is triggered by a call from another flow, not directly by a record operation.
    - **Inputs**: It accepts several inputs from the parent flow, including `parent_onboarding_request` (GlideRecord), `task_config` (GlideRecord), `stage`, `assignment_group`, and `short_description`.
    - **Actions**: It performs an `Update Record` action on the parent request to set the stage, and a `Create Task` action to create the new fulfillment task.
- **Dependencies**: `MODEL_Request`, `MODEL_Task`, `MODEL_TaskConfig`.
- **Dependents**: `FLOW_MainRequest`.

## Core Logic & Functionality
1.  **Receive Inputs:** The subflow is initiated with context from the main flow, including the parent request and the specific task configuration to use.
2.  **Update Parent Stage:** It first updates the `stage` field on the parent `MODEL_Request` record to reflect the stage of the task about to be created (e.g., "Contract Redlining"). This provides real-time visibility to the requester.
3.  **Create Task:** It then executes the `Create Task` action, creating a new record in the `x_1118046_partne_0_tasks` table.
4.  **Populate Task Fields:** It maps the inputs and data from the parent request to the fields of the new task record. This includes setting the `assignment_group`, `short_description`, and creating a reference back to the parent `partner_onboarding_request`.
5.  **Wait for Completion:** The subflow includes a "Wait for condition" step that pauses its execution until the created task is moved to a closed state (`state` is Closed Complete, Closed Incomplete, or Closed Skipped).
6.  **End:** Once the task is closed, the subflow completes and returns control to the main flow.

## Current Quality Assessment
- **Completeness**: The subflow correctly handles the creation and monitoring of a single task.
- **Code Quality**: The logic is clear and follows Flow Designer best practices for subflows. It effectively encapsulates the task creation logic.
- **Test Coverage**: The execution of this subflow is a key part of the end-to-end ATF suite (`TEST_ATFSuite`).
- **Documentation**: The subflow has a clear description and its inputs are well-defined.

## Technical Debt & Improvement Areas
- None identified.

## Interface Definition
```mermaid
graph TD
    A[Start: Subflow Called] --> B[Inputs Received (Parent Request, Task Config)]
    B --> C[Update Parent Request Stage]
    C --> D[Create Task Record]
    D --> E[Wait for Task Closure]
    E --> F[End Subflow]
```

## ARC Verification Criteria

### Functional Criteria
- [ ] Verify that when called, the subflow correctly updates the parent request's `stage` field.
- [ ] Verify that a new record is successfully created in the `x_1118046_partne_0_tasks` table.
- [ ] Verify that the new task record is correctly populated with the `assignment_group`, `short_description`, and a reference to the parent request.
- [ ] Verify that the subflow correctly pauses and only completes after the created task is moved to a closed state.

### Input Validation Criteria  
- [ ] Verify the subflow handles cases where essential inputs like `parent_onboarding_request` are missing.

### Error Handling Criteria
- [ ] Verify that if the `Create Task` action fails, the subflow enters an error state and logs it, preventing the parent flow from getting stuck.

### Quality Criteria
- [ ] The subflow should remain generic and reusable, driven entirely by its inputs.
- [ ] The logic for creating a single task should remain encapsulated within this subflow.