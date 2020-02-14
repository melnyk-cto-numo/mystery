// core
import React from 'react';

// components
import {server} from "../../../REST";

// styles
import styles from './TableSmall.module.scss';

export const TableSmall = ({fields, disabled = true}) => {

    const sendData = async (e) => {
        await server.getCommand({command: e.target.name});
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                {fields.map(field => {
                    if (field.type === 'select') {
                        return (
                            <div key={field.id} className={styles.tableRow}>
                                <span>{field.label}</span>
                                <div className={styles.select}>
                                    <select className={styles.value} disabled={disabled}>
                                        {field.value.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>)
                    } else if (field.type === 'button') {
                        return (
                            <div key={field.id} className={styles.tableRow}>
                                <span>{field.label}</span>
                                <button name={field.name} type="button"
                                        className={styles.primaryBtn + ' ' + styles.small}
                                        onClick={(e) => sendData(e)}>{field.value}</button>
                            </div>)
                    } else {
                        return (
                            <div key={field.id} className={styles.tableRow}>
                                <span>{field.label}</span>
                                <input type={field.type} className={styles.value} defaultValue={field.value}
                                       disabled={disabled}/>
                            </div>)
                    }
                })}
            </div>
        </div>)
};