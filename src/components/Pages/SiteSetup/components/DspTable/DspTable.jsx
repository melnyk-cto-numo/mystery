// core
import React from 'react';

//styles
import styles from './DspTable.module.scss';


export const DspTable = ({fields, dspType, setDspType, disabled = true}) => {

    const handleChange = (e) => {
        setDspType(e.target.value.toLowerCase())
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableRow}>
                    <span>{fields.siteName.label}</span>
                    <input type={fields.siteName.type} className={styles.value} defaultValue={fields.siteName.value}
                           disabled={disabled}/>
                </div>
                <div className={styles.tableRow}>
                    <span>{fields.dsp.label}</span>
                    <div className={styles.select}>
                        <select value={dspType} className={styles.value} disabled={disabled}
                                onChange={(e) => handleChange(e)}
                        >
                            {fields.dsp.value.map((item, index) => (
                                <option value={item.toLowerCase()} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>)

};