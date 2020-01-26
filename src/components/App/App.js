import React from 'react';
import styles from './App.module.scss';
import {Header} from "..";

export const App = () => {
    return (
        <div className={styles.app}>
            <Header/>
            <main className={styles.main}>
                section 1
            </main>
        </div>
    );
};