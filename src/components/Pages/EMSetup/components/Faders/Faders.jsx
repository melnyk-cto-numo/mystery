import React from 'react';

import styles from './Faders.module.scss';

export const Faders = ({data, disabled = true}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableBody}>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCell}>{data.header[0]}</div>
                        {data.body.map((item, index) => (
                            <div key={index} className={styles.tableCell}>{item.location}</div>
                        ))}
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCell}>{data.header[1]}</div>
                        {data.body.map((item, index) => (
                            <select key={index} className={styles.tableCell} disabled={disabled}>
                                {item.mute.map((mute, index) => (
                                    <option key={index}>{mute}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCell}>{data.header[2]}</div>
                        {data.body.map((item, index) => (
                            <select key={index} className={styles.tableCell} disabled={disabled}>
                                {item.signal.map((signal, index) => (
                                    <option key={index}>{signal}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCell}>{data.header[3]}</div>
                        {data.body.map((item, index) => (
                            <select key={index} className={styles.tableCell} disabled={disabled}>
                                {item.highGain.map((highGain, index) => (
                                    <option key={index}>{highGain}</option>
                                ))}
                            </select>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};