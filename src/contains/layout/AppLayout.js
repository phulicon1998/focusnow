import React from "react";
import AppLayout from "../../presents/layout/AppLayout";
import animate from "../../service/anControl";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function AppLayoutContain(props) {
    const appear = (css) => animate() ? css : "";

    function formLink(css, link) {
        const {pathname} = props.location;
        let active = pathname === link ? "active" : "";
        return `${active} ${appear(css)}`;
    }

    const minimize = () => ipc.send("minimize");
    const close = () => ipc.send("close-app");

    return <AppLayout
        {...props}
        formLink={formLink}
        minimize={minimize}
        appear={appear}
        close={close}
    />
}
