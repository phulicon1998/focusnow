import React from "react";
import "../../assets/css/Focus/focus.css";

const Focus = ({total, left, round, reset, pause, cancel}) => (
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
                <button onClick={cancel}>Cancel</button>
            </div>
        </div>
    </div>
)

export default Focus;
