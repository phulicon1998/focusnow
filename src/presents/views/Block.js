import React from "react";
import "../../assets/css/Block/block.css"
import AppLayout from "../../contains/layout/AppLayout";

import {ReactComponent as Face} from "../../assets/icon/grin.svg";
import {ReactComponent as Check} from "../../assets/icon/check.svg";
import {ReactComponent as Uncheck} from "../../assets/icon/uncheck.svg";
import {ReactComponent as Remove} from "../../assets/icon/undelete.svg";

const Empty = ({list, ...props}) => (
    <div className="empty">
        <Face {...props}/>
        <p> There is no blocked site</p>
    </div>
)

const Link = ({active, link, id, hdRemove, hdActive}) => (
    <div className={`link ${active ? "active" : ""}`}>
        <div onClick={hdActive.bind(this, id)}>
            {active ? <Check/> : <Uncheck />}
            <span>www.{link} </span>
        </div>
        <Remove onClick={hdRemove.bind(this, id)}/>
    </div>
);

const Block = ({block, unblock, list, link, hdChange, hdAdd, hdRemove, hdActive, ...props}) => (
    <AppLayout {...props}>
        <h3 className="block">Block sites</h3>
        <div className="siteInput">
            <button onClick={hdAdd}>Add</button>
            <input type="text" name="link" placeholder="Enter a link here..." value={link} onChange={hdChange}/>
        </div>
        <div className="siteList">
            {
                list.length > 0
                ? list.map((v, i) => (
                    <Link
                        {...v}
                        key={i}
                        hdRemove={hdRemove}
                        hdActive={hdActive}
                    />
                ))
                : <Empty />
            }
        </div>
        {/* <button onClick={block}>Block</button> */}
        <button onClick={unblock}>Unblock</button>
    </AppLayout>
)

export default Block;
