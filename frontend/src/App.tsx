import * as React from "react";
import {} from "reactstrap";
import { Route, Switch } from "react-router";
import RegCreate from "./RegCreate";
import RegRegister from "./RegRegister";
import { Link } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <nav>
                        <ul>
                            <li><Link to="/">Index</Link></li>
                            <li><Link to="/create">Create an event</Link></li>
                            <li><Link to="/register">Register to event</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="main">
                    <Switch>
                        <Route exact={true} path="/create" component={RegCreate} />
                        <Route exact={true} path="/register" component={RegRegister} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
