import React, {useState, useEffect} from "react";
import Block from "../../presents/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function BlockContain(props) {
    const [state, setState] = useState({
        link: "",
        list: []
    });

    async function load() {
        let isLoad = false;
        if(!isLoad) {
            ipc.send("load-site");
            ipc.on("site-data", (e, list) => {
                if(!isLoad) setState(prev => ({...prev, list}));
            })
        }
        return () => isLoad = true;
    }

    useEffect(() => {
        load();
    }, []);

    const hdChange = (e) => {
        let {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    }

    function hdSubmit(e) {
        e.preventDefault();
        ipc.send("add-site", state.link);
        load();
    }

    function hdActive(id) {
        let {list} = state;
        setState({...state, ...list[id], id});
    }

    function hdRemove(i) {
        let {list} = state;
        list.splice(i, 1);
        setState({...state, list});
    }

    return <Block
        {...props}
        {...state}
        hdChange={hdChange}
        hdSubmit={hdSubmit}
        hdRemove={hdRemove}
        hdActive={hdActive}
    />
}
