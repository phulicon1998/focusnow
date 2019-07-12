import React, {useState, useEffect} from "react";
import Block from "../../presents/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function BlockContain(props) {
    const [state, setState] = useState({
        link: "",
        list: []
    });

    function load() {
        let isLoad = false;
        if(!isLoad) {
            ipc.send("load-site");
            ipc.on("site-data", (e, list) => {
                if(!isLoad) setState(prev => ({...prev, list, link: ""}));
            })
        }
        return () => isLoad = true;
    }

    useEffect(() => {
        return load();
    }, []);

    function hdChange(e) {
        let {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    }

    function hdAdd(e) {
        e.preventDefault();
        ipc.send("add-site", state.link);
        load();
    }

    function hdActive(id) {
        let {list} = state;
        let active = list.filter(v => v.id === id)[0].active;
        ipc.send("active-site", id, !active);
        list.forEach(v => { if(v.id === id) v.active = !v.active; });
        setState(prev => ({...prev, list}));
    }

    function hdRemove(id) {
        let {list} = state;
        ipc.send("remove-site", id);
        list = list.filter(v => v.id !== id);
        setState(prev => ({...prev, list}));
    }

    return <Block
        {...props}
        {...state}
        hdChange={hdChange}
        hdAdd={hdAdd}
        hdRemove={hdRemove}
        hdActive={hdActive}
    />
}
