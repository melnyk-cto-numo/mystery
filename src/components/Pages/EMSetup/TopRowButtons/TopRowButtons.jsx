import React from 'react';

import styles from './TopRowButtons.module.scss';


const title = {
    header: ['Buttons', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    column: ['Type', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
};

export const TopRowButtons = ({data}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    {title.header.map((item, index) => (
                        <div key={index} className={styles.tableCell}>{item}</div>
                    ))}
                </div>
                <div className={styles.tableBody}>
                    {data.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
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