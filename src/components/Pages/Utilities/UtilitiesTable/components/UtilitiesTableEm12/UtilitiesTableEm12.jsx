// core
import React from 'react';

// components
import {server} from "../../../../../../REST";
import {Input} from './../../components'

// styles
import styles from './../../UtilitiesTable.module.scss';

const moveButtons = {
    'move0': ['GoZr0', 'GoZr1', 'GoZr2', 'GoZr3', 'GoZr4', 'GoZr5', 'GoZr6', 'GoZr7', 'GoZr8', 'GoZr9', 'GoZr10', 'GoZr11'],
    'move30': ['GoTh0', 'GoTh1', 'GoTh2', 'GoTh3', 'GoTh4', 'GoTh5', 'GoTh6', 'GoTh7', 'GoTh8', 'GoTh9', 'GoTh10', 'GoTh11'],
};
export const UtilitiesTableEm12 = ({utilities, data, disabled, model}) => {
    const buttonOne = ['Move to 0 db'];
    const buttonTwo = ['Move to -30 db'];
    for (let i = 1; i <= 12; i++) {
        buttonOne.push(String(i));
        buttonTwo.push(String(i));
    }

    const sendData = async (e) => {
        await server.getCommand({command: e.target.name});
    };


    const Column = ({row, startRow, endRow}) => {
        return (<div className={styles.tableRowWrapper}>
            <div className={styles.tableRow}>
                {row['Header'].slice(startRow, endRow).map((raw, index) => (
                    <div key={index} className={styles.tableCell}>{raw}</div>))}
            </div>
            <div className={styles.tableRow}>
                {row['Raw value'].slice(startRow, endRow).map((raw, index) => (
                    <div key={index} className={styles.tableCell}>{raw}</div>))}
            </div>
            <div className={styles.tableRow}>
                {row['Center value'].slice(startRow, endRow).map((center, index) => (
                    index === 0 ? <div key={index} className={styles.tableCell}>{center}</div> :
                        <div key={index} className={styles.tableCell}>
                            <div key={index} className={styles.inputWrapper}>
                                <Input index={index}
                                       data={data}
                                       item={center}
                                       name={'centerCalibration'}
                                       disabled={disabled}/>
                            </div>
                        </div>))}
            </div>
            <div className={styles.tableRow}>
                {buttonOne.slice(startRow, endRow).map((button, index) => (button === 'Move to 0 db' ?
                    <div key={index} className={styles.tableCell}>{button}</div> :
                    <div key={index} className={styles.tableCell}>
                        <button name={moveButtons.move0[index - 1]} type="button"
                                className={styles.primaryBtn + ' ' + styles.small}
                                onClick={(e) => sendData(e)}>Go
                        </button>
                    </div>))}
            </div>
            <div className={styles.tableRow}>
                {buttonTwo.slice(startRow, endRow).map((button, index) => (button === 'Move to -30 db' ?
                    <div key={index} className={styles.tableCell}>{button}</div> :
                    <div key={index} className={styles.tableCell}>
                        <button name={moveButtons.move30[index - 1]} type="button"
                                className={styles.primaryBtn + ' ' + styles.small}
                                onClick={(e) => sendData(e)}>Go
                        </button>
                    </div>))}
            </div>
        </div>)
    };

    return (
        <div className={styles.table}>
            {[utilities].map((row, index) => (
                <div key={index} className={`${styles.tableBody} ${model}`}>
                    <Column row={row} startRow={0} endRow={3}/>
                    <Column row={row} startRow={3} endRow={6}/>
                    <Column row={row} startRow={6} endRow={9}/>
                    <Column row={row} startRow={9} endRow={13}/>
                </div>
            ))}

        </div>
    );
};