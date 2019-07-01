import React, {useState, useEffect} from "react";
import Start from "../../presents/views/Start";

export default function StartContain(props) {
    const [total, setTotal] = useState(10);
    const [left, setLeft] = useState(10);
    const [round, setRound] = useState(1);
    let interval = null;

    useEffect(() => {
        decrease();
    })

    function decrease(cb) {
        interval = setInterval(() => {
            if(left === 0){
                clearInterval(interval);
                interval = null;
                if(cb) return cb();
            }
            setLeft(left - 1);
        }, 1000);
    }

    function reset() {
        clearInterval(interval);
        setLeft(total);
        setRound(1);
    }

    function pause() {
        if(interval) {
            clearInterval(interval);
            interval = null;
            return;
        }
        return decrease();
    }

    return <Start
        round={round}
        reset={reset}
        pause={pause}
    />
}

// class StartContainer extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             total: 10,
//             left: 10,
//             round: 1
//         }
//     }
//
//     componentDidMount(){
//         this.subTime();
//     }
//
//     reset = () => {
//         clearInterval(this.interval);
//         const {total} = this.state;
//         this.setState({left: total, round: 1});
//     }
//
//     pause = () => {
//         if(this.interval) {
//             clearInterval(this.interval);
//             this.interval = null;
//             return;
//         }
//         return this.subTime(this.reload);
//     }
//
//     subTime = (cb) => {
//         this.interval = setInterval(() => {
//             const {left} = this.state;
//             if(left === 0){
//                 clearInterval(this.interval);
//                 this.interval = null;
//                 if(cb) return cb();
//             }
//             this.setState({left: left - 1});
//         }, 1000);
//     }
//
//     reload = () => {
//         this.setState({left: 5});
//     }
//
//     render() {
//         return <Start
//             {...this.state }
//             reset={this.reset}
//             pause={this.pause}
//         />
//     }
// }

// export default StartContainer;
