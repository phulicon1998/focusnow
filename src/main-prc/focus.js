const {BrowserWindow, ipcMain, screen, Menu, Tray} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const notifier = require("node-notifier");
const db = require("../service/dbControl");
const fs = require("fs");

const {width} = (screen.getPrimaryDisplay()).size;
const {REDIRECTPATH, WINPATH, ICONPATH, BEGIN, END, PORT} = process.env;
const iconPath = path.join(__dirname, ICONPATH);
let startWin, tray;

ipcMain.on("start-focus", winFocus);
ipcMain.on("break-time", breakTime);
ipcMain.on("work-time", workTime);
ipcMain.on("finish", finish);
ipcMain.on("get-focus", getFocus);
ipcMain.on("clear-block", clearBlock);

async function winFocus() {
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

    startWin.loadURL(isDev ? `http://localhost:${PORT}/focus` : `file://${path.join(__dirname, '../build/index.html')}`);
    startWin.show();

    let option = await db.get("option").value();
    if(option.minimize){
        tray = new Tray(iconPath);
        let contextMenu = new Menu.buildFromTemplate([
            { label: "Stop", click: cancelFocus },
        ]);
        tray.setToolTip("Focus App");
        tray.setContextMenu(contextMenu);
        startWin.setSkipTaskbar(true);
    }

    startWin.on("ready", block);
    startWin.on("closed", () => startWin = null);
}

async function workTime() {
    // await block();
    return notifier.notify({
        title: "Back to work!",
        message: "Break time is over, continue to make progress",
        wait: true
    })
}

function breakTime() {
    // unblock();
    return notifier.notify({
        title: "Break time!",
        message: "Take a break to deal with next round!. The sites are still blocked",
        wait: true
    })
}

function finish() {
    unblock();
    return notifier.notify({
        title: "Time is up! Congratulation!",
        message: "You have finished the last round, all sites are unblocked, i hope you had achieved what you want. Continue?",
        wait: true
    })
}

async function getFocus() {
    try {
        const {work, short, long, round} = await db.get("time").value();
        await block();
        return startWin.webContents.send("load-focus", {work: work*60, short: short*60, long: long*60, round});
    } catch(err) {
        console.log(err);
    }
}

function clearHost(host) {
    let start = host.findIndex(v => v === BEGIN);
    let end = host.findIndex(v => v === END);
    if(start !== -1 && end !== -1) host.splice(start-1, end+1);
    return host.join("\n");
}

async function writeHost() {
    try {
        let site = await db.get("site").filter({active: true}).value();
        if(site.length > 0){
            let fullAddress = site.map(v => `${REDIRECTPATH} www.${v.link}`);
            let address = site.map(v => `${REDIRECTPATH} ${v.link}`);
            let content = [`\n\n${BEGIN}\n`, ...address, ...fullAddress, ` \n${END}`].join("\n");
            return content;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
}

async function block() {
    try {
        unblock();
        let content = await writeHost();
        if(content){
            fs.chmodSync(WINPATH, 0o777);
            fs.appendFileSync(WINPATH, content);
            console.log("[ BLOCK ACTIVATED ]");
        } else {
            console.log("[ THERE IS NO SITE TO BLOCK ]");
        }
    } catch(err) {
        console.log(err);
    }
}

async function unblock() {
    let host = (fs.readFileSync(WINPATH)).toString().split("\n");
    let removedHost = clearHost(host);
    fs.chmodSync(WINPATH, 0o777);
    fs.writeFileSync(WINPATH, removedHost);
}

function clearBlock() {
    unblock();
    if(tray) tray.destroy();
    startWin.close();
    console.log("[ BLOCK DEACTIVATED ]");
}

function cancelFocus() {
    return startWin.webContents.send("cancel-focus");
}
