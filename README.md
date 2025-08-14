<div align="center">
  <img src="https://i.imgur.com/k9gH8fW.png" alt="ServiceNow Logo" width="150"/>
  <h1>ServiceNow Scoped Application: Partner Onboarding</h1>
  <p>
    A full-stack, enterprise-grade application built to automate and manage a complex, multi-departmental partner onboarding process.
  </p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Platform-ServiceNow-blueviolet?style=for-the-badge" alt="Platform: ServiceNow"/>
  <img src="https://img.shields.io/badge/Status-Complete-success?style=for-the-badge" alt="Status: Complete"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License: MIT"/>

</div>

---

## 🎥 Video Walkthrough

A short, 2-minute demonstration of the application's functionality, from the user-facing Service Catalog form to the back-end automation.

**[Watch the Video on YouTube](YOUR_YOUTUBE_LINK_HERE)**

---

## 📋 Table of Contents

1.  [Business Problem & Solution](#business-problem--solution)
2.  [Key Technical Features](#key-technical-features)
3.  [Architectural Highlights](#architectural-highlights)
4.  [Installation & Usage](#installation--usage)
5.  [Source Code](#source-code)

---

## 🎯 Business Problem & Solution

This application solves the business challenge of tracking and managing partner onboarding requests, which require sequential and parallel tasks across multiple departments (Legal, Procurement, Security, Finance).

The solution automates this entire lifecycle, from initial request submission in the Service Catalog to the final task closure, providing full visibility to stakeholders and ensuring a consistent, auditable process.

---

## ✨ Key Technical Features

### Back-End Development
*   **Automation Engine:** The core logic is powered by a data-driven **Flow Designer** process that utilizes a reusable **subflow** and a **custom-scripted Action**. This allows for a flexible, low-code approach to process changes.
*   **Server-Side Scripting:** Data integrity and complex state transitions are managed by server-side JavaScript in **Business Rules**.
*   **Modular Code:** A client-callable **Script Include** is used for real-time, server-side validation from the front-end, demonstrating a best-practice approach to reusable code.

### Front-End Development
*   **User Interface:** The user-facing experience is a **Service Catalog Record Producer**, featuring 10+ variables to capture all necessary information.
*   **Dynamic Experience:** The form is made dynamic and responsive using **UI Policies** and **Client Scripts**, including a `GlideAjax` call for real-time validation of user input.

### Data Model & Security
*   **Architecture:** Built on a foundation of three custom tables (`Requests`, `Tasks`, `Task Config`) with defined relationships and **dictionary overrides**.
*   **Security:** The application is secured with over 50 granular, role-based **Access Control Lists (ACLs)**, ensuring that users can only see and interact with the data relevant to their function.

---

## 🏛️ Architectural Highlights

<p align="center">
  <img src="YOUR_SCREENSHOT_LINK_FOR_FLOW_DESIGNER" alt="Flow Designer Canvas" width="700"/>
  <br>
  <em>The main flow orchestrates the entire process, calling a subflow to dynamically generate tasks based on a configuration table.</em>
</p>

<br>

<p align="center">
  <img src="YOUR_SCREENSHOT_LINK_FOR_SERVICE_CATALOG" alt="Service Catalog Form" width="700"/>
  <br>
  <em>The user-friendly Service Catalog form uses UI Policies and Client Scripts to guide the user and validate data in real-time.</em>
</p>

---

## 🛠️ Installation & Usage

This application is a standard ServiceNow Scoped App. To install, import the provided XML files as an Update Set into a ServiceNow instance.

1.  Navigate to `System Update Sets > Retrieved Update Sets`.
2.  Click the "Import Update Set from XML" UI Action.
3.  Upload the XML file(s) from this repository.
4.  Preview and commit the Update Set.

---

## 📂 Source Code

The complete source code, including all application files (Flows, Business Rules, ACLs, etc.), is available in this repository as XML files, ready for import into a ServiceNow instance.
