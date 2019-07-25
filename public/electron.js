require("dotenv").config();
const {app, BrowserWindow, ipcMain} = require("electron");

const path = require('path');
const glob = require('glob');
const isDev = require("electron-is-dev");

ipcMain.on("restore-main", () => win.show());

let win;

function createWindow() {

    makeSingleInstance();
    loadProcesses();

    win = new BrowserWindow({
        width: 329,
        height: 390,
        resizable: false,
        alwaysOnTop: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
    })

    win.loadURL(isDev ? "http://localhost:3002" : `file://${path.join(__dirname, '../build/index.html')}`);

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

function makeSingleInstance () {
    if (process.mas) return;

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })
}

function loadProcesses() {
    const files = glob.sync(path.join(__dirname, '../src/main-prc/*.js'));
    files.forEach((file) => { require(file) });
}
