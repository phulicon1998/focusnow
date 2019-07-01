import React from "react";
import "../../assets/css/Start/start.css";
import AppLayout from "../layout/AppLayout";

const Start = ({total, left, round, reset, pause}) => (
    <AppLayout>
        <div className="App">
            <h1>Focusing...</h1>
            <div className="container">
                <p>Rounds: {round}</p>
                <div className="timeBox">
                    <div style={{width: `${left/total*100}%`}}></div>
                </div>
                <div className="btnBar">
                    <button onClick={reset}>Reset</button>
                    <button onClick={pause}>Pause</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    </AppLayout>
)

export default Start;
