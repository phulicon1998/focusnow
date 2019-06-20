const {BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let startWin;

ipcMain.on("start-focus", winStartFocus);

function winStartFocus() {
    startWin = new BrowserWindow({
        width: 600,
        height: 200,
        webPreferences: {
            nodeIntegration: true
        }
    })

    startWin.loadURL(isDev ? "http://localhost:3000/start" : `file://${path.join(__dirname, '../build/index.html')}`);
    startWin.show();

    startWin.on("closed", () => startWin = null);
}
