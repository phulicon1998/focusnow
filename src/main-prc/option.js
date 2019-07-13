const {ipcMain, BrowserWindow} = require("electron");
const db = require("../service/dbControl");

ipcMain.on("load-option", loadOption);
ipcMain.on("save-option", saveOption);

async function loadOption() {
    try{
        let time = await db.get("time").value();
        let option = await db.get("option").value();
        let win = BrowserWindow.getFocusedWindow();
        return win.webContents.send("option-data", {time, option});
    } catch(err) {
        console.log(err);
    }
}

async function saveOption(e, data) {
    try {
        const {time, option} = data;
        await db.get("time").assign(time).write();
        await db.get("option").assign(option).write();
    } catch (err) {
        console.log(err);
    }
}
