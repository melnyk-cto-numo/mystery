import React, {useState} from 'react';

import {Link} from 'react-router-dom';

import {MenuItem} from "./MenuItem/MenuItem";


import logo from '../../../assets/img/logo_white.png'
import styles from './Header.module.scss';

export const Header = () => {

    const [active, setActive] = useState(false);
    const addClass = () => {
        setActive(!active);
    };

    return (
        <header className={styles.headerWrapper}>
            <button type='button' className={active ? [styles.burgerMenu + ' ' + styles.active] : styles.burgerMenu}
                    onClick={() => addClass()}>
                <span className={styles.burgerMenuLines}/>
            </button>
            <div className={active ? [styles.header + ' ' + styles.active] : styles.header}>
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
            </div>
        </header>
    );
};