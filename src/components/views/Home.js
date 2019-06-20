import React, {Component} from "react";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClick = () => {
        ipcRenderer.send("start-focus");
    }

    render() {
        return (
            <div className="App">
                <h1>Home page</h1>
                <button onClick={this.handleClick}>Click to start focus</button>
            </div>
        )
    }
}

export default Home;
