import React, {Component} from "react";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Home extends Component {
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
        return (
            <div className="App">
                <h1>Home page</h1>
                <button onClick={this.handleClick}>Click to start focus</button>
                <button onClick={this.blockSite}>Click to block site</button>
            </div>
        )
    }
}

export default Home;
