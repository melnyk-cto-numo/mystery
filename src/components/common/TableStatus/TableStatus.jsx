import React from 'react';

import styles from './TableStatus.module.scss';

let fields = [];
export const TableStatus = ({title, header, data}) => {
    if (data === undefined) {
        return false;
    }
    if (title === 'EasyMix Details') {
        fields = [data.model, data.MyIP, data.connectionStatus, data.connectionInfo];
    } else if ('DSP Details') {
        fields = [data.dspType, data.Ping, data.Loop];
    }

    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>
            <div className={styles.table}>
                <div className={styles.tableBody}>
                    {header.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.tableCell}>{item}</div>
                            <div className={styles.tableCell}>{fields[index]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};