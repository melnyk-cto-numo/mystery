// core
import React from 'react';

// library
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

// components
import {Status, Network, EMSetup, SiteSetup, Utilities, Update, Help} from "../Pages";
import {Header} from "../common";
import {routes} from './routes';
import {getShowPopup} from "../../bus/mystery/selectors";


import spinner from '../../assets/img/spinner.svg'
import styles from './App.module.scss';

export const App = () => {
    const popup = useSelector(getShowPopup);
    const show = popup.mystery.show;
    return (
        <div className={styles.app}>
            <Header/>
            <main className={styles.main}>
                <div className={show ? [styles.loadingWrapper + ' ' + styles.show] : styles.loadingWrapper}>
                    <img src={spinner} alt="" className={styles.loading}/>
                </div>
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