import React from 'react';

import styles from './Faders.module.scss';

export const Faders = ({data}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    {data.header.map((item, index) => (
                        <div key={index} className={styles.tableCell}>{item}</div>
                    ))}
                </div>
                <div className={styles.tableBody}>
                    {data.body.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.tableCell}>{item.location}</div>
                            <select className={styles.tableCell}>
                                {item.fader.map((fader, index) => (
                                    <option key={index}>{fader}</option>
                                ))}
                            </select>
                            <select className={styles.tableCell}>
                                {item.mute.map((mute, index) => (
                                    <option key={index}>{mute}</option>
                                ))}
                            </select>
                            <select className={styles.tableCell}>
                                {item.signal.map((signal, index) => (
                                    <option key={index}>{signal}</option>
                                ))}
                            </select>
                            <select className={styles.tableCell}>
                                {item.highGain.map((highGain, index) => (
                                    <option key={index}>{highGain}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};