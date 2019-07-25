import React from "react";
import "../../assets/css/Start/start.css";
import AppLayout from "../../contains/layout/AppLayout";
import {ReactComponent as Chrome} from "../../assets/icon/chrome.svg";
import {ReactComponent as Undo} from "../../assets/icon/undo.svg";
import {ReactComponent as Unlink} from "../../assets/icon/unlink.svg";

const Start = ({scrFocus, ...props}) => (
    <AppLayout {...props}>
        <h1 className="title">Start</h1>
        <div className="remind">
            <div>
                <Chrome/>
                <span><Undo/></span>
                <Unlink/>
            </div>
            <p>Please restart browser to take effect with blocked site</p>
        </div>
        <div className="btnStart">
            <button onClick={scrFocus}>Begin focus now</button>
        </div>
    </AppLayout>
)

export default Start;
