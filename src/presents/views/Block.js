import React from "react";
import "../../assets/css/Block/block.css"
import AppLayout from "../../contains/layout/AppLayout";

import {ReactComponent as Grin} from "../../assets/icon/grin.svg";
import {ReactComponent as Check} from "../../assets/icon/check.svg";
import {ReactComponent as UnCheck} from "../../assets/icon/uncheck.svg";
import {ReactComponent as Remove} from "../../assets/icon/delete.svg";
import {ReactComponent as UnRemove} from "../../assets/icon/undelete.svg";

const Notify = (list, ...props) => (
    <div className="notify">
        <Grin {...props}/>
        <p> {`${list===[]} ? 'There is no blocked site'`} </p>
    </div>
)

const CRD = () => (
    <div className="blockSite">
        <Check/>
        <span> https://jsfiddle.net </span>
        <Remove/>
    </div>
);

const CRDs = () => (
    <div className="blockSite">
        <UnCheck/>
        <span> https://jsfiddle.net </span>
        <UnRemove/>
    </div>
);

const Block = ({block, unblock, ...props}) => (
    <AppLayout {...props}>
        <h3 className="block">Block sites</h3>
        <div className="siteInput">
            <input type="text" placeholder="Enter link here..."/>
        </div>
        <div className="siteList">
            <CRD/>
            <CRDs/>
        </div>
        {/* <button onClick={block}>Click here to start block</button>
        <button onClick={unblock}>Click here to unblock</button> */}
    </AppLayout>
)

export default Block;
