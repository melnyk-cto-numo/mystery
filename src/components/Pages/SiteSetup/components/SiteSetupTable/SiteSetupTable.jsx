// core
import React from 'react';

//styles
import styles from './SiteSetupTable.module.scss';

export const SiteSetupTable = ({keys, array, titles}) => {
    const values = Object.keys(array[keys]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>

                <div className={styles.siteSetupButtonsWrapper}>
                    <input type='text' className={styles.siteSetupButtons}
                           defaultValue="Type: Virtual Audio"/>
                    <input type='text' className={[styles.siteSetupButtons + ' ' + styles.disable]}
                           defaultValue="Min Gain (dB)"/>
                    <select className={styles.siteSetupButtons}>
                        <option>Min Gain (dB)</option>
                    </select>
                    <p>Fader Off = DSP Min Gain</p>
                </div>


                <div className={styles.tableHeader}>
                    {titles.map((title, index) => (
                        <div key={index} className={styles.tableCell}>{title}</div>
                    ))}
                </div>
                <div className={styles.tableBody}>
                    {values.map((value, index) => {
                            if (Array.isArray(array[keys][value])) {
                                return (
                                    <div key={index} className={styles.tableRow}>
                                        {(array[keys][value].map((item, index) =>
                                            <div key={index} className={styles.tableCell}>
                                                {value === 'enabled' ?
                                                    <div className='checkbox'>
                                                        {item ?
                                                            <input id={'enabled_' + index} type="checkbox" checked
                                                                   readOnly/> :
                                                            <input id={'enabled_' + index} type="checkbox" readOnly/>}
                                                        <label htmlFor={'enabled_' + index}/>
                                                    </div> : value === 'link' ? (<a className='question' href='/'/>) :
                                                        <span>{item}</span>}
                                            </div>))}
                                    </div>)
                            }

                        }
                    )}
                </div>


            </div>
        </div>
    );

};