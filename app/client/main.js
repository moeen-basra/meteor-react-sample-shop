// Main file for the client loading top level dependencies and Routes

import './main.html'
import {Meteor} from 'meteor/meteor'
import React from 'react'
import {render} from 'react-dom'
import {renderRoutes} from '../imports/startup/client'

import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-theme.min.css'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'

let startup = () => {
    render(renderRoutes(), document.getElementById('main'));
};

Meteor.startup(startup);