import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../../assets/css/Layout/layout.css";

import {ReactComponent as Play} from "../../assets/icon/play.svg";
import {ReactComponent as Block} from "../../assets/icon/block.svg";
import {ReactComponent as Setting} from "../../assets/icon/setting.svg";

class AppLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setActive = (link) => this.props.location.pathname === link;

    render() {
        return (
            <div className="layout">
                <div className="navbar">
                    <Link to="/" className={this.setActive("/") ? "active" : ""}><Play/></Link>
                    <Link to="/block" className={this.setActive("/block") ? "active" : ""}><Block/></Link>
                    <Link to="/setting" className={this.setActive("/setting") ? "active" : ""}><Setting/></Link>
                </div>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AppLayout;
