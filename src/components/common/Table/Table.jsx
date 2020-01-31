import React from 'react';

import styles from './Table.module.scss';

export const Table = ({data}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                {data.map(item => {
                    if (item.type === 'input') {
                        return (
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <input type='text' className={styles.networkValue} defaultValue={item.value} readOnly/>
                            </div>)
                    } else if (item.type === 'select') {
                        return (
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <select className={styles.networkValue}>
                                    {item.value.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </select>
                            </div>)
                    } else if (item.type === 'checkbox') {
                        return (
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <div className={styles.macDns}>
                                    <div className={styles.enable}>
                                        <div className='checkbox'>
                                            <input id='enabled' type="checkbox"/>
                                            <label htmlFor='enabled'>Enabled</label>
                                        </div>
                                    </div>
                                    <div>
                                        <span>Primary:</span>
                                        <input type='text' className={styles.networkValue} defaultValue={item.primary}
                                               readOnly/>
                                    </div>
                                    <div>
                                        <span>Secondary:</span>
                                        <input type='text' className={styles.networkValue} defaultValue={item.secondary}
                                               readOnly/>

                                    </div>
                                </div>
                            </div>)
                    }
                    return null;
                })}
            </div>
        </div>

    );
};