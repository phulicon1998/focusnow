import React, {useState, useEffect} from "react";
import Option from "../../presents/views/Option";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

export default function OptionContain(props){
    const [time, setTime] = useState({
        work: 0,
        short: 0,
        long: 0,
        round: 0
    });
    const [option, setOption] = useState({
        onStart: false,
        minimize: false
    })
    const [edit, setEdit] = useState(false);

    const load = () => ipc.send("load-option");

    useEffect(() => {
        let isLoad = false;
        load();
        if(!isLoad) {
            ipc.on("option-data", (err, arg) => {
                if(!isLoad) {
                    const {time, option} = arg;
                    setTime(prev => ({...prev, ...time}));
                    setOption(prev => ({...prev, ...option}));
                }
            });
        }
        return () => isLoad = true;
    }, []);

    const doCheck = (key) => {
        let modOption = {...option, [key]: !option[key]};
        save({option: modOption, time});
        setOption(prev => ({...prev, [key]: !prev[key]}));
    };
    const add = (key, val) => setTime(prev => ({...prev, [key]: ++val}));
    const min = (key, val) => setTime(prev => ({...prev, [key]: --val}));

    function save(data={time, option}) {
        ipc.send("save-option", data);
        setEdit(false);
    }

    return <Option
        {...props}
        {...time}
        {...option}
        edit={edit}
        add={add}
        min={min}
        save={save}
        doEdit={setEdit}
        doCheck={doCheck}
    />
}
