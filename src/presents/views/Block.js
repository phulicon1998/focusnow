import React from "react";
import "../../assets/css/Block/block.css"
import AppLayout from "../../contains/layout/AppLayout";

import {ReactComponent as Face} from "../../assets/icon/face.svg";
import {ReactComponent as Check} from "../../assets/icon/check.svg";
import {ReactComponent as Uncheck} from "../../assets/icon/uncheck.svg";
import {ReactComponent as Remove} from "../../assets/icon/undelete.svg";
import {ReactComponent as Enter} from "../../assets/icon/enter.svg";

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
            <span>{active && <img src={`https://${link}/favicon.ico`} alt=""/>} {link} </span>
        </div>
        <Remove onClick={hdRemove.bind(this, id)}/>
    </div>
);

const Block = ({list, link, hdChange, hdEnter, hdAdd, hdRemove, hdActive, ...props}) => (
    <AppLayout {...props}>
        <h3 className="block">Block sites</h3>
        <div className="siteInput">
            <button className={link.length === 0 ? "empty" : ""} onClick={hdAdd}><Enter/></button>
            <input type="text" name="link" placeholder="Enter a link here..." value={link} onChange={hdChange} onKeyPress={hdEnter}/>
            <span><b>No need of "www."</b></span>
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
    </AppLayout>
)

export default Block;
