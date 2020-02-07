import React from 'react';

import styles from './TableStatus.module.scss';

export const TableStatus = ({title, header, data}) => {
    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.table}>
                <div className={styles.tableBody}>
                    {header.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.tableCell}>{item}</div>
                            <div className={styles.tableCell}>{data[index]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};