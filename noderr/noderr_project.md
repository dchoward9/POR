File: noderr/noderr_project.md
# Project Overview: Partner Onboarding Request Application

**Noderr Version:** 1.9
**Document Version:** 1.1
**Creation Date:** 2023-10-27T10:00:00Z
**Last Updated:** 2023-10-27T10:15:00Z
**Author/Generator:** AI-Agent (Install & Reconcile)

---

### 1. Project Goal & Core Problem

*   **Goal:** To create a dedicated, automated application on the ServiceNow platform to manage the entire lifecycle of onboarding new partners, vendors, and suppliers.
*   **Core Problem Solved:** The application replaces a manual, inconsistent process based on emails and spreadsheets, solving issues of inefficiency, lack of visibility, and compliance risk by creating a single, auditable source of truth.

---

### 2. Scope & Key Features (MVP Focus)

*   **Minimum Viable Product (MVP) Description:** A user can submit a partner onboarding request through the Service Catalog, which triggers an automated workflow for approvals and fulfillment tasks across multiple departments, with role-based dashboards for visibility.
*   **Key Features (Implemented):**
    *   `Service Catalog Request`: A user-friendly Record Producer for submitting new partner requests.
    *   `Automated Workflow`: A master Flow Designer process that manages approvals and task creation.
    *   `Dynamic Task Generation`: The workflow dynamically creates tasks for Procurement, Legal, Security, Finance, and University Verification based on a configuration table and request data.
    *   `Role-Based Security`: Granular ACLs restrict access for requesters, managers, fulfillers, and admins.
    *   `Real-Time Dashboards`: Three distinct dashboards provide analytics for Admins, Managers, and Fulfillers.
    *   `Automated Testing`: A comprehensive ATF test suite validates the end-to-end process.

---

### 4. Technology Stack

| Category             | Technology                               | Specific Version (or latest stable)      | Notes for AI Agent / Rationale                                         |
|:---------------------|:-----------------------------------------|:-----------------------------------------|:----------------------------------------------------------------------------|
| Platform             | ServiceNow                               | Yokohama                                 | Core enterprise platform for the application.                |
| Language(s)          | JavaScript (Rhino Engine), Client Script | ES5 (Server-side), ES6+ (Client-side)    | Standard for ServiceNow development.                |
| Backend Framework    | Flow Designer, Business Rules            | N/A                                      | ServiceNow's native automation and logic engines.                           |
| Frontend Framework   | Service Portal, UI Builder (Now Experience) | N/A                                      | ServiceNow's native UI frameworks.                                    |
| Database             | MariaDB (Managed by ServiceNow)          | N/A                                      | The underlying database for the ServiceNow platform.         |
| ORM/ODM (If any)     | GlideRecord API                          | N/A                                      | The primary server-side API for database interaction.               |
| Testing (E2E/Integ.) | Automated Test Framework (ATF)           | N/A                                      | ServiceNow's native framework for end-to-end testing.               |
| Version Control      | Git                                      | N/A                                      | Integrated with ServiceNow Studio for source control. |
| Deployment Target    | ServiceNow Instance                      | N/A                                      | Deployed as a Scoped Application within ServiceNow.                                              |

---

### 5. High-Level Architecture

*   **Architectural Style:** Scoped Application within a multi-tenant ServiceNow instance.
*   **Key Components & Interactions:** A Service Catalog Record Producer creates a `Request` record. This triggers a `Flow Designer` workflow, which manages approvals and creates multiple `Task` records based on a `Task Config` table. `Business Rules` and `Client Scripts` enforce data integrity and UI behavior. `ACLs` secure all data. `Dashboards` provide reporting.
*   **Environment Focus**: Development environment documented in `environment_context.md`.