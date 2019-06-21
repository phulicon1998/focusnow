import React, {Component} from "react";
import Start from "../../components/views/Start";

class StartContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            total: 10,
            left: 10,
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
        if(this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            return;
        }
        return this.subTime(this.reload);
    }

    subTime = (cb) => {
        this.interval = setInterval(() => {
            const {left} = this.state;
            if(left === 0){
                clearInterval(this.interval);
                this.interval = null;
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
