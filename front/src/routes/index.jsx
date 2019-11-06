import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./../screens/login";
import Chats from "./../screens/chats";

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/chats" component={Chats} />
  </Switch>
);

export default Routes;
