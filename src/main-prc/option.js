const {ipcMain, BrowserWindow} = require("electron");
const db = require("../service/dbControl");

ipcMain.on("load-setting", loadOption);
ipcMain.on("save-option", saveOption);

async function loadOption() {
    try{
        let setting = await db.get("time").value();
        let win = BrowserWindow.getFocusedWindow();
        return win.webContents.send("setting-data", setting);
    } catch(err) {
        console.log(err);
    }
}

async function saveOption(e, option) {
    try {
        await db.get("time").assign(option).write();
    } catch (err) {
        console.log(err);
    }
}
