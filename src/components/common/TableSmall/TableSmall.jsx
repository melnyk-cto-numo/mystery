// core
import React from 'react';

// components
import {Button} from "..";

// styles
import styles from './TableSmall.module.scss';

export const TableSmall = ({fields, setIndicator}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>


                {fields.map(field => {
                    if (field.type === 'select') {
                        return (
                            <div key={field.id} className={styles.tableRow}>
                                <span>{field.label}</span>
                                <select className={styles.value} onChange={(e) => setIndicator(e.target.selectedIndex)}>
                                    {field.value.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </select>
                            </div>)
                    } else if (field.type === 'button') {
                        return (
                            <div key={field.id} className={styles.tableRow}>
                                <span>{field.label}</span>
                                <Button text={field.value} small/>
                            </div>)
                    } else {
                        return (
                            <div key={field.id} className={styles.tableRow}>
                                <span>{field.label}</span>
                                <input type={field.type} className={styles.value} defaultValue={field.value} readOnly/>
                            </div>)
                    }
                })}


            </div>
        </div>

    );
};