import React, {useState, useEffect} from "react";
import Setting from "../../presents/views/Setting";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

export default function SettingContain(props){
    const [state, setState] = useState({
        work: 0,
        short: 0,
        long: 0,
        round: 0
    })

    useEffect(() => {
        let isLoad = false;
        load();
        ipc.on("setting-data", (err, arg) => {
            if(!isLoad) setState({...arg})
        });
        return () => isLoad = true;
    }, []);

    function load() {
        ipc.send("load-setting");
    }

    return <Setting {...state} {...props}/>
}
