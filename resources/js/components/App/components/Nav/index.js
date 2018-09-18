import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => (
        <div className = "navbar">
                <Link to = "/"> Home </Link>
                <Link to = "/login"> Login In </Link> 
        </div>
);
export default NavBar;