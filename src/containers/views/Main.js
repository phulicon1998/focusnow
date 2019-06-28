import React, {Component} from "react";
import Main from "../../components/views/Main";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    startFocus = () => {
        ipcRenderer.send("start-focus");
    }

    blockSite = () => {
        ipcRenderer.send("block-site");
    }

    render() {
        return <Main
            block={this.blockSite}
            start={this.startFocus}
        />
    }
}

export default MainContainer;
