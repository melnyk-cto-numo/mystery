// core
import React from 'react';

//styles
import styles from './SiteSetupTable.module.scss';

export const SiteSetupTable = ({keys, array}) => {
    const values = Object.keys(array[keys]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>


                <div className={styles.tableHeader}>
                    {values.map((item, index) => (
                        <div key={index} className={styles.tableCell}>{item}</div>
                    ))}
                </div>
                <div className={styles.tableBody}>

                    {values.map((value, index) => {
                            if (Array.isArray(array[keys][value])) return (
                                <div key={index} className={styles.tableRow}>
                                    {(array[keys][value].map((item, index) =>
                                        <div key={index} className={styles.tableCell}>{item}</div>))}
                                </div>)
                        }
                    )}
                </div>


            </div>
        </div>
    );

};