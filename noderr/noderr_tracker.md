File: noderr/noderr_tracker.md
# Noderr - Status Map

**Purpose:** This document tracks the development status of all implementable components (NodeIDs) defined in `noderr_architecture.md`. It guides task selection, groups related work via `WorkGroupID`, and provides a quick overview of project progress. It is updated by the AI Agent as per `noderr_loop.md`.

---
**Progress: 100%** (40/40 components implemented)
---

| Status | WorkGroupID | Node ID | Label | Dependencies | Logical Grouping | Spec Link | Classification | Notes / Issues |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| 🟢 `[VERIFIED]` | | `UI_RequestForm` | Service Catalog Request Form | `UI_RequestFormVariables` | UI | [Spec](specs/UI_RequestForm.md) | Standard | |
| 🟢 `[VERIFIED]` | | `UI_RequestFormVariables` | Variables for Request Form | | UI | [Spec](specs/UI_RequestFormVariables.md) | Standard | |
| 🟢 `[VERIFIED]` | | `UI_RequestView` | Standard Request Form View | | UI | [Spec](specs/UI_RequestView.md) | Standard | |
| 🟢 `[VERIFIED]` | | `UI_RequestApprovalView` | Approval View for Requests | | UI | [Spec](specs/UI_RequestApprovalView.md) | Standard | |
| 🟢 `[VERIFIED]` | | `UI_TaskView` | Standard Task Form View | | UI | [Spec](specs/UI_TaskView.md) | Standard | |
| 🟢 `[VERIFIED]` | | `UI_RelatedLists` | Related Lists on Forms | `MODEL_Request`, `MODEL_Task` | UI | [Spec](specs/UI_RelatedLists.md) | Standard | |
| 🟢 `[VERIFIED]` | | `UI_AdminDashboard` | Administrator Dashboard | `UI_AdminDashboardWidgets` | UI | [Spec](specs/UI_AdminDashboard.md) | Complex | |
| 🟢 `[VERIFIED]` | | `UI_ManagerDashboard` | Manager Dashboard | `UI_ManagerDashboardWidgets` | UI | [Spec](specs/UI_ManagerDashboard.md) | Complex | |
| 🟢 `[VERIFIED]` | | `UI_FulfillerDashboard` | Fulfiller Dashboard | | UI | [Spec](specs/UI_FulfillerDashboard.md) | Complex | |
| 🟢 `[VERIFIED]` | | `UI_AdminDashboardWidgets` | Widgets for Admin Dashboard | | UI | [Spec](specs/UI_AdminDashboardWidgets.md) | Complex | |
| 🟢 `[VERIFIED]` | | `UI_ManagerDashboardWidgets` | Widgets for Manager Dashboard | | UI | [Spec](specs/UI_ManagerDashboardWidgets.md) | Complex | |
| 🟢 `[VERIFIED]` | | `FLOW_MainRequest` | Main Request Workflow | `MODEL_Request`, `ACTION_TaskConditionCheck` | Workflow | [Spec](specs/FLOW_MainRequest.md) | Critical | |
| 🟢 `[VERIFIED]` | | `FLOW_TaskSubflow` | Subflow for Task Creation | `MODEL_Task` | Workflow | [Spec](specs/FLOW_TaskSubflow.md) | Complex | |
| 🟢 `[VERIFIED]` | | `ACTION_TaskConditionCheck` | Custom Action for Task Conditions | `MODEL_TaskConfig` | Workflow | [Spec](specs/ACTION_TaskConditionCheck.md) | Complex | Logic is generic and complete. |
| 🟢 `[VERIFIED]` | | `MODEL_Request` | Request Data Model | | Data | [Spec](specs/MODEL_Request.md) | Critical | |
| 🟢 `[VERIFIED]` | | `MODEL_Task` | Task Data Model | `MODEL_Request` | Data | [Spec](specs/MODEL_Task.md) | Critical | |
| 🟢 `[VERIFIED]` | | `MODEL_TaskConfig` | Task Configuration Data Model | | Data | [Spec](specs/MODEL_TaskConfig.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_RequestStageManager` | Business Rule: Update Stage/State | `MODEL_Request` | Script | [Spec](specs/SCRIPT_RequestStageManager.md) | Complex | |
| 🟢 `[VERIFIED]` | | `SCRIPT_CascadeRequestInfoToTasks` | Business Rule: Cascade Request Info | `MODEL_Request`, `MODEL_Task` | Script | [Spec](specs/SCRIPT_CascadeRequestInfoToTasks.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_UpdateTaskWorkNotes` | Business Rule: Update Task Worknotes | `MODEL_Request`, `MODEL_Task` | Script | [Spec](specs/SCRIPT_UpdateTaskWorkNotes.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_CascadeCommentsToTasks` | Business Rule: Cascade Comments to Tasks | `MODEL_Request`, `MODEL_Task` | Script | [Spec](specs/SCRIPT_CascadeCommentsToTasks.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_CascadeCommentsToRequest` | Business Rule: Cascade Comments to Request | `MODEL_Request`, `MODEL_Task` | Script | [Spec](specs/SCRIPT_CascadeCommentsToRequest.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_UpdateReqShortDescription` | Business Rule: Set Request Short Desc | `MODEL_Request` | Script | [Spec](specs/SCRIPT_UpdateReqShortDescription.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_CalculateRequestDuration` | Business Rule: Calculate Duration | `MODEL_Request` | Script | [Spec](specs/SCRIPT_CalculateRequestDuration.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_ManualClosureStageUpdate` | Business Rule: Handle Manual Closure | `MODEL_Request` | Script | [Spec](specs/SCRIPT_ManualClosureStageUpdate.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_GetFlowData` | Business Rule: Get Flow Context | `FLOW_MainRequest` | Script | [Spec](specs/SCRIPT_GetFlowData.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_PopulateManager` | Client Script: Populate Manager | `UI_RequestFormVariables` | Script | [Spec](specs/SCRIPT_PopulateManager.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_CheckExemption` | Client Script: Check Approval Exemption | `UI_RequestFormVariables` | Script | [Spec](specs/SCRIPT_CheckExemption.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_checkGroupMembership` | Script Include: Group Membership Util | | Script | [Spec](specs/SCRIPT_checkGroupMembership.md) | Standard | |
| 🟢 `[VERIFIED]` | | `SCRIPT_UniversityAPIUtil` | Script Include: University API Util | | Script | [Spec](specs/SCRIPT_UniversityAPIUtil.md) | Standard | |
| 🟢 `[VERIFIED]` | | `CONFIG_AppDefinition` | Application Definition | | Config | [Spec](specs/CONFIG_AppDefinition.md) | Standard | |
| 🟢 `[VERIFIED]` | | `CONFIG_RequestNumber` | Request Numbering Config | | Config | [Spec](specs/CONFIG_RequestNumber.md) | Standard | |
| 🟢 `[VERIFIED]` | | `CONFIG_TaskNumber` | Task Numbering Config | | Config | [Spec](specs/CONFIG_TaskNumber.md) | Standard | |
| 🟢 `[VERIFIED]` | | `CONFIG_ExemptionGroupProperty` | Exemption Group System Property | | Config | [Spec](specs/CONFIG_ExemptionGroupProperty.md) | Standard | |
| 🟢 `[VERIFIED]` | | `ACL_RequestRecords` | Request Table ACLs | `MODEL_Request` | Security | [Spec](specs/ACL_RequestRecords.md) | Critical | |
| 🟢 `[VERIFIED]` | | `ACL_TaskRecords` | Task Table ACLs | `MODEL_Task` | Security | [Spec](specs/ACL_TaskRecords.md) | Critical | |
| 🟢 `[VERIFIED]` | | `ACL_TaskConfigRecords` | Task Config Table ACLs | `MODEL_TaskConfig` | Security | [Spec](specs/ACL_TaskConfigRecords.md) | Critical | |
| 🟢 `[VERIFIED]` | | `EMAIL_RequestNotifications` | Request Lifecycle Emails | `MODEL_Request` | Notification | [Spec](specs/EMAIL_RequestNotifications.md) | Standard | |
| 🟢 `[VERIFIED]` | | `EMAIL_TaskNotifications` | Task Lifecycle Emails | `MODEL_Task` | Notification | [Spec](specs/EMAIL_TaskNotifications.md) | Standard | |
| 🟢 `[VERIFIED]` | | `TEST_ATFSuite` | Automated Test Framework Suite | | Testing | [Spec](specs/TEST_ATFSuite.md) | Standard | |

---
### Legend for Status:

*   ⚪️ **`[TODO]`**: Task is defined and ready to be picked up if dependencies are met. This status also applies to `REFACTOR_` tasks created from technical debt.
*   📝 **`[NEEDS_SPEC]`**: Node has been identified in the architecture but requires a detailed specification to be drafted.
*   🟡 **`[WIP]`**: Work In Progress. The AI Agent is currently working on this node as part of the specified `WorkGroupID`.
*   🟢 **`[VERIFIED]`**: The primary completion state. The node has been implemented, all ARC Verification Criteria are met, the spec is finalized to "as-built", and all outcomes are logged.
*   ❗ **`[ISSUE]`**: A significant issue or blocker has been identified, preventing progress. Details should be in `noderr_log.md` or linked in the "Notes / Issues" column.

---
### Notes on Columns:

*   **Status**: The current state of the NodeID (see Legend above).
*   **WorkGroupID**: A unique ID assigned to a "Change Set" of nodes being worked on together. This is blank unless the `Status` is `[WIP]`.
*   **Node ID**: The unique identifier for the component, matching the ID used in `noderr/noderr_architecture.md`.
*   **Label**: A concise, human-readable name for the NodeID.
*   **Dependencies**: A comma-separated list of `NodeID`s that must be `[VERIFIED]` before work on this node can begin. Only reference NodeIDs that exist in the architecture diagram. If a dependency's spec doesn't exist, that dependency must be `[NEEDS_SPEC]` status.
*   **Logical Grouping**: An optional tag to categorize nodes by feature, module, or layer (e.g., "Authentication", "UserAPI").
*   **Spec Link**: A relative Markdown link to the corresponding specification file in the `noderr/specs/` directory.
*   **Classification**: Optional tag (e.g., `Critical`, `Complex`, `Standard`) to influence planning and review intensity.
*   **Notes / Issues**: Brief comments, or a reference to a more detailed issue in `noderr/noderr_log.md`.

---
*(This table will be populated based on `noderr_architecture.md`. The AI Agent will then update the `Status` and `WorkGroupID` columns as it processes each Change Set according to `noderr_loop.md`.)*