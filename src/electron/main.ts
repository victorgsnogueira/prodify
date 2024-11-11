import { app, BrowserWindow, Tray, Menu } from 'electron'
import path from 'path'
import { isDev } from './util.js';
import { getAssestPath, getPreloadPath } from './pathResolver.js';

app.on("ready", ()=>{
    const mainWindow = new BrowserWindow({
        width: 1280, // Largura de 1280px
        height: 800, // Altura de 800px
        webPreferences: {
            preload: getPreloadPath(),
            
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:3003')
        Menu.setApplicationMenu(null);
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }

    new Tray(
        path.join(
            getAssestPath(), 'trayIcon.png'
        )
    )
});