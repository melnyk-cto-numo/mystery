import React from 'react';

import styles from './Table.module.scss';

export const Table = ({data, disabled = true}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                {data.map(item => {
                    if (item.type === 'input') {
                        return (
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <input type='text' className={styles.networkValue} defaultValue={item.value}
                                       disabled={item.title === 'Mac Address' ? 'disabled' : disabled}/>
                            </div>)
                    } else if (item.type === 'select') {
                        return (
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <div className={styles.select}>
                                    <select className={styles.networkValue} disabled={disabled}>
                                        {item.value.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>)
                    } else if (item.type === 'checkbox') {
                        return (
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <div className={styles.macDns}>
                                    <div className={styles.enable}>
                                        <div className='checkbox'>
                                            <input id='enabled' type="checkbox" disabled={disabled}/>
                                            <label htmlFor='enabled'>Enabled</label>
                                        </div>
                                    </div>
                                    <div>
                                        <span>Primary:</span>
                                        <input type='text' className={styles.networkValue} defaultValue={item.primary}
                                               disabled={disabled}/>
                                    </div>
                                    <div>
                                        <span>Secondary:</span>
                                        <input type='text' className={styles.networkValue} defaultValue={item.secondary}
                                               disabled={disabled}/>

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