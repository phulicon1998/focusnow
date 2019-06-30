import React from "react";
import AppLayout from "../layout/AppLayout";

const Main = ({start, block}) => (
    <AppLayout>
        <div className="App">
            <h1>Main screen</h1>
            <div>
                <button onClick={start}>Start focus</button>
            </div>
            <div>
                <button onClick={block}>Block site</button>
            </div>
        </div>
    </AppLayout>
)

export default Main;
