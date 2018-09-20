import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "../../../../scenes/Home/home";
import Login from "../../../../scenes/Login/login";
import Edit from "../../../../scenes/Edit/edit";
import See from "../../../../scenes/See/see";
import New from "../../../../scenes/New/new";
import Autorization from "../Autorization/";


const Main = () => (
        <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/edit/:id" component = {Edit}/>
            <Route path = "/posts/:id" component = {See}/>
            <Route path = "/new" component ={ Autorization}/>
        </Switch>
);

export default Main;