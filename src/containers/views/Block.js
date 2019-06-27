import React, {Component} from "react";
import Block from "../../components/views/Block";

class BlockContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }


    render() {
        return <Block />
    }
}

export default BlockContainer;
