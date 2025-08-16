<div align="center">
  <h1>ServiceNow Scoped Application: Partner Onboarding</h1>
  <p>
    A full-stack, enterprise-grade application built to automate and manage the complex, multi-departmental partner onboarding process, complete with a comprehensive automated test suite and role-based dashboards.
  </p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Platform-ServiceNow-blueviolet?style=for-the-badge" alt="Platform: ServiceNow"/>
  <img src="https://img.shields.io/badge/Status-In%20Progress-yellow?style=for-the-badge" alt="Status: In Progress"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License: MIT"/>

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
5.  [Architectural Highlights](#️-architectural-highlights)
6.  [About the Source Code](#-about-the-source-code)

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

## 🏛️ Architectural Highlights

<p align="center">
  <img src="https://i.imgur.com/CqBuXNe.jpeg" alt="Flow Designer Canvas" width="700"/>
  <br>
  <em>The main flow orchestrates the entire process, calling a subflow to dynamically generate tasks based on a configuration table.</em>
</p>

<br>

<p align="center">
  <img src="https://i.imgur.com/WM19DY3.png" alt="Service Catalog Form" width="700"/>
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

## 📂 About the Source Code

The complete source code for this application is available in this repository, structured for use with a modern, source-control-based ServiceNow development workflow.

*   **Application Metadata (`/metadata/update`):** Contains the application's configuration records (such as ACLs, UI Policies, and Flow Designer components) stored as individual XML files.
*   **Scripts (`/src/fluent/generated`):** Contains server-side scripts (Business Rules, Script Includes) represented as TypeScript (`.now.ts`) files, a format used by modern ServiceNow development tools for enhanced readability and type safety.

This repository is intended for **code review and as a demonstration of technical capabilities.**
