import React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import {Status, Network, EMSetup, SiteSetup, Utilities, Update, Help} from "../Pages";
import {Header} from "../common";
import {routes} from './routes';


import styles from './App.module.scss';

export const App = () => {
    return (
        <div className={styles.app}>
            <Header/>
            <main className={styles.main}>
                <Switch>
                    <Redirect exact from='/' to={routes.status}/>
                    <Route path={routes.status} component={Status}/>
                    <Route path={routes.network} component={Network}/>
                    <Route path={routes.EMSetup} component={EMSetup}/>
                    <Route path={routes.siteSetup} component={SiteSetup}/>
                    <Route path={routes.utilities} component={Utilities}/>
                    <Route path={routes.update} component={Update}/>
                    <Route path={routes.help} component={Help}/>
                </Switch>
            </main>
        </div>
    );
};