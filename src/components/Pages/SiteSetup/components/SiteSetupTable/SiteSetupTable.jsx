// core
import React from 'react';

//styles
import styles from './SiteSetupTable.module.scss';

// image
import ok from '../../../../../assets/img/check.svg'
import warning from '../../../../../assets/img/warning.svg'
import error from '../../../../../assets/img/remove.svg'


export const SiteSetupTable = ({keys, array, titles, errors, bank, disabled = true}) => {
    const values = Object.keys(array[keys]);
    const noAndBank = {
        no: [],
        banks: [],
    };

    if (errors[keys] === undefined) {
        return false;
    }

    // data for 2 column table
    for (let b = 1; b <= 2 * bank; b++) {
        noAndBank.no.push(b);
        if (b <= bank) {
            noAndBank.banks.push('A');
        } else {
            noAndBank.banks.push('B');
        }
    }

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
                           {array[keys].updateRate &&
                    <input type='text' className={styles.siteSetupButtons}
                           defaultValue={`Rate: ${array[keys].maxGain}`} disabled={disabled}/>}
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
                    {/*add No adn Bank row*/}
                    <div className={styles.tableRow}>
                        {(noAndBank.no.map((item, index) =>
                            <div key={index} className={styles.tableCell}>{item}</div>))}
                    </div>
                    <div className={styles.tableRow}>
                        {(noAndBank.banks.map((bank, index) =>
                            <div key={index} className={styles.tableCell}>{bank}</div>))}
                    </div>
                    {/* errors array */}
                    <div className={styles.tableRow}>
                        {(errors[keys].slice(0, 2 * bank).map((item, index) =>
                            <div key={index} className={styles.tableCell}>
                                <img src={item === 0 ? ok : item === 1 ? warning : error} alt=""/>
                            </div>))}
                    </div>
                    {values.map((value, index) => {
                            if (Array.isArray(array[keys][value])) {
                                return (
                                    <div key={index} className={styles.tableRow}>
                                        {(array[keys][value].slice(0, 2 * bank).map((item, index) =>
                                            <div key={index} className={styles.tableCell}>
                                                {value === 'enabled' ?
                                                    <div className='checkbox'>
                                                        {item ?
                                                            <input id={'enabled_' + index} type="checkbox" checked
                                                                   disabled={disabled}/> :
                                                            <input id={'enabled_' + index} type="checkbox"
                                                                   disabled={disabled}/>}
                                                        <label htmlFor={'enabled_' + index}/>
                                                    </div> : <span>{item}</span>}
                                            </div>))}
                                    </div>

                                )
                            }
                            return null;
                        }
                    )}
                </div>


            </div>
        </div>
    );

};