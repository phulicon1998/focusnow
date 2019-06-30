import React, {Component} from "react";
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
                    <button className="active"><Play/></button>
                    <button><Block/></button>
                    <button><Setting/></button>
                </div>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AppLayout;
