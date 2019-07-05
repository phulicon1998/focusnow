import React from 'react';
import { Route, Switch, withRouter} from "react-router-dom";
import path from "../content";

const Page = (props) => {
    return (
    <Switch>
        <Route>
            <Switch>
            {
                path.map((r, i) => <Route
                    path={r.path}
                    render={(subProps) => (
                        <r.comp {...props} {...r.display} />
                    )}
                    exact = {r.exact ? r.exact: false}
                    key={i}
                />)
            }
            </Switch>
        </Route>
    </Switch>
)}

export default withRouter(Page);
