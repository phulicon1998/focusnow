import React from "react";

const Block = ({block, unblock}) => (
    <div>
        <h1>This is block screen</h1>
        <button onClick={block}>Click here to start block</button>
        <button onClick={unblock}>Click here to unblock</button>
    </div>
)

export default Block;
