import React, {useState, useEffect} from "react";
import Focus from "../../presents/views/Focus";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

export default function FocusContain(props) {
    const [progress, setProgress] = useState({
        total: 10,
        left: 10,
        stage: 5,
        cont: true,
        breakTime: false
    });
    const [time] = useState({
        work: 10,
        short: 5,
        long: 10,
        round: 5
    })
    let {left, cont, breakTime, stage} = progress;
    let interval;

    useEffect(() => {
        decrease(reset);
        return () => clearInterval(interval);
    })

    function getProgressType() {
        if(breakTime) return time.work;
        return stage - 1 > 0 ? time.short : time.long;
    }

    function decrease(cb) {
        if(cont) {
            interval = setInterval(() => {
                if(left === 0){
                    if(stage === 0) {
                        clearInterval(interval);
                        return cb ? cb() : null;
                    }
                    setProgress(prev => ({
                        ...prev,
                        breakTime: !prev.breakTime,
                        total: getProgressType(),
                        left: getProgressType(),
                        stage: prev.breakTime ? prev.stage : prev.stage - 1
                    }))
                }
                if(left !== 0) setProgress(prev => ({...prev, left: prev.left - 1 }));
            }, 1000);
        }
    }

    function reset() {
        clearInterval(interval);
        setProgress({
            ...progress,
            left: time.work,
            cont: false,
            breakTime: false,
            stage: time.round
        });
    }

    function pause() {
        if(cont) {
            clearInterval(interval);
            return setProgress({...progress, cont: !cont});
        }
        setProgress({...progress, cont: !cont});
        return decrease();
    }

    const cancel = () => ipc.send("restore-main");

    return <Focus
        {...progress}
        {...props}
        reset={reset}
        pause={pause}
        cancel={cancel}
    />
}
