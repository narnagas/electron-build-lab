# Reporting POC design

Objectives:

1. Learn React through report filters, tables, charts, and PDF exports.
2. Learn microservices through an independently running .NET reporting API.
3. Open the React reporting UI from Electron while retaining the Angular POC.

Request flow: Electron opens React; React calls the reporting service; the reporting service calls the existing UI and Admin APIs with appropriate permissions.

First vertical slice: Daily Orders with sample data, a table, an orders-by-day chart, and PDF preview/download. Then integrate existing API endpoints.

Container configuration is reserved under `docker/reporting-service/` and `docker/react-reports/`. The Electron desktop process remains separate.
