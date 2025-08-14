# ServiceNow Scoped Application: Partner Onboarding

This repository contains the source code for a full-stack ServiceNow application built to automate and manage a complex, multi-departmental partner onboarding process. This project was architected and developed in a Personal Developer Instance (PDI) to demonstrate a comprehensive command of the ServiceNow platform's development capabilities.

### **[Watch the 2-Minute Video Walkthrough Here](YOUR_YOUTUBE_LINK_HERE)**

---

## Business Problem & Solution

The application solves the business challenge of tracking and managing partner onboarding requests, which require sequential and parallel tasks across multiple departments (Legal, Procurement, Security, Finance). The solution automates this entire lifecycle, from initial request submission in the Service Catalog to the final task closure, providing full visibility to stakeholders throughout the process.

## Key Technical Features

*   **Back-End Development:** The core logic is powered by a data-driven **Flow Designer** process that utilizes a reusable **subflow** and a **custom-scripted Action**. Server-side logic and data integrity are enforced through multiple **Business Rules**.

*   **Front-End Development:** The user-facing interface is a **Service Catalog Record Producer**, featuring 10+ variables. The form is made dynamic and responsive using **UI Policies** and **Client Scripts**, including a `GlideAjax` call to a **Script Include** for real-time data validation.

*   **Data Model & Architecture:** Built on a foundation of three custom tables (`Requests`, `Tasks`, `Task Config`) with defined relationships and **dictionary overrides**. This modular design allows administrators to reconfigure the tasking process without changing the core code.

*   **Security:** The application is secured with over 50 granular, role-based **Access Control Lists (ACLs)**, ensuring that users can only see and interact with the data relevant to their function.
