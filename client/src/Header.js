import React from 'react';
import { Link } from 'react-router-dom';

import "./Header.css"

export const Header = () => {
    return(
        <div id="header">
            <div id="header-link">
                <Link to='/'>Top</Link>
            </div>
            <div id="title-container">
                <h1>Super Discount Bros.</h1>
            </div>
            <div id="header-space"></div>
        </div>
    )
}
