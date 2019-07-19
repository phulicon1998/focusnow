const {BrowserWindow, ipcMain, screen} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const notifier = require("node-notifier");
const db = require("../service/dbControl");
const fs = require("fs");

const {width} = (screen.getPrimaryDisplay()).size;
const filePath = "C:\\Windows\\System32\\drivers\\etc\\hosts";
const redirectPath = "127.0.0.1";
const beginLine = "# BEGIN LINE - FOCUS APP - DO NOT TOUCH"
const endLine = "# END LINE - FOCUS APP - DO NOT TOUCH";
let startWin;

ipcMain.on("start-focus", winFocus);
ipcMain.on("break-time", breakTime);
ipcMain.on("work-time", workTime);
ipcMain.on("finish", finish);
ipcMain.on("get-focus", getFocus);
ipcMain.on("block", block);
ipcMain.on("unblock", clearBlock);

function winFocus() {
    let currentWin = BrowserWindow.getFocusedWindow();
    currentWin.hide();

    startWin = new BrowserWindow({
        width: 280,
        height: 50,
        frame: false,
        resizable: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    startWin.setPosition(width - 300, 80);

    startWin.loadURL(isDev ? "http://localhost:3002/focus" : `file://${path.join(__dirname, '../build/index.html')}`);
    startWin.show();

    startWin.on("ready", block);

    startWin.on("closed", () => startWin = null);
}

function workTime() {
    return notifier.notify({
        title: "Back to work!",
        message: "Break time is over, continue to make progress",
        wait: true
    })
}

function breakTime() {
    return notifier.notify({
        title: "Break time!",
        message: "Take a break to deal with next round!",
        wait: true
    })
}

function finish() {
    return notifier.notify({
        title: "Time is up! Congratulation!",
        message: "You have finished the last round, i hope you had achieved what you want. Continue?",
        wait: true
    })
}

async function getFocus() {
    try {
        const {work, short, long, round} = await db.get("time").value();
        return startWin.webContents.send("load-focus", {work: work*60, short: short*60, long: long*60, round});
    } catch(err) {
        console.log(err);
    }
}

function clearHost(host) {
    let start = host.findIndex(v => v === beginLine);
    let end = host.findIndex(v => v === endLine);
    if(start !== -1 && end !== -1) host.splice(start-1, end+1);
    return host.join("\n");
}

async function writeHost() {
    try {
        let site = await db.get("site").filter({active: true}).value();
        let fullAddress = site.map(v => `${redirectPath} www.${v.link}`);
        let address = site.map(v => `${redirectPath} ${v.link}`);
        let content = [`\n\n${beginLine}\n`, ...address, ...fullAddress, ` \n${endLine}`].join("\n");
        return content;
    } catch(err) {
        console.log(err);
    }
}

async function block() {
    try {
        unblock();
        let content = await writeHost();
        fs.chmodSync(filePath, 0o777);
        fs.appendFileSync(filePath, content);
        console.log("[ BLOCK ACTIVATED ]");
    } catch(err) {
        console.log(err);
    }
}

async function unblock() {
    let host = (fs.readFileSync(filePath)).toString().split("\n");
    let removedHost = clearHost(host);
    fs.chmodSync(filePath, 0o777);
    fs.writeFileSync(filePath, removedHost);
}

function clearBlock() {
    unblock();
    console.log("[ BLOCK DEACTIVATED ]");
}
