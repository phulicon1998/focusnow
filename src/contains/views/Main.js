import React from "react";
import Main from "../../presents/views/Main";

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

// class MainContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//
//     startFocus = () => {
//         ipc.send("start-focus");
//     }
//
//     blockSite = () => {
//         ipc.send("block-site");
//     }
//
//     render() {
//         return <Main
//             block={this.blockSite}
//             start={this.startFocus}
//         />
//     }
// }
//
// export default MainContainer;

export default function MainContain(props){
    const scrFocus = () => ipc.send("start-focus");
    return <Main scrFocus={scrFocus}/>
}
