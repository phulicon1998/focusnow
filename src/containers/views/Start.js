import React, {Component} from "react";
import Start from "../../components/views/Start";

class StartContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            total: 5,
            left: 5,
            round: 1
        }
    }

    componentDidMount(){
        this.subTime();
    }

    reset = () => {
        clearInterval(this.interval);
        const {total} = this.state;
        this.setState({left: total, round: 1});
    }

    pause = () => {

    }

    subTime = (cb) => {
        this.interval = setInterval(() => {
            const {left} = this.state;
            console.log(left);
            if(left === 0){
                clearInterval(this.interval);
                if(cb) return cb();
            }
            this.setState({left: left - 1});
        }, 1000);
    }

    reload = () => {
        this.setState({left: 5});
    }

    render() {
        return <Start
            {...this.state }
            reset={this.reset}
            pause={this.pause}
        />
    }
}

export default StartContainer;
