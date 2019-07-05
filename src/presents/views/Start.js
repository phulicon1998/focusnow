import React from "react";
import AppLayout from "../layout/AppLayout";
import "../../assets/css/Start/start.css";

import {ReactComponent as Chrome} from "../../assets/icon/chrome.svg";
import {ReactComponent as Undo} from "../../assets/icon/undo.svg";
import {ReactComponent as Unlink} from "../../assets/icon/unlink.svg";

const Start = ({scrFocus, ...props}) => (
    <AppLayout {...props}>
        <div className="App">
            <h1 className="title">Start</h1>
            <div className="remind-start">
                <div className="remind">
                    <div className="imgRemind">
                        <Chrome/>
                        <span className="undo">
                            <Undo/>
                        </span>
                        <Unlink/>
                    </div>
                    <p className="message">Restart browser to take effect with blocked site</p>
                </div>
                <button onClick={scrFocus}>Begin focus now</button>
            </div>
        </div>
    </AppLayout>
)

export default Start;
