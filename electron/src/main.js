const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('node:path');
const { getConfig } = require('./config');

let settings;
let window;
function createWindow() {
  window = new BrowserWindow({
    width: 1200, height: 800, minWidth: 800, minHeight: 600,
    title: settings.title,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, contextIsolation: true, sandbox: true
    }
  });
  window.on('page-title-updated', event => event.preventDefault());
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  const guardNavigation = (event, target) => {
    try { if (new URL(target).origin !== settings.origin) event.preventDefault(); }
    catch { event.preventDefault(); }
  };
  window.webContents.on('will-navigate', guardNavigation);
  window.webContents.on('will-redirect', guardNavigation);
  window.webContents.session.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
  window.webContents.session.setPermissionCheckHandler(() => false);
  window.on('closed', () => { window = null; });
  window.loadURL(settings.url).catch(error => {
    if (window && !window.isDestroyed()) {
      dialog.showMessageBox(window, {
        type: 'error', title: 'Unable to load the application',
        message: `Could not open ${settings.url}`,
        detail: `Start the Angular server with npm start in the angular folder, then use View > Reload.\n\n${error.message}`
      });
    }
  });
}

app.whenReady().then(() => {
  try { settings = getConfig(); }
  catch (error) { dialog.showErrorBox('Invalid application configuration', error.message); app.quit(); return; }
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
    { label: 'File', submenu: [{ role: 'quit' }] },
    { label: 'View', submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'togglefullscreen' }] }
  ]));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
