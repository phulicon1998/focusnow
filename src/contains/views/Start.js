import React from "react";
import Start from "../../presents/views/Start";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function MainContain(props){
    const scrFocus = () => ipc.send("start-focus");
    return <Start {...props} scrFocus={scrFocus}/>
}
