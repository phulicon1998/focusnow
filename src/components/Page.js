import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import Home from "./views/Home";
import Start from "./views/Start";

const Page = (props) => (
    <Switch>
        <Route>
            <Switch>
                <Route path="/start" component={Start}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </Route>
    </Switch>
)

export default withRouter(Page);
