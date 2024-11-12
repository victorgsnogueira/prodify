import { app, BrowserWindow, Tray, Menu, screen } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getAssestPath, getPreloadPath } from './pathResolver.js';

app.on("ready", () => {
    const display = screen.getPrimaryDisplay();
    const { width, height } = display.workAreaSize;

    const windowWidth = Math.floor(width * 0.65);
    const windowHeight = Math.floor(height * 0.75);

    const mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:3003');
        Menu.setApplicationMenu(null);
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }

    new Tray(
        path.join(
            getAssestPath(), 'trayIcon.png'
        )
    );
});