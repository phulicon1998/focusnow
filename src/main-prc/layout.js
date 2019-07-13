const {ipcMain, BrowserWindow, Menu, Tray} = require("electron");
const db = require("../service/dbControl");
const path = require("path");

const iconPath = path.join(__dirname, "../assets/icon/icon.ico");

ipcMain.on("minimize", minimize);

async function minimize() {
    try {
        let option = await db.get("option").value();
        if(option.minimize){
            let tray = new Tray(iconPath);
            const contextMenu = new Menu.buildFromTemplate([
                { label: "Show" },
                { label: "Exit" }
            ])

            tray.setToolTip("Focus App");
            tray.setContextMenu(contextMenu);

            tray.on("click", () => win.maximize());
        }
        let win = BrowserWindow.getFocusedWindow();
        win.minimize();
    } catch(err) {
        console.log(err);
    }
}
