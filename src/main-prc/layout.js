const {ipcMain, BrowserWindow, Menu, Tray, app} = require("electron");
const db = require("../service/dbControl");
const path = require("path");

let tray, win;
const iconPath = path.join(__dirname, "../assets/icon/icon.ico");

ipcMain.on("minimize", minimize);

async function minimize() {
    try {
        win = BrowserWindow.getFocusedWindow();
        let option = await db.get("option").value();
        if(option.minimize){
            tray = new Tray(iconPath);
            let contextMenu = new Menu.buildFromTemplate([
                { label: "Show", click: restore },
                { type: "separator" },
                { label: "Close", click: close }
            ]);
            tray.setToolTip("Focus App");
            tray.setContextMenu(contextMenu);
            win.setSkipTaskbar(true);
        }
        win.minimize();
    } catch(err) {
        console.log(err);
    }
}

function restore() {
    if(win && win.isMinimized()){
        win.setSkipTaskbar(false);
        win.restore();
        tray.destroy();
    }
}

function close() {
    tray.destroy();
    app.quit();
}
