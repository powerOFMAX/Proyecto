import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "../../../../scenes/Home/home";
import Login from "../../../../scenes/Login/login";
import Edit from "../../../../scenes/Edit/edit";
import See from "../../../../scenes/See/see";

const Main = () => (
        <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/edit" component = {Edit}/>
            <Route path = "/posts/:id" component = {See}/>
        </Switch>
);

export default Main;