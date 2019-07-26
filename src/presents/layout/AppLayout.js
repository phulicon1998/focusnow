import React from "react";
import {Link} from "react-router-dom";
import "../../assets/css/Layout/layout.css";
import "../../assets/css/Animation/animation.css";
import animate from "../../service/anControl";

import {ReactComponent as Play} from "../../assets/icon/play.svg";
import {ReactComponent as Block} from "../../assets/icon/block.svg";
import {ReactComponent as Setting} from "../../assets/icon/setting.svg";
import {ReactComponent as THide} from "../../assets/icon/title_hide.svg";
import {ReactComponent as TClose} from "../../assets/icon/title_close.svg";
import {ReactComponent as About} from "../../assets/icon/about.svg";

function doAppear(cssClass) {
    return animate() ? cssClass : "";
}

const AppLayout = ({active, minimize, ...props}) => (
    <div className="layout">
        <div className="navbar">
            <div>
                <Link to="/" className={`${active("/") ? "active" : ""} ${doAppear("start-appear")}`}>
                    <Play/>
                </Link>
                <Link to="/block" className={`${active("/block") ? "active" : ""} ${doAppear("block-appear")}`}>
                    <Block/>
                </Link>
                <Link to="/option" className={`${active("/option") ? "active" : ""} ${doAppear("option-appear")}`}>
                    <Setting/>
                </Link>
            </div>
            <button className={`${doAppear("info-appear")}`}><About/></button>
        </div>
        <div className="body">
            <div className={`titleBar ${doAppear("titleBar-appear")}`}>
                <div><span>Fyza</span></div>
                <button onClick={minimize}><THide/></button>
                <button><TClose/></button>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
)

export default AppLayout;
