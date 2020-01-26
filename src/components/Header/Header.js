import React from 'react';

import logo from '../../img/logo.png'
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.logoText}>
                    <h1>MYSTERY</h1>
                    <p>Electronics.LLC</p>
                </div>
                <img src={logo} alt="mystery" className={styles.logoImage}/>
            </div>

            <menu className={styles.headerMenu}>
                <ul className={styles.headerList}>
                    <li>Status</li>
                    <li>Network</li>
                    <li>EM Setup</li>
                    <li>Site Setup</li>
                    <li>Utilities</li>
                    <li>Update</li>
                    <li>Help</li>
                </ul>
            </menu>
        </header>
    );
};