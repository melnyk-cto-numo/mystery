// core
import React from 'react';

//styles
import styles from './SiteSetupTable.module.scss';

export const SiteSetupTable = ({keys, array, titles, disabled = true}) => {
    const values = Object.keys(array[keys]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>

                <div className={styles.siteSetupButtonsWrapper}>
                    {array[keys].type &&
                    <input type='text' className={styles.siteSetupButtons}
                           defaultValue={`Type: ${array[keys].type}`} disabled={disabled}/>}
                    {array[keys].maxGain &&
                    <input type='text' className={styles.siteSetupButtons}
                           defaultValue={`Min Gain: ${array[keys].maxGain} (dB)`} disabled={disabled}/>}
                    {array[keys].dspMinGain &&
                    <>
                        <input type='text' className={styles.siteSetupButtons}
                               defaultValue={`DSP Min Gain: ${array[keys].dspMinGain} (dB)`} disabled={disabled}/>
                        <p>Fader Off = DSP Min Gain</p>
                    </>}
                    {array[keys].minGain &&
                    <select className={styles.siteSetupButtons} disabled={disabled}>
                        <option>{`Min Gain: ${array[keys].minGain} (dB)`}</option>
                    </select>}


                    {array[keys].name &&
                    <input type='text' className={styles.siteSetupButtons} defaultValue={`Name: ${array[keys].name}`}
                           disabled={disabled}/>}


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
                                                                   disabled={disabled}/> :
                                                            <input id={'enabled_' + index} type="checkbox"
                                                                   disabled={disabled}/>}
                                                        <label htmlFor={'enabled_' + index}/>
                                                    </div> : value === 'link' ? (<span className='question'/>) :
                                                        <span>{item}</span>}
                                            </div>))}
                                    </div>)
                            }
                            return null;
                        }
                    )}
                </div>


            </div>
        </div>
    );

};