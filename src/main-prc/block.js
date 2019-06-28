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

async function beginBlock() {
    try {
        if(blockWin){
            let host = (await readFile(filePath)).toString();
            console.log(host);
            let list = host.split("\n");
            let firstUse = list.every(v => v !== "# FOR FOCUS APP");
            if(firstUse){
                list.push(" \n# FOR FOCUS APP");
            }
            list.push("");
            list.push(redirectPath + " facebook.com");
            let newList = list.join("\n");
            console.log(newList);

        }
    } catch(err) {
        console.log(err);
    }
}

async function stopBlock() {
    try {
        let host = (await readFile(filePath)).toString();
        if(blockWin){
            console.log("ok run");
        } else {
            console.log("No host");
        }
    } catch(err) {
        console.log(err);
    }
}
