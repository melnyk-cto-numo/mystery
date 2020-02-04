import React from 'react';

import styles from './TopRowButtons.module.scss';


export const TopRowButtons = ({data, title}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                </div>
                <div className={styles.tableBody}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.tableCell}>{title.header[index]}</div>
                            <div className={styles.tableCell}>{item.type}</div>
                            {item.levels.map((levels, index) => (
                                <div key={index} className={styles.tableCell}>{levels}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};