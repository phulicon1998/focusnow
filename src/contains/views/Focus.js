import React, {useState, useEffect} from "react";
import Focus from "../../presents/views/Focus";

const electron = window.require("electron");
const ipc = electron.ipcRenderer;

export default function FocusContain(props) {
    let [time, setTime] = useState();
    let [progress, setProgress] = useState({
        total: 0,
        left: 0,
        stage: 0,
        cont: false,
        breakTime: false
    });
    let {left, cont, breakTime, stage} = progress;
    let interval;

    useEffect(() => {
        let isLoad = false;
        ipc.send("get-focus");
        if(!isLoad) {
            ipc.on("load-focus", (e, data) => {
                if(!isLoad) setTime(data)
            });
        };
        return () => isLoad = true;
    }, []);

    ipc.on("toggle-focus", pause);
    ipc.on("reset-focus", reset);
    ipc.on("cancel-focus", cancel);

    useEffect(() => {
        let isLoad = false;
        if(!isLoad && time){
            setProgress(prev => ({
                ...prev,
                total: time.work,
                left: time.work,
                stage: time.round,
                cont: true
            }))
        }
        return () => isLoad = true;
    }, [time]);

    useEffect(() => {
        decrease(reset);
        return () => clearInterval(interval);
    });

    function decrease(cb) {
        if(cont) {
            interval = setInterval(() => {
                if(left === 0){
                    if(stage === 0) {
                        ipc.send("finish");
                        clearInterval(interval);
                        return cb ? cb() : null;
                    }
                    if(!breakTime) ipc.send("break-time");
                    setProgress(prev => ({
                        ...prev,
                        breakTime: !prev.breakTime,
                        total: getProgressType(),
                        left: getProgressType(),
                        stage: prev.breakTime ? prev.stage : prev.stage - 1
                    }))
                }
                if(stage !== time.round && left === time.work && !breakTime) ipc.send("work-time");
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

    function getProgressType() {
        if(breakTime) return time.work;
        return stage - 1 > 0 ? time.short : time.long;
    }

    function pause() {
        if(cont) {
            clearInterval(interval);
            return setProgress({...progress, cont: !cont});
        }
        setProgress({...progress, cont: !cont});
        return decrease();
    }

    function cancel() {
        ipc.send("clear-block");
        ipc.send("restore-main");
    };

    function changeProgressColor() {
        if(cont && breakTime) return "#CEA791";
        if(cont && !breakTime) return "#8AE9D7";
        return "#a7a7a7";
    }

    return <Focus
        {...progress}
        {...props}
        reset={reset}
        pause={pause}
        cancel={cancel}
        changeProgressColor={changeProgressColor}
    />
}
