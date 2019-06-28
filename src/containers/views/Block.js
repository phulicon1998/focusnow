import React, {Component} from "react";
import Block from "../../components/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

class BlockContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    hdBlock = () => {
        ipc.send("begin-block");
    }

    hdUnBlock = () => {
        ipc.send("stop-block");
    }

    render() {
        return <Block
            block={this.hdBlock}
            unblock={this.hdUnBlock}
        />
    }
}

export default BlockContainer;
