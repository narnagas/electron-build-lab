# electron-build-lab

A lab for building and packaging an independent Electron desktop shell that loads a hosted web UI, with container tooling for reproducible development and code analysis.

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

This commit establishes the folder structure only. Application code, dependency versions, Dockerfiles, and Compose services will be added during implementation. Do not commit credentials, tokens, signing keys, or private environment configuration.
