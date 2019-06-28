import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import MainContainer from "../containers/views/Main";
import StartContainer from "../containers/views/Start";
import BlockContainer from "../containers/views/Block";

const Page = (props) => (
    <Switch>
        <Route>
            <Switch>
                <Route path="/start" component={StartContainer}/>
                <Route path="/block" component={BlockContainer}/>
                <Route exact path="/" component={MainContainer}/>
            </Switch>
        </Route>
    </Switch>
)

export default withRouter(Page);
