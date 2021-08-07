import React from "react";
import Home from "../Design/Home";
import Application from "../Design/Application";
import { Route, Switch} from 'react-router-dom';
const Router=()=>{
    return(
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/application' exact component={Application} />
        </Switch>
    )
}
export default Router;