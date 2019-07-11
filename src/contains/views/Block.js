import React, {useState} from "react";
import Block from "../../presents/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

export default function BlockContain(props) {
    // // const [list, setList] = useState([]);
    const [state, setState] = useState({
        link: "",
        list: [
            {
                link: "www.facebook.com",
                active: true
            },
            {
                link: "www.facebook.com",
                active: true
            },
            {
                link: "www.facebook.com",
                active: false
            },
            {
                link: "www.facebook.com",
                active: false
            },
            {
                link: "www.facebook.com",
                active: false
            },
        ],
        actived: true
    });
    const {link, id, actived} = state;

    const hdChange = (e) => {
        setState({
            [e.target.name]: e.target.value
        })
    }

    function hdSubmit(e) {
        e.preventDefault();
        let{link, id, actived, list} = state;
        if(id === ""){
            list = [...list, {link, actived}];
        }else {
            list[id] = {...list[id], link, actived: false};
        }
        setState({...state, list, link: "", id: "", actived: true});
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

    const block = () => ipc.send("begin-block");
    const unblock = () => ipc.send("stop-block");

    return <Block
        {...props}
        {...state}
        hdChange={hdChange}
        hdSubmit={hdSubmit}
        hdRemove={hdRemove}
        hdActive={hdActive}
        block={block}
        unblock={unblock}
    />
}
