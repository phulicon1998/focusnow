import React, {useState} from "react";
import Block from "../../presents/views/Block";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

// class BlockContainer extends Component {
//
//     constructor(props){
//         super(props);
//         this.state = {
//             list: []
//         }
//     }
//
//     hdBlock = () => {
//         ipc.send("begin-block");
//     }
//
//     hdUnBlock = () => {
//         ipc.send("stop-block");
//     }
//
//     render() {
//         return <Block
//             block={this.hdBlock}
//             unblock={this.hdUnBlock}
//         />
//     }
// }

// export default BlockContainer;

export default function BlockContain(props) {
    const [list, setList] = useState([]);

    const block = () => ipc.send("begin-block");
    const unblock = () => ipc.send("stop-block");

    return <Block block={block} unblock={unblock}/>
}
