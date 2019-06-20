import React, {Component} from "react";
import Start from "../../components/views/Start";

class StartContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            total: 60,
            left: 60
        }
    }

    render() {
        return <Start {...this.state } />
    }
}

export default StartContainer;
