import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "../../../../scenes/Home/home";
import Login from "../../../../scenes/Login/login";
import Edit from "../../../../scenes/Edit/edit";
import See from "../../../../scenes/See/see";
import New from "../../../../scenes/New/new";
import Autorization from "../Autorization/";

const Main = () => (
    <Switch id="content">
        <Route exact path = "/" component = {Autorization(Home, [])}/>
        <Route path = "/login" component = {Autorization(Login, [])}/>
        <Route path = "/posts/:id" component = {Autorization (See, [])}/>
        <Route path = "/edit/:id" component = {Autorization (Edit, ['ADMIN'])}/>
        <Route path = "/new" component ={ Autorization(New, ['ADMIN'])}/>
    </Switch>
);

export default Main;