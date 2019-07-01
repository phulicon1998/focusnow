import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import path from "../content";

const Page = (props) => (
    <Switch>
        <Route>
            <Switch>
                { path.map(r => <Route {...r}/>) }
            </Switch>
        </Route>
    </Switch>
)

export default withRouter(Page);
