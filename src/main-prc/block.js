const {BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

ipcMain.on("block-site", winBlock);

let blockWin;

function winBlock(){
    blockWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })

    blockWin.loadURL(isDev ? "http://localhost:3000/block" : `file://${path.join(__dirname, '../build/index.html')}`);
    blockWin.show();

    blockWin.on("closed", () => blockWin = null);
}
