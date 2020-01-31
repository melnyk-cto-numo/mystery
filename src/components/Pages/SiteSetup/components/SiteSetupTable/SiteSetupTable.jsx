// core
import React from 'react';

//styles
import styles from './SiteSetupTable.module.scss';

export const SiteSetupTable = ({keys, array}) => {
    const value = Object.keys(array[keys]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                {value.map((item, index) => <div key={index}>{array[keys][item]}</div>)}
            </div>
        </div>
    );

};