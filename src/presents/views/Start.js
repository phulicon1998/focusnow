import React from "react";
import AppLayout from "../layout/AppLayout";

const Start = ({scrFocus, ...props}) => (
    <AppLayout {...props}>
        <div className="App">
            <h1>Main screen</h1>
            <div>
                <button onClick={scrFocus}>Start focus</button>
            </div>
        </div>
    </AppLayout>
)

export default Start;
