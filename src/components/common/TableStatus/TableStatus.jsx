import React from 'react';

import styles from './TableStatus.module.scss';

export const TableStatus = ({title, data}) => {
    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <div className={styles.tableRow}>
                        {data.header.map((item, index) => (
                            <div key={index} className={styles.tableCell}>{item}</div>
                        ))}
                    </div>
                </div>
                <div className={styles.tableBody}>
                    <div className={styles.tableRow}>
                        {data.body.map((item, index) => (
                            <div key={index} className={styles.tableCell}>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};