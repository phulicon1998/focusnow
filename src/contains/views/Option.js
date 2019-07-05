import React, {useState, useEffect} from "react";
import Option from "../../presents/views/Option";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

export default function OptionContain(props){
    const [state, setState] = useState({
        work: 0,
        short: 0,
        long: 0,
        round: 0,
        onStart: false,
        minimize: false
    });
    const [edit, setEdit] = useState(false);

    const load = () => ipc.send("load-setting");

    useEffect(() => {
        let isLoad = false;
        load();
        if(!isLoad) {
            ipc.on("setting-data", (err, arg) => {
                if(!isLoad) setState(prev => ({...prev, ...arg}))
            });
        }
        return () => isLoad = true;
    }, []);

    const doCheck = (key) => {
        save({...state, [key]: !state[key]});
        setState(prev => ({...prev, [key]: !prev[key]}))
    };
    const add = (key, val) => setState(prev => ({...prev, [key]: ++val}));
    const min = (key, val) => setState(prev => ({...prev, [key]: --val}));

    function save(data=state) {
        ipc.send("save-option", data);
        setEdit(false);
    }

    return <Option
        {...props}
        {...state}
        edit={edit}
        add={add}
        min={min}
        save={save}
        doEdit={setEdit}
        doCheck={doCheck}
    />
}
