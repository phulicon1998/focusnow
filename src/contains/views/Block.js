import React from "react";
import Block from "../../presents/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function BlockContain(props) {
    // const [list, setList] = useState([]);

    const block = () => ipc.send("begin-block");
    const unblock = () => ipc.send("stop-block");

    return <Block {...props} block={block} unblock={unblock}/>
}
