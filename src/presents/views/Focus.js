import React from "react";
import "../../assets/css/Focus/focus.css";

import {ReactComponent as Fplay} from "../../assets/icon/f_play.svg";
import {ReactComponent as Fpause} from "../../assets/icon/f_pause.svg";
import {ReactComponent as Freset} from "../../assets/icon/f_reset.svg";
import {ReactComponent as Fcancel} from "../../assets/icon/f_cancel.svg";


const Focus = ({total, left, round, reset, pause, cancel}) => (
    <div className="container">
        <span className="round">5</span>
        <span className="progress-bar"></span>
        <div className="control">
            <button onClick={pause} className="play"><Fplay /></button>
            <button onClick={reset}><Freset /></button>
        </div>
        <button className="cancel" onClick={cancel}><Fcancel /></button>
    </div>
)

export default Focus;
