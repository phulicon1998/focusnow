import React from "react";
import {Link} from "react-router-dom";
import "../../assets/css/Layout/layout.css";
import "../../assets/css/Animation/animation.css";

import {ReactComponent as Play} from "../../assets/icon/play.svg";
import {ReactComponent as Block} from "../../assets/icon/block.svg";
import {ReactComponent as Setting} from "../../assets/icon/setting.svg";
import {ReactComponent as THide} from "../../assets/icon/title_hide.svg";
import {ReactComponent as TClose} from "../../assets/icon/title_close.svg";
import {ReactComponent as About} from "../../assets/icon/about.svg";

const AppLayout = ({formLink, minimize, appear, close, ...props}) => (
    <div className="layout">
        <div className="navbar">
            <div>
                <Link to="/" className={formLink("start-appear", "/")}>
                    <Play/>
                </Link>
                <Link to="/block" className={formLink("block-appear", "/block")}>
                    <Block/>
                </Link>
                <Link to="/option" className={formLink("option-appear", "/option")}>
                    <Setting/>
                </Link>
            </div>
            <button className={`${appear("info-appear")}`}><About/></button>
        </div>
        <div className="body">
            <div className={`titleBar ${appear("titleBar-appear")}`}>
                <div><span>Fyza</span></div>
                <button onClick={minimize}><THide/></button>
                <button onClick={close}><TClose/></button>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    </div>
)

export default AppLayout;
