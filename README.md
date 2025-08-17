<div align="center">
  <h1>ServiceNow Scoped Application: Partner Onboarding</h1>
  <p>
    A full-stack, enterprise-grade application built to automate and manage the complex, multi-departmental partner onboarding process, complete with a comprehensive automated test suite and role-based dashboards.
  </p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Platform-ServiceNow-80B6A1?style=for-the-badge" alt="Platform: ServiceNow"/>
  <img src="https://img.shields.io/badge/Status-Evergreen-05472A?style=for-the-badge" alt="Status: Evergreen"/>
  <img src="https://img.shields.io/badge/License-MIT-750014?style=for-the-badge" alt="License: MIT"/>

</div>

---

## 🎥 Video Walkthrough

A short, 2-minute demonstration of the application's core functionality, from the user-facing Service Catalog form to the back-end automation and reporting dashboards.

**[Video Coming Soon]**

---

## 📋 Table of Contents

1.  [The Business Problem](#-the-business-problem)
2.  [The Solution Vision](#-the-solution-vision)
3.  [Key Technical Features](#-key-technical-features)
4.  [Stakeholder Value](#-stakeholder-value)
5.  [Application Highlights](#-application-highlights)
6.  [Key Architectural Decisions](#-key-architectural-decisions)
7.  [About the Source Code](#-about-the-source-code)

---

## 🎯 The Business Problem

The current process for onboarding new partners, vendors, and suppliers is manual, inconsistent, and lacks central oversight. It relies on a fragmented system of emails and shared spreadsheets, leading to several key challenges:

*   **Operational Inefficiency:** High manual effort for requesters and fulfillment teams (Legal, Security, Finance, Procurement) results in long onboarding cycle times.
*   **Lack of Visibility:** Stakeholders have no clear way to track the status of a request, leading to constant follow-up inquiries.
*   **Compliance & Audit Risk:** Without a formal, auditable trail, it's difficult to prove that all necessary due diligence and approvals were completed.
*   **No Single Source of Truth:** Critical partner information is scattered across multiple systems, increasing the risk of errors and inconsistent data.

---

## 💡 The Solution Vision

This project delivers a dedicated **Partner Onboarding application** on the ServiceNow platform, creating a single source of truth for the entire process.

An employee initiates a request via a simple, intuitive form in the Service Catalog. This submission automatically triggers a master workflow that manages the entire lifecycle: routing for manager approval, creating sequential and conditional tasks for fulfillment teams (Procurement, Legal, Security), and automatically updating the parent request's stage to provide real-time visibility to all stakeholders.

---

## ✨ Key Technical Features

*   **Scoped Application:** A dedicated, encapsulated application to house all logic and data, ensuring maintainability and preventing conflicts with other platform functions.
*   **Custom Tables:** A structured data model extending the base `Task` table to manage `Requests` and their associated fulfillment `Tasks`.
*   **Service Catalog:** A user-friendly **Record Producer** provides a single, standardized entry point for all onboarding requests, with a dynamic front-end powered by **UI Policies** and **Client Scripts**.
*   **Flow Designer:** A powerful orchestration engine automates the entire end-to-end process, from approvals to multi-departmental task creation and status updates.
*   **Role-Based Security:** A granular security model using **Roles** and **Access Control Lists (ACLs)** ensures users only see the data relevant to them.
*   **Platform Analytics:** Three persona-based **dashboards** provide real-time visibility and actionable insights for administrators, managers, and fulfillment teams.
*   **Automated Test Framework (ATF):** A comprehensive test suite validates the end-to-end process to ensure quality and stability through platform upgrades.

---

## 🏆 Stakeholder Value

This solution delivers clear value to all stakeholders:

*   **For the Business:** Reduces risk with a fully auditable trail, increases velocity by accelerating time-to-value for new partners, and provides data-driven insights for continuous process improvement.
*   **For IT:** The scoped application is scalable, maintainable, and CSDM-aligned, making it easy to manage and extend without impacting the global platform.
*   **For Users (Requesters, Managers, Fulfillers):** Provides a simple "one-stop-shop" for requesters, clear and actionable approvals for managers, and a prioritized work queue for fulfillers, eliminating manual follow-up and administrative overhead.

---

## 💻 Application Highlights

<p align="center">
  <img src="https://i.imgur.com/CqBuXNe.jpeg" alt="Flow Designer Canvas" width="700"/>
  <br>
  <em>The main flow orchestrates the entire process, calling a subflow to dynamically generate tasks based on a configuration table.</em>
</p>

<br>

<p align="center">
  <img src="https://i.imgur.com/vTESfRe.png" alt="Service Catalog Form" width="700"/>
  <br>
  <em>The user-friendly Service Catalog form uses UI Policies and Client Scripts to guide the user and validate data in real-time.</em>
</p>

<br>

<p align="center">
  <img src="https://i.imgur.com/n8sqGBX.png" alt="Admin Dashboard" width="700"/>
  <br>
  <em>Custom dashboards provide real-time analytics for different user personas, from high-level admin overviews to fulfiller-specific task lists.</em>
</p>

---

## 🧭 Key Architectural Decisions 

*   **Back-End Automation:** The core logic is powered by a data-driven Flow Designer process that utilizes a reusable subflow and a custom-scripted Action. Server-side logic and data integrity are enforced through multiple Business Rules. This automation drives the flow through various stages, such as Contract Redlining and Security Review, so that all stakeholders are aware of the request’s status.
  
*   **Front-End User Experience:** Employees can easily find the request form, which is a Service Catalog Record Producer, on their Service Portal. The form’s UI Policies, Client Scripts, and GlideAjax enhance the user experience by autopopulating the requester’s manager and preventing submission of incomplete forms.
  
*   **Data Model & Architecture:** There are three custom tables (`Requests`, `Tasks`, `Task Config`), and ServiceNow’s task table has been extended to utilize its built-in logic and features. The `Task Config` table stores the flow’s task definitions, such as each task's stage and assignment group. This particular table demonstrates configuration over code by allowing process owners to simply add, remove, or modify these records to ensure their business process is updated in mere minutes versus 1-2 weeks.
  
*   **Security:**  The application is secured with over 50 granular, role-based Access Control Lists (ACLs), ensuring that users can only see and interact with the data relevant to their function. Because the application's tables extend ServiceNow's base `Task` table, Deny-Unless security rules are enforced to ensure that only users with explicit access are allowed to view and modify Partner Onboarding Requests and Tasks. This prevents `ITIL` users without explicit access from viewing these records as well, a key detail for Subscription Management and governance. Fulfillers can only access tasks relevant to their team, and managers can only access requests submitted by direct reports. 


## 📂 About the Source Code

The complete source code for this application is available in this repository. Although artifacts are present in XML format, this application’s metadata was converted to TypeScript (.ts) using **ServiceNow Fluent**. TypeScript’s format greatly simplifies code reviews and analysis of change history. The application can be installed by cloning this repo using either ServiceNow SDK or ServiceNow IDE.
