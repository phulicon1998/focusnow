import React from "react";

const Main = ({start, block}) => (
    <div className="App">
        <h1>Main screen</h1>
        <div>
            <button onClick={start}>Start focus</button>
        </div>
        <div>
            <button onClick={block}>Block site</button>
        </div>
    </div>
)

export default Main;
