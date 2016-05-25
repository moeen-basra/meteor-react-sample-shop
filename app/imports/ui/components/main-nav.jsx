import React from 'react';
import {Link} from 'react-router'

import CartNav from './cart-nav.jsx'
export const MainNav = () => (<nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand" >Sample Cart</Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
                <li className="pull-right">
                    <CartNav />
                </li>
            </ul>
        </div>
    </div>
</nav>);