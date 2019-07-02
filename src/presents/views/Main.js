import React from "react";
import AppLayout from "../layout/AppLayout";

const Main = ({scrFocus}) => (
    <AppLayout>
        <div className="App">
            <h1>Main screen</h1>
            <div>
                <button onClick={scrFocus}>Start focus</button>
            </div>
        </div>
    </AppLayout>
)

export default Main;
