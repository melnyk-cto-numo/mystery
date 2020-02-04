import React from 'react';

import styles from './TableStatus.module.scss';

export const TableStatus = ({title, data}) => {
    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.table}>
                <div className={styles.tableBody}>
                    <div className={styles.tableRow}>
                        {data.body.map((item, index) => (
                            <div key={index} className={styles.tableCell}>
                                <div className={styles.tableCell}>{data.header[index]}</div>
                                <div className={styles.tableCell}>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};