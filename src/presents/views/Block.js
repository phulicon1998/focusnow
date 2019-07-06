import React from "react";
import "../../assets/css/Block/block.css"
import AppLayout from "../../contains/layout/AppLayout";

const Block = ({block, unblock, ...props}) => (
    <AppLayout {...props}>
        <h3 className="block">Block sites</h3>
        <div className="siteInput">
            <input type="text" placeholder="Enter link here..."/>
        </div>
        <div className="siteList">

        </div>
        {/* <button onClick={block}>Click here to start block</button>
        <button onClick={unblock}>Click here to unblock</button> */}
    </AppLayout>
)

export default Block;
