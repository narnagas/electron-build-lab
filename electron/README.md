# Electron desktop POC

Independent Electron shell loading the Angular app over HTTP on localhost or a hosted application over HTTPS. Angular is not bundled or compiled during desktop packaging.

## Run on Windows

Use Node.js 24.19 and npm. In the first terminal, from the repository root:

```powershell
cd angular
npm ci
npm start
```

In a second terminal:

```powershell
cd electron
npm ci
npm start
```

The desktop window opens http://localhost:4200. If the server is unavailable, a dialog explains how to start it. View > Reload retries loading.

## URL configuration

The default environment is `development` in `config/env-config.json`. Override the URL for a hosted UI or the future React app:

```powershell
$env:ELECTRON_LAB_URL = "https://your-hosted-ui.example.com"
npm start
```

Use `Remove-Item Env:ELECTRON_LAB_URL` to restore the default. URLs must be HTTPS except for local loopback HTTP. Environment variables are runtime settings; they are not baked into installers. The initial installer also defaults to the local Angular server.

## Package on Windows

```powershell
npm test
npm run pack:win
```

Launch `release/win-unpacked/Electron Build Lab.exe` and verify the UI, reload, and window behavior before building the installer:

```powershell
npm run dist:win
```

The installer is `release/Electron-Build-Lab-0.1.0-setup.exe`. This POC uses default Electron icons and does not configure code signing or automatic updates. `npm run pack` creates an unpacked application for the current operating system.

Record build duration, unpacked size, installer size, OS, and tool versions in `docs/benchmarks/`. No Angular command is run by these packaging scripts.

## Desktop boundary

Renderer sandboxing and context isolation are enabled; Node integration is disabled. Navigation stays on the configured origin, new windows and permissions are blocked, and preload exposes only application/version metadata. Authentication redirects to another origin will need an explicit design before integration. Admin, React navigation, PDF saving, and Survey 1 AD session behavior are future work.
