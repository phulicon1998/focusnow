import React from "react";
import AppLayout from "../../contains/layout/AppLayout";

const Block = ({block, unblock, ...props}) => (
    <AppLayout {...props}>
        <h1>This is block screen</h1>
        <button onClick={block}>Click here to start block</button>
        <button onClick={unblock}>Click here to unblock</button>
    </AppLayout>
)

export default Block;
