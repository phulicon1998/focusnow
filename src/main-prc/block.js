const {BrowserWindow, ipcMain} = require("electron");
const ids = require("shortid");
const db = require("../service/dbControl");

ipcMain.on("load-site", loadSite);
ipcMain.on("add-site", addSite);
ipcMain.on("remove-site", removeSite);
ipcMain.on("active-site", activeSite);

async function loadSite() {
    try {
        let sites = await db.get("site").value();
        let win = BrowserWindow.getFocusedWindow();
        return win.webContents.send("site-data", sites);
    } catch(err) {
        console.log(err);
    }
}

async function addSite(e, link) {
    try {
        await db.get("site").push({id: ids.generate(), link, active: true}).write();
    } catch(err) {
        console.log(err);
    }
}

async function removeSite(e, id) {
    try {
        await db.get("site").remove({id}).write();
    } catch(err) {
        console.log(err);
    }
}

async function activeSite(e, id, active) {
    try {
        await db.get("site").find({id}).assign({active}).write();
    } catch(err) {
        console.log(err);
    }
}
