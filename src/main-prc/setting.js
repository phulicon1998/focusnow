const {ipcMain, BrowserWindow} = require("electron");
const db = require("../service/dbControl");

ipcMain.on("load-setting", loadSetting);

async function loadSetting() {
    try{
        let setting = await db.get("time").value();
        let win = BrowserWindow.getFocusedWindow();
        return win.webContents.send("setting-data", setting);
    } catch(err) {
        console.log(err);
    }
}
