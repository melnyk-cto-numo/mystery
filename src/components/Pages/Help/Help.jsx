import React from 'react';
import {Button} from "../../common";

import styles from './Help.module.scss';

export const Help = () => {
    return (
        <section className={styles.help}>
            <div className={styles.helpTitle}>
                <h2>Help</h2>
                <Button text='Help File'/>
            </div>
            <div className={styles.helpInner}>
                <h3>Contact information:</h3>

                <ul className={[styles.helpList + ' ' + styles.map]}>
                    <li>6438 Morton Road</li>
                    <li>Greenbrier, TN 37073</li>
                </ul>

                <ul className={[styles.helpList + ' ' + styles.telephone]}>
                    <li>800 798 2256<span>sales</span></li>
                    <li>615 643 8460<span>support</span></li>
                    <li>615 643 8464<span>fax</span></li>
                </ul>

            </div>
        </section>
    );
};