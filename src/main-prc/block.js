const {BrowserWindow, ipcMain} = require("electron");
const ids = require("shortid");
// const {promisify} = require("util");
// const fs = require("fs");
const db = require("../service/dbControl");

// const filePath = "C:\\Windows\\System32\\drivers\\etc\\hosts";
// const redirectPath = "127.0.0.1";

// ipcMain.on("begin-block", beginBlock);
// ipcMain.on("stop-block", stopBlock);
ipcMain.on("load-site", loadSite);
ipcMain.on("add-site", addSite);
ipcMain.on("remove-site", removeSite);
ipcMain.on("active-site", activeSite);


// const readFile = promisify(fs.readFile);
// const appendFile = promisify(fs.appendFile);
// const writeFile = promisify(fs.writeFile);

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

// function removeOldHostLink(host) {
//     let start = host.findIndex(v => v === "# START FOCUS APP - DO NOT TOUCH");
//     let end = host.findIndex(v => v === "# END FOCUS APP - DO NOT TOUCH");
//     if(start !== -1 && end !== -1) host.splice(start-1, end+1);
//     return host.join("\n");
// }
//
// function addLinkToHost(list) {
//     let content = [];
//     content.push(" \n# START FOCUS APP - DO NOT TOUCH\n ");
//     content.push(redirectPath + " tv.zing.vn");
//     content.push(" \n# END FOCUS APP - DO NOT TOUCH");
//     return content.join("\n");
// }
//
// async function beginBlock() {
//     try {
//         await stopBlock();
//         let content = addLinkToHost();
//         await appendFile(filePath, content);
//     } catch(err) {
//         console.log(err);
//     }
// }
//
// async function stopBlock() {
//     try {
//         let host = (await readFile(filePath)).toString().split("\n");
//         let removedHost = removeOldHostLink(host);
//         await writeFile(filePath, removedHost);
//     } catch(err) {
//         console.log(err);
//     }
// }
