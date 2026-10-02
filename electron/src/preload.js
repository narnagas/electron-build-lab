const { contextBridge } = require('electron');

// Informational only; no filesystem, shell, or unrestricted IPC access.
contextBridge.exposeInMainWorld('desktopInfo', Object.freeze({
  application: 'Electron Build Lab',
  electronVersion: process.versions.electron
}));
