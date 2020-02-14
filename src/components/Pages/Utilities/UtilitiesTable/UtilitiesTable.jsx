// core
import React from 'react';

// components
import {server} from "../../../../REST";

// styles
import styles from './UtilitiesTable.module.scss';

const moveButtons = {
    'move0': ['GoZr0', 'GoZr1', 'GoZr2', 'GoZr3', 'GoZr4', 'GoZr5', 'GoZr6', 'GoZr7', 'GoZr8', 'GoZr9', 'GoZr10', 'GoZr11'],
    'move30': ['GoTh0', 'GoTh1', 'GoTh2', 'GoTh3', 'GoTh4', 'GoTh5', 'GoTh6', 'GoTh7', 'GoTh8', 'GoTh9', 'GoTh10', 'GoTh11'],
};


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

    const sendData = async (e) => {
        await server.getCommand({command: e.target.name});
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
                                <div key={index} className={styles.tableCell}>
                                    <button name={moveButtons.move0[index - 1]} type="button"
                                            className={styles.primaryBtn + ' ' + styles.small}
                                            onClick={(e) => sendData(e)}>Go
                                    </button>
                                </div>))}
                        </div>
                        <div className={styles.tableRow}>
                            {buttonTwo.map((button, index) => (button === 'Move to -30 db' ?
                                <div key={index} className={styles.tableCell}>{button}</div> :
                                <div key={index} className={styles.tableCell}>
                                    <button name={moveButtons.move30[index - 1]} type="button"
                                            className={styles.primaryBtn + ' ' + styles.small}
                                            onClick={(e) => sendData(e)}>Go
                                    </button>
                                </div>))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};