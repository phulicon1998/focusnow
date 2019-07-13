import React from "react";
import AppLayout from "../../presents/layout/AppLayout";
const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function AppLayoutContain(props) {
    const setActive = (link) => props.location.pathname === link;

    const minimize = () => ipc.send("minimize");

    return <AppLayout
        {...props}
        active={setActive}
        minimize={minimize} 
    />
}
