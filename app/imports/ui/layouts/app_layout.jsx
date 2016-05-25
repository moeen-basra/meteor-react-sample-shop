// this is the main layout for the app loading header navigation and alert

import React from 'react'
import {MainNav} from '../components/main-nav.jsx'

import Alert from 'react-s-alert';

export const AppLayout= ( { children, location } ) => (
    <div>
        <Alert stack={{limit: 6}} html={true} effect='genie' position='bottom-right' />        
        <MainNav />
        {children}
    </div>
);