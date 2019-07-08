const {BrowserWindow, ipcMain, screen} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const notifier = require("node-notifier");
const {width} = (screen.getPrimaryDisplay()).size;
const db = require("../service/dbControl");

let startWin;

ipcMain.on("start-focus", winFocus);
ipcMain.on("break-time", breakTime);
ipcMain.on("work-time", workTime);
ipcMain.on("finish", finish);
ipcMain.on("get-focus", getFocus);

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

    startWin.loadURL(isDev ? "http://localhost:3000/focus" : `file://${path.join(__dirname, '../build/index.html')}`);
    startWin.show();

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
