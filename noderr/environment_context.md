File: noderr/environment_context.md

# Universal Environment Context Profile: ServiceNow

<!-- 
🚨 CRITICAL ENVIRONMENT AWARENESS CHECK 🚨

1. Are you in a development environment? Yes, a ServiceNow Development Instance.
2. What do you see in your current shell prompt? A standard shell prompt for file system operations.
3. Is there a separate deployed/production version of this app? Yes, typically there is a PROD instance.

YOUR MISSION: Document the DEVELOPMENT environment you're currently in.
You are NOT documenting the production/deployed environment.
-->

## START HERE - FILL OUT EVERYTHING BELOW THIS LINE

```yaml
# Environment Metadata
environment:
  type: "development"
  provider: "servicenow"
  lifecycle: "persistent"
  purpose: "Primary development and testing for the Partner Onboarding Request (POR) application."
  
  # CRITICAL: Document which environment this profile represents
  environment_focus: "DEVELOPMENT - This profile documents the development ServiceNow instance."
  
  # Platform-Specific Detection Results
  platform_detection:
    identified_platform: "ServiceNow"
    special_environment_vars: "N/A - Platform is identified by file structure (.xml, .ts files from ServiceNow Fluent)."
    available_tools: "git, ServiceNow CLI (snc), Automated Test Framework (ATF), Flow Designer, App Engine Studio"
    missing_standard_tools: "npm, yarn, pip (N/A for this platform). Package management is handled by ServiceNow Update Sets or App Repo."
    
  orchestration_hints:
    auto_seed_on_reset: true
    strict_linting: false
    backup_before_migrations: true
    uses_workflow_system: true
    uses_container_orchestration: false
    uses_serverless_deployment: false
```

**Profile Name:** ServiceNow-POR-Yokohama  
**Environment ID:** ENV-2024-08-15-servicenow-dev-001  
**Last Updated:** 2023-10-27T10:00:00Z  
**Validated By:** AI-Agent v1.9  
**Confidence Level:** High

---

## Purpose
This document serves as the complete operational manual for AI agents working in this specific **DEVELOPMENT** ServiceNow environment. It translates abstract goals into concrete, tested workflows.

**Critical Rule:** ALWAYS use these exact workflows. Do not rely on general knowledge about similar environments.

**Environment Focus:** This document describes the DEVELOPMENT environment, not production.

---

## 1. Critical Platform Rules & Gotchas

### 1.1 Critical Don'ts - DO NOT VIOLATE THESE RULES
```yaml
critical_donts:
  process_management:
    - "NEVER manually restart nodes - ServiceNow manages application nodes."
  package_management:
    - "NEVER manually edit XML files. Use the ServiceNow UI or appropriate tooling."
    - "NEVER install dependencies directly. All code is part of the Scoped Application."
  network_configuration:
    - "NEVER hardcode instance URLs. Use relative paths or GlideSystem properties."
    - "NEVER use production URLs for development testing."
  file_system:
    - "NEVER modify files in another application's scope without proper cross-scope privileges."
  environment_confusion:
    - "NEVER test features on the production deployed URL."
    - "NEVER confuse the development instance with the live production instance."
    - "NEVER make changes in production that have not been tested in dev and committed to source control."
  platform_specific:
    - "NEVER make changes in the 'global' scope unless absolutely necessary and approved."
    - "NEVER capture the 'Default' update set. Always create and use a named update set for changes."
```

### 1.2 Lessons Learned - Debugging Gotchas
```yaml
debugging_gotchas:
  console_behavior:
    - "Server-side logs (`gs.info`, `gs.error`) appear in 'System Logs > System Log'."
    - "Client-side logs (`jslog`) appear in the browser's developer console."
  development_workflow:
    - "Changes made in the UI are immediately active on the DEV instance."
    - "To move changes to another instance, they must be captured in an Update Set or committed to the linked Git repository."
  network_behavior:
    - "Outbound REST/SOAP calls may be blocked by ACLs or require a MID Server."
    - "Development preview URL is the direct instance URL. Production URL is a separate instance."
  environment_separation:
    - "Development changes are isolated to the dev instance."
    - "Production deployment requires an explicit action (committing to Git and deploying in PROD, or deploying an Update Set)."
```

---

## 2. Environment Discovery & Validation

### 2.1 System Information
```bash
# Operating System Details
# This is a ServiceNow instance. The underlying OS is managed by ServiceNow.
# Version can be found at /stats.do on the instance.

# Shell Information
# Shell access is for file system operations on the checked-out code, not the live instance.
# echo $SHELL
# Returns: /bin/bash

# Current User & Permissions
# User permissions are managed within ServiceNow via Roles.
# whoami
# Returns: admin
```

### 2.2 Platform-Specific Detection
```bash
# Platform Detection Results
# The presence of numerous .xml files with sys_id's and .now.ts files indicates a ServiceNow Scoped App.
# The file `metadata/sys_app_2ac1af2e931ea290d5ec31697bba10f0.xml` confirms the application scope is 'x_1118046_partne_0'.

# Development vs Production Indicators
# The instance URL is the primary indicator. Dev instances typically have 'dev' or 'snd' in the name (e.g., 'dev12345.service-now.com'). Production URLs are often custom (e.g., 'support.mycompany.com').
```

### 2.3 Available Commands Check
```bash
# Core utilities availability
# git is available for source control.
# curl, wget are available for testing external APIs from a shell environment.

# Package managers available
# N/A. ServiceNow manages its own application packaging.
```

---

## 3. Platform-Specific Workflow Management

### 3.1 Process Management System
```bash
# How to start/stop/restart processes in this DEVELOPMENT environment
# Application logic is event-driven within the ServiceNow runtime.
# To "restart" a flow or business rule, you typically update the record and save it.
# To clear the instance cache:
# 1. Navigate to your instance URL followed by '/cache.do'.
# 2. Press the 'Clear cache' button.
```

### 3.2 Package Management System
```bash
# How to install dependencies in this DEVELOPMENT environment
# Dependencies are other ServiceNow applications or libraries installed from the ServiceNow Store.
# 1. Navigate to 'System Applications > All Available Applications > All'.
# 2. Search for the desired application and click 'Install'.
# For this project, all code is self-contained within the scope.
```

### 3.3 Deployment System
```bash
# How to deploy FROM this development environment TO production
# The primary method is via source control integration with Git.
# 1. Make changes in the DEVELOPMENT instance UI.
# 2. In ServiceNow Studio, commit changes to the linked Git repository.
# 3. In the PRODUCTION instance, apply the committed changes from the repository.
# Alternative method: Update Sets
# 1. Capture all changes in a named Update Set in DEV.
# 2. Mark the Update Set as 'Complete'.
# 3. Export the Update Set to XML.
# 4. Import and commit the Update Set in PROD.
```

---

## 4. File System Operations

### 4.1 Working Directory Structure
```bash
# Get current directory
pwd
# Returns: C:/Users/dchow/POR

# Project root identification
# The project root is identified by the presence of the 'metadata' and 'src' directories.
# ls -la
# Project root: C:/Users/dchow/POR
```

---

## 5. Network & Port Management

### 5.3 Application Access Configuration
```yaml
# CRITICAL: Distinguish between development preview and production deployment
development_server:
  bind_host: "N/A (Managed by ServiceNow)"
  default_port: 443
  
  access_urls:
    # DEVELOPMENT PREVIEW - Use this for ALL development testing
    local_dev_preview: 
      url: "https://ven05123.service-now.com"
      description: "Primary development ServiceNow instance."
      how_to_access: "Navigate to the URL and log in with developer credentials."
      
    # PRODUCTION DEPLOYMENT - Reference only, DO NOT use for testing
    public_deployed_app: 
      url: "https://support.enterpriseinnovations.com"
      description: "Live production ServiceNow instance."
      warning: "⚠️ Changes here affect real users!"
      how_to_deploy: "Deploy via Git source control or Update Set."
    
  platform_url_examples:
    development_pattern: "devXXXXX.service-now.com"
    production_pattern: "support.company.com"
```

---

## 6. Version Control & Collaboration

### 6.1 Git Configuration
```bash
# Check git user (in development environment)
git config user.name && git config user.email
# Returns: [user's git config]

# Platform-specific git setup
# The ServiceNow instance is linked to a Git repository via 'System Applications > Studio > Source Control > Link to Source Control'.
```

---

## 7. Language & Runtime Management

### 7.1 Runtime Detection
```bash
# ServiceNow uses a proprietary JavaScript engine (Rhino-based) on the backend and standard browser JS on the frontend.
# There are no user-managed runtimes to check.
```

---

## 8. Database & Storage Operations

### 8.1 Database System Detection
```yaml
database_system: "MariaDB (Managed by ServiceNow)"
connection_method: "GlideRecord API"
orm_tool: "GlideRecord"
connection_source: "Platform-provided"

database_environment:
  development_db: "separate dev database"
  production_db: "separate production database"
  data_isolation: "complete"

platform_specific_database:
  provider: "ServiceNow"
  access_method: "GlideRecord API, REST Table API"
  management_tools: "Tables & Columns module, Database schema viewer"
```

---

## 9. Testing & Quality Assurance

### 9.1 Testing Framework
```bash
# Test execution IN DEVELOPMENT
# 1. Navigate to 'Automated Test Framework (ATF) > Tests'.
# 2. Find the relevant Test Suite (e.g., 'POR Admin Access').
# 3. Click 'Run Test Suite'.
# Results are viewed in the 'Test Results' module.
# Current method: Use the ServiceNow Automated Test Framework (ATF).

# Code quality tools
# ServiceNow provides a 'Scoped App Linter' and 'Instance Scan' for code quality checks.
```

---

## 10. Debugging & Monitoring

### 10.1 Log Access
```yaml
log_system:
  application_logs: "Navigate to 'System Logs > System Log > All' and filter by source starts with 'x_1118046_partne_0'."
  system_logs: "Navigate to 'System Logs > System Log > All'."
  platform_logs: "Managed by ServiceNow. Node logs are accessible via support."
  
  dev_vs_prod_logs:
    development: "Direct access via 'System Logs' module."
    production: "Direct access via 'System Logs' module (requires prod login)."
  
  real_time_monitoring: "Use 'System Logs > Log Tailer' or the 'Script Log Statements' module."
```

---

## 11. Security & Secrets Management

### 11.1 Secret Storage
```yaml
secrets_management:
  method: "System Properties (sys_properties table)"
  access_pattern: "gs.getProperty('scope.property_name')"
  storage_location: "sys_properties table, with type 'password2' for encryption."
  
  dev_vs_prod_secrets:
    development: "Secrets stored in System Properties on the dev instance."
    production: "Secrets stored in System Properties on the prod instance with different values."
    isolation: "complete"
```

---
## 15. Quick Reference Card

```bash
# DEVELOPMENT Environment Quick Commands:
# View Server Logs: Navigate to 'System Logs > All'
# Run Tests: Navigate to 'ATF > Tests' and run the appropriate suite.
# Clear Cache: Navigate to '/cache.do'

# Essential workflow:
1. Always work in DEVELOPMENT instance.
2. Test using local_dev_preview URL: https://ven05123.service-now.com
3. Deploy to production using: Git Source Control commit from Studio.
4. Production URL (DO NOT use for testing): https://support.enterpriseinnovations.com

# Emergency commands:
# Back out changes: In Studio, use 'Source Control > Stash Local Changes' or 'Apply Remote Changes'.
```

---

## 16. Environment Verification

```bash
echo "=== FINAL ENVIRONMENT VERIFICATION ==="
echo "Environment type: DEVELOPMENT"
echo "Preview/test URL: https://ven05123.service-now.com"
echo "Production URL (reference only): https://support.enterpriseinnovations.com"
echo ""
echo "✓ I will use https://ven05123.service-now.com for ALL testing"
echo "✓ I understand https://support.enterpriseinnovations.com is production"
echo "✓ This profile documents the DEVELOPMENT environment"
echo "=== VERIFICATION COMPLETE ==="
```