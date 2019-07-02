import React from "react";
import AppLayout from "../layout/AppLayout";

const Block = ({block, unblock}) => (
    <AppLayout>
        <div>
            <h1>This is block screen</h1>
            <button onClick={block}>Click here to start block</button>
            <button onClick={unblock}>Click here to unblock</button>
        </div>
    </AppLayout>
)

export default Block;
