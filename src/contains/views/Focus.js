import React, {useState, useEffect} from "react";
import Focus from "../../presents/views/Focus";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

export default function FocusContain(props) {
    const [state, setState] = useState({
        total: 10,
        left: 10,
        round: 1,
        cont: true
    });
    const {total, left, cont} = state;
    let interval;

    // useEffect(() => {
    //     decrease();
    //     return () => clearInterval(interval);
    // })

    function decrease(cb) {
        if(cont) {
            interval = setInterval(() => {
                if(left === 0){
                    clearInterval(interval);
                    return cb ? cb() : null;
                }
                setState(prev => ({...prev, left: prev.left - 1 }));
            }, 1000);
        }
    }

    function reset() {
        clearInterval(interval);
        setState({...state, left: total, cont: false});
    }

    function pause() {
        if(cont) {
            clearInterval(interval);
            return setState({...state, cont: !cont});
        }
        setState({...state, cont: !cont});
        return decrease();
    }

    const cancel = () => ipc.send("restore-main");

    return <Focus
        {...state}
        {...props}
        reset={reset}
        pause={pause}
        cancel={cancel}
    />
}
