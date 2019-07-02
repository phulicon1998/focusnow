import React from "react";
import Main from "../../presents/views/Main";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function MainContain(props){
    const scrFocus = () => ipc.send("start-focus");
    return <Main scrFocus={scrFocus}/>
}
