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

const AppLayout = ({active, minimize, ...props}) => (
    <div className="layout">
        <div className="navbar">
            <div>
                <Link to="/" className={active("/") ? "active" : ""}>
                    <Play/>
                </Link>
                <Link to="/block" className={active("/block") ? "active" : ""}>
                    <Block/>
                </Link>
                <Link to="/option" className={active("/option") ? "active" : ""}>
                    <Setting/>
                </Link>
            </div>
            <button onClick={minimize}><About/></button>
        </div>
        <div className="body">
            <div className="titleBar">
                <div><span>Fyza</span></div>
                <button><THide/></button>
                <button><TClose/></button>
            </div>
            {props.children}
        </div>
    </div>
)

export default AppLayout;
