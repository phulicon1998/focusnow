import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import path from "../content";

const Page = (props) => (
    <Switch>
        <Route>
            <Switch>
            {
                path.map((r, i) => <Route
                    path={r.path}
                    render={() => (
                        <r.comp {...r.display} />
                    )}
                    exact = {r.exact ? r.exact: false}
                    key={i}
                />)
            }
            </Switch>
        </Route>
    </Switch>
)

export default withRouter(Page);
