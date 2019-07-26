import React, {useState, useEffect} from "react";
import Block from "../../presents/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function BlockContain(props) {
    const [state, setState] = useState({
        link: "",
        list: []
    });

    useEffect(() => {
        return load();
    }, []);

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

    function hdChange(e) {
        let {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    }

    function hdAdd(e) {
        if(state.link.length > 0) {
            e.preventDefault();
            ipc.send("add-site", state.link);
            load();
        }
    }

    function hdEnter(e){
        if(e.key === "Enter") hdAdd(e);
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

    const block = () => ipc.send("block");
    const unblock = () => ipc.send("unblock");

    return <Block
        {...props}
        {...state}
        hdChange={hdChange}
        hdAdd={hdAdd}
        hdEnter={hdEnter}
        hdRemove={hdRemove}
        hdActive={hdActive}
    />
}
