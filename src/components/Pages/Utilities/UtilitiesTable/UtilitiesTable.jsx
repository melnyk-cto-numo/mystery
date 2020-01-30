import React from 'react';

import styles from './UtilitiesTable.module.scss';
import {Button} from "../../../common";


export const UtilitiesTable = ({data, title}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    {title.header.map((item, index) => (
                        <div key={index} className={styles.tableCell}>{item}</div>
                    ))}
                </div>
                <div className={styles.tableBody}>
                    <div className={styles.tableRow}>
                        {title.column.map((column, index) => (
                            <div key={index} className={styles.tableCell}>{column}</div>
                        ))}
                    </div>
                    {data.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.tableCell}>{item.type}</div>
                            {item.buttons.map((button, index) => (
                                <div key={index} className={styles.tableCell}>
                                    {button ? <Button text={'Go'} small/> : <Button empty/>}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};