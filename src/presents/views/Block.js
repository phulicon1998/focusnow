import React from "react";
import "../../assets/css/Block/block.css"
import AppLayout from "../../contains/layout/AppLayout";

import {ReactComponent as Face} from "../../assets/icon/grin.svg";
import {ReactComponent as Check} from "../../assets/icon/check.svg";
import {ReactComponent as Uncheck} from "../../assets/icon/uncheck.svg";
import {ReactComponent as Remove} from "../../assets/icon/undelete.svg";

const Empty = (list, ...props) => (
    <div className="empty">
        <Face {...props}/>
        <p> There is no blocked site</p>
    </div>
)

const Link = ({active, link}) => (
    <div className={`link ${active ? "active" : ""}`}>
        <div>
            {active ? <Check/> : <Uncheck />}
            <span> {link} </span>
        </div>
        <Remove/>
    </div>
);

const Block = ({block, unblock, list, link, ...props}) => (
    <AppLayout {...props}>
        <h3 className="block">Block sites</h3>
        <div className="siteInput">
            <input type="text" name="link" placeholder="Enter link here..." value={link}/>
        </div>
        <div className="siteList">
            {
                list.length > 0
                ? list.map((v, i) => (<Link key={i} {...v}/>))
                : <Empty />
            }
        </div>
    </AppLayout>
)

export default Block;
