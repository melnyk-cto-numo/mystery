import React from 'react';

import styles from './UtilitiesTable.module.scss';
import {Button} from "../../../common";

export const UtilitiesTable = ({data, title}) => {
    const buttonOne = ['Move to 0 db'];
    const buttonTwo = ['Move to -30 db'];
    for (let i = 1; i <= 12; i++) {
        buttonOne.push(String(i));
        buttonTwo.push(String(i));
    }


    if (data.rawFader === undefined) {
        return false;
    }
    const utilities = {
        'Raw value': ['Raw value', ...data.rawFader],
        'Left value': ['Left value', ...data.leftCalibration],
        'Right value': ['Right value', ...data.rightCalibration],
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    {title.header.map((item, index) => (
                        <div key={index} className={styles.tableCell}>{item}</div>
                    ))}
                </div>
                {[utilities].map((row, index) => (
                    <div key={index} className={styles.tableBody}>
                        <div className={styles.tableRow}>
                            {row['Raw value'].map((raw, index) => (
                                <div key={index} className={styles.tableCell}>{raw}</div>))}
                        </div>
                        <div className={styles.tableRow}>
                            {row['Raw value'].map((left, index) => (
                                <div key={index} className={styles.tableCell}>{left}</div>))}
                        </div>
                        <div className={styles.tableRow}>
                            {row['Raw value'].map((right, index) => (
                                <div key={index} className={styles.tableCell}>{right}</div>))}
                        </div>
                        <div className={styles.tableRow}>
                            {buttonOne.map((button, index) => (button === 'Move to 0 db' ?
                                <div key={index} className={styles.tableCell}>{button}</div> :
                                <div key={index} className={styles.tableCell}><Button text={'Go'} small/></div>))}
                        </div>
                        <div className={styles.tableRow}>
                            {buttonTwo.map((button, index) => (button === 'Move to -30 db' ?
                                <div key={index} className={styles.tableCell}>{button}</div> :
                                <div key={index} className={styles.tableCell}><Button text={'Go'} small/></div>))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};