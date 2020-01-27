import React from 'react';

import {Link} from 'react-router-dom';

import {MenuItem} from "./MenuItem/MenuItem";


import logo from '../../img/logo.png'
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/status" className={styles.logo}>
                <div className={styles.logoText}>
                    <h1>MYSTERY</h1>
                    <p>Electronics.LLC</p>
                </div>
                <img src={logo} alt="mystery" className={styles.logoImage}/>
            </Link>
            <menu className={styles.headerMenu}>
                <ul className={styles.headerList}>
                    <MenuItem/>
                </ul>
            </menu>
        </header>
    );
};