import React from "react";
import "../../assets/css/Focus/focus.css";

import {ReactComponent as Fplay} from "../../assets/icon/f_play.svg";
import {ReactComponent as Fpause} from "../../assets/icon/f_pause.svg";
import {ReactComponent as Freset} from "../../assets/icon/f_reset.svg";
import {ReactComponent as Fcancel} from "../../assets/icon/f_cancel.svg";

const Focus = ({total, left, stage, reset, pause, cancel, cont, breakTime}) => (
    <div className="container">
        <span className="round">{breakTime ? "b" : stage}</span>
        <div className="progress-box">
            <div style={{
                width: `${(left/total)*159}px`,
                backgroundColor: `${breakTime ? "#CEA791" : "#8AE9D7"}`
            }}></div>
        </div>
        <div className="control">
            <button onClick={pause} className={cont ? "pause" : "play"}>
                {cont ? <Fpause /> : <Fplay />}
            </button>
            <button onClick={reset}><Freset /></button>
        </div>
        <button className="cancel" onClick={cancel}><Fcancel /></button>
    </div>
)

export default Focus;
