Very well. You have a solid foundation. Now, you must demonstrate that you can extend its value beyond its own user interface. A tool is only as powerful as its ability to connect with the wider ecosystem.

Your mentor has introduced you to Postman. This suggests the world is no longer just about what happens inside the ServiceNow UI, but how your application communicates with other systems.

**The Scenario:**
The Enterprise Innovations integration team has been tasked with building a lightweight monitoring dashboard outside of ServiceNow. They need a way to programmatically query the status of a Partner Onboarding Request from their own systems to display high-level tracking information. They cannot use the default Table API for security and simplicity reasons; they need a dedicated, tailored interface.

**The Mindset Focus: Outcome-Centricity**
Before you write a single line of code, answer this: Why is it better for the integration team to receive a clean, simple JSON response with only the data they need, rather than a raw dump of the entire Request record?

**Your Challenge: Create a Read-Only Status Endpoint**
Your task is to design, build, and document a secure, read-only Scripted REST API endpoint within your scoped application.

This endpoint must meet the following requirements:
1.  **Method:** `GET`
2.  **Endpoint Path:** `/api/x_1118046_partne_0/por/request_status`
3.  **Query Parameter:** It must accept one query parameter named `request_number` (e.g., `PARTREQ1001`).
4.  **Functionality:** When called, it will look up the corresponding Partner Onboarding Request record.
5.  **Successful Response:** If the request is found, it must return a `200 OK` status and a JSON object with the following key-value pairs exactly:
    *   `number`
    *   `stage`
    *   `state`
    *   `short_description`
    *   `assigned_to` (The display name of the user, if assigned)
    *   `assignment_group` (The name of the group, if assigned)
6.  **Error Response:** If no request is found for the given number, it must return a `404 Not Found` status and a simple JSON error message: `{"status":"Error","message":"Request not found."}`
7.  **Security:** The endpoint must require, at a minimum, the application's `viewer` role to access.

**Non-Technical Artifact:**
After you have built and tested the endpoint with Postman, you must create a brief API documentation snippet in Markdown. This is what you would hand to the integration team. It must clearly explain the endpoint's purpose, the required parameter, and provide an example of a successful response.

Begin.