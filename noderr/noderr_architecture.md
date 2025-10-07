File: noderr/noderr_architecture.md
# Noderr - Architectural Flowchart

**Purpose:** This document contains the Mermaid flowchart defining the architecture, components (NodeIDs), and their primary interactions for this project. This visual map is the source of truth for all implementable components tracked in `noderr_tracker.md`.

---

```mermaid
graph TD
    %% =================================================================
    %%  Legend - Defines the shapes and conventions used in this diagram
    %% =================================================================
    subgraph Legend
        direction LR
        L_IDConv(NodeID Convention: TYPE_Name)
        L_Proc([Process/Backend Logic])
        L_UI[/UI Component/]
        L_Decision{Decision Point}
        L_DB[(Database/Data Store)]
        L_ExtAPI{{External API}}
    end

    %% =================================================================
    %%  User Interface & Dashboards
    %% =================================================================
    subgraph "User Interfaces"
        User((User)) --> UI_RequestForm[/Service Catalog Request Form/]
        User --> UI_AdminDashboard[/Admin Dashboard/]
        User --> UI_ManagerDashboard[/Manager Dashboard/]
        User --> UI_FulfillerDashboard[/Fulfiller Dashboard/]
        
        UI_RequestForm -- Populates --> UI_RequestFormVariables[/Form Variables/]
        UI_AdminDashboard --> UI_AdminDashboardWidgets([Dashboard Widgets])
        UI_ManagerDashboard --> UI_ManagerDashboardWidgets([Dashboard Widgets])
    end

    %% =================================================================
    %%  Core Logic & Automation
    %% =================================================================
    subgraph "Backend Processing"
        UI_RequestForm -- Submits --> MODEL_Request[(Request Record)]
        MODEL_Request -- Triggers --> FLOW_MainRequest[Main Request Workflow]
        
        FLOW_MainRequest --> ManagerApproval{Manager Approval?}
        ManagerApproval -- Approved --> TaskCreationLoop
        ManagerApproval -- Rejected --> SCRIPT_RequestStageManager[Update Request Stage & State]

        subgraph TaskCreationLoop
            direction TB
            FLOW_MainRequest -- Iterates --> MODEL_TaskConfig[(Task Config Records)]
            MODEL_TaskConfig --> ACTION_TaskConditionCheck[Action: Check Task Conditions]
            ACTION_TaskConditionCheck -- True --> FLOW_TaskSubflow[Subflow: Create Task]
            ACTION_TaskConditionCheck -- False --> FLOW_MainRequest
        end

        FLOW_TaskSubflow -- Creates --> MODEL_Task[(Fulfillment Task Record)]
        MODEL_Task -- Updates --> SCRIPT_RequestStageManager
    end

    %% =================================================================
    %%  Supporting Scripts & Infrastructure
    %% =================================================================
    subgraph "Business Rules & Utilities"
        MODEL_Request -- On Update --> SCRIPT_UpdateTaskWorkNotes
        MODEL_Request -- On Update --> SCRIPT_CascadeCommentsToTasks
        MODEL_Request -- On Update --> SCRIPT_UpdateReqShortDescription
        MODEL_Task -- On Update --> SCRIPT_CascadeCommentsToRequest
        
        UI_RequestForm -- Uses --> SCRIPT_PopulateManager
        UI_RequestForm -- Uses --> SCRIPT_CheckExemption
        SCRIPT_CheckExemption -- Calls --> SCRIPT_checkGroupMembership
        
        MODEL_Task -- Uses --> SCRIPT_UniversityAPIUtil
        SCRIPT_UniversityAPIUtil --> ExternalUniAPI{{University Verification API}}
    end

    subgraph "Data & Security"
        CONFIG_AppDefinition[App Definition]
        CONFIG_RequestNumber[Request Numbering]
        CONFIG_TaskNumber[Task Numbering]
        CONFIG_ExemptionGroupProperty[Exemption Group Property]
        ACL_RequestRecords[Request ACLs] --> MODEL_Request
        ACL_TaskRecords[Task ACLs] --> MODEL_Task
        ACL_TaskConfigRecords[Task Config ACLs] --> MODEL_TaskConfig
    end
    
    subgraph "Testing & Notifications"
        TEST_ATFSuite[ATF Test Suite]
        EMAIL_RequestNotifications[Request Email Notifications]
        EMAIL_TaskNotifications[Task Email Notifications]
    end

This diagram represents the complete architecture of the Partner Onboarding application. All components required for MVP are implemented.
