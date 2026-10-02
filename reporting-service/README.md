# Reporting microservice POC

Planned independent .NET HTTP service with its own reporting endpoints, configuration, and deployment.

## Folders

- `src/Reporting.Api/Endpoints/`: report HTTP endpoints.
- `src/Reporting.Api/Contracts/`: reporting request and response DTOs.
- `src/Reporting.Api/Services/`: report data aggregation and transformation.
- `src/Reporting.Api/Clients/`: typed HTTP clients for existing UI and Admin APIs.
- `src/Reporting.Api/Configuration/`: upstream URLs and runtime settings.
- `tests/`: contract, aggregation, and integration tests when implemented.

React calls this service; the service retrieves permitted data from existing APIs and returns a consistent report response. Start without a reporting database. Preserve caller permissions when accessing upstream APIs and keep service credentials outside source control.

The first report will use sample data before live API integration. Endpoint contracts, authentication, timeouts, and upstream error handling will be designed during implementation.

This is a folder scaffold; no .NET project has been generated yet.
