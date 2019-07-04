const {BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const {promisify} = require("util");
const fs = require("fs");

const filePath = "C:\\Windows\\System32\\drivers\\etc\\hosts";
const redirectPath = "127.0.0.1";

ipcMain.on("block-site", winBlock);
ipcMain.on("begin-block", beginBlock);
ipcMain.on("stop-block", stopBlock);

let blockWin;
const readFile = promisify(fs.readFile);
const appendFile = promisify(fs.appendFile);
const writeFile = promisify(fs.writeFile);

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

function removeOldHostLink(host) {
    let start = host.findIndex(v => v === "# START FOCUS APP - DO NOT TOUCH");
    let end = host.findIndex(v => v === "# END FOCUS APP - DO NOT TOUCH");
    if(start !== -1 && end !== -1) host.splice(start-1, end+1);
    return host.join("\n");
}

function addLinkToHost(list) {
    let content = [];
    content.push(" \n# START FOCUS APP - DO NOT TOUCH\n ");
    content.push(redirectPath + " www.facebook.com");
    content.push(" \n# END FOCUS APP - DO NOT TOUCH");
    return content.join("\n");
}

async function beginBlock() {
    try {
        await stopBlock();
        let content = addLinkToHost();
        await appendFile(filePath, content);
    } catch(err) {
        console.log(err);
    }
}

async function stopBlock() {
    try {
        let host = (await readFile(filePath)).toString().split("\n");
        let removedHost = removeOldHostLink(host);
        await writeFile(filePath, removedHost);
    } catch(err) {
        console.log(err);
    }
}
