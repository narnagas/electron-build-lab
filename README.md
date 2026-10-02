# electron-build-lab

A lab for building and packaging an independent Electron desktop shell that loads a hosted web UI, with container tooling for reproducible development and code analysis.

## Angular POC application

`angular/` contains the default standalone Angular CLI starter application (CLI 22.2.1). Keep its dependencies and builds separate from Electron.

Use Node.js 24.19 or a compatible Angular 22 Node.js version. From the repository root:

```sh
cd angular
npm ci
npm start
```

Open http://localhost:4200. This is the planned local UI URL for the Electron POC; Electron wiring will be added next.

```sh
npm run build
npm test -- --watch=false
```

The production web output is in `angular/dist/electron-build-lab-ui/browser/` and can be served independently. The default starter has no API or authentication dependency.

## Electron application

- `electron/src/`: main-process and preload code.
- `electron/config/`: environment configuration examples (development, staging, production).
- `electron/assets/`: application icons and packaging assets.
- `electron/scripts/`: build, packaging, and measurement scripts.

Measure unpacked build time, installer build time, and installer size before comparing changes. Test the unpacked desktop application before generating an installer.

## Containerization

- `docker/build/`: Dockerfiles and supporting build tooling.
- `docker/sonarqube/`: planned SonarQube and database Compose configuration.
- `docker/scripts/`: container lifecycle and analysis helpers.

The Electron application runs on the desktop. Containers support build tooling and analysis. Windows packaging will be evaluated separately on a Windows runner.

## Documentation

- `docs/architecture/`: design decisions and environment mapping.
- `docs/benchmarks/`: recorded build timings and installer sizes.

The Angular starter is available; Electron implementation, Dockerfiles, and Compose services will be added next. Do not commit credentials, tokens, signing keys, or private environment configuration.

## React reporting and microservice POC

- `react-reports/`: planned standalone React reporting UI with tables, charts, and PDF exports.
- `reporting-service/`: planned independent .NET reporting API that aggregates permitted data from the existing UI and Admin APIs.
- `docker/react-reports/` and `docker/reporting-service/`: container configuration placeholders.
- `docs/reporting/`: reporting architecture and POC scope.

Electron opens React, React calls the reporting service, and the service calls existing APIs. Start with a Daily Orders sample-data example, then integrate live data. These new folders are scaffolding only; their application projects will be generated next.
