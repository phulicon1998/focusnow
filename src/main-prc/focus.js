const {BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let startWin;

ipcMain.on("start-focus", winFocus);

function winFocus() {
    let currentWin = BrowserWindow.getFocusedWindow();
    currentWin.hide();

    startWin = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })

    startWin.loadURL(isDev ? "http://localhost:3000/focus" : `file://${path.join(__dirname, '../build/index.html')}`);
    startWin.show();

    startWin.on("closed", () => startWin = null);
}
