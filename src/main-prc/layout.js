const {ipcMain, BrowserWindow, app} = require("electron");
let win;

ipcMain.on("minimize", minimize);
ipcMain.on("close-app", close);

function minimize() {
    win = BrowserWindow.getFocusedWindow();
    win.minimize();
}

function close() {
    app.quit();
}
