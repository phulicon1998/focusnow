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

    render() {
        return (
            <div className="layout">
                <div className="navbar">
                    <Link to="/" className="active"><Play/></Link>
                    <Link to="/block"><Block/></Link>
                    <Link to="/setting"><Setting/></Link>
                </div>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AppLayout;
