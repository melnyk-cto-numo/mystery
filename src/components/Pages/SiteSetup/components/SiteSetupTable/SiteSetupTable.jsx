// core
import React, {useEffect, useState} from 'react';

// library
import {useDispatch, useSelector} from "react-redux";

// components
import {Input} from "./components/Input/Input";
import {CheckBox} from "./components/CheckBox/CheckBox";
import {siteSetupActions} from "../../../../../bus/siteSetup/actions";
import {
    getBss,
    getHal,
    getJupiter,
    getQsys,
    getSiteSetup,
    getSymetrix,
    getTesira,
    getXilica,
} from "../../../../../bus/siteSetup/selectors";

//styles
import styles from './SiteSetupTable.module.scss';

// image
import ok from '../../../../../assets/img/check.svg'
import warning from '../../../../../assets/img/warning.svg'
import error from '../../../../../assets/img/remove.svg'


export const SiteSetupTable = ({keys, array, titles, errors, bank, disabled = true, setInputHeaderValidation}) => {
    const dispatch = useDispatch();

    const bss = useSelector(getBss);
    const hal = useSelector(getHal);
    const jupiter = useSelector(getJupiter);
    const qsys = useSelector(getQsys);
    const symetrix = useSelector(getSymetrix);
    const tesira = useSelector(getTesira);
    const xilica = useSelector(getXilica);
    const data = useSelector(getSiteSetup);

    const [selectValue, setSelectValue] = useState(array[keys].type);
    const [api, setApi] = useState(data);
    const [type, setType] = useState(array[keys].type);

    const values = Object.keys(array[keys]);
    const noAndBank = {
        no: [],
    };

    useEffect(() => {

        // validation
        if (
            array[keys].maxGain !== ' ' &&
            array[keys].updateRate !== ' ' &&
            array[keys].dspMinGain !== ' ' &&
            array[keys].minGain !== ' ' &&
            array[keys].name !== ' ' &&
            (array[keys].names === undefined ? 1 : array[keys].names.find(item => item === ' ') !== ' ') &&
            (array[keys].controlNo === undefined ? 1 : array[keys].controlNo.find(item => item === ' ') !== ' ')
        ) {
            setInputHeaderValidation(true);
        } else {
            setInputHeaderValidation(false);
        }
    }, [array, keys, setInputHeaderValidation]);


    if (errors[keys] === undefined) {
        return false;
    }

    // data for 2 column table
    for (let b = 1; b <= 2 * bank; b++) {
        noAndBank.no.push(b);
    }

    const handleChangeSelect = (e) => {
        setSelectValue(e.target.value);

        switch (e.target.value.toLowerCase()) {
            case 'bss':
                setType(bss.type);
                break;
            case 'hal':
                setType(hal.type);
                break;
            case 'jupiter':
                setType(jupiter.type);
                break;
            case 'qsys':
                setType(qsys.type);
                break;
            case 'symetrix':
                setType(symetrix.type);
                break;
            case 'tesira':
                setType(tesira.type);
                break;
            case 'xilica':
                setType(xilica.type);
                break;
            default:
                setType(qsys.type);
                break;
        }

        const stateCopy = Object.assign({...array[keys].type}, api);
        stateCopy[keys].type = e.target.value;
        setApi(stateCopy);

        dispatch(siteSetupActions.setSiteSetup({...data}))
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.siteSetupButtonsWrapper}>
                    {array[keys].type &&
                    <div className={styles.siteSetupButtons}>
                        Type:
                        <select value={selectValue} disabled={disabled} onChange={(e) => handleChangeSelect(e)}>
                            <option value={type}>{type}</option>
                            <option value='fader'>fader</option>
                        </select>
                    </div>}
                    {array[keys].maxGain &&
                    <div className={styles.siteSetupButtons}>
                        Max Gain:
                        <Input item={array[keys].maxGain}
                               keys={keys}
                               value={'maxGain'} disabled={disabled}/>
                        (dB)
                    </div>}
                    {array[keys].updateRate &&
                    <div className={styles.siteSetupButtons}>
                        Rate:
                        <Input item={array[keys].updateRate}
                               keys={keys} value={'updateRate'}
                               disabled={disabled}/>
                    </div>}
                    {array[keys].dspMinGain &&
                    <div className={styles.siteSetupButtons}>
                        DSP Min Gain:
                        <Input
                            item={array[keys].dspMinGain}
                            keys={keys} value={'dspMinGain'}
                            disabled={disabled}/>
                        (dB)
                    </div>}
                    <div className={styles.fader}>
                        {(keys === 'faders' || keys === 'altFader1' || keys === 'altFader2' || keys === 'altFader3')
                        &&
                        <>
                            <p>Fader Off = DSP Min Gain</p>
                            <div className='checkbox'>
                                <input
                                    id='fader'
                                    type="checkbox"
                                    disabled='disabled'
                                    checked/>
                                <label htmlFor='fader'/>
                            </div>
                        </>
                        }
                    </div>
                    {array[keys].minGain &&
                    <div className={styles.siteSetupButtons}>
                        Min Gain:
                        <Input item={array[keys].minGain}
                               keys={keys} value={'minGain'}
                               disabled={disabled}/>
                        (dB)
                    </div>}
                    {array[keys].name &&
                    <div className={styles.siteSetupButtons}>
                        Name:
                        <Input item={array[keys].name} keys={keys}
                               value={'name'} disabled={disabled}/>
                    </div>}
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
                                    (value !== 'linkedPairs' && value !== 'updateRate') &&
                                    <div key={index} className={styles.tableRow}>
                                        {(array[keys][value].slice(0, 2 * bank).map((item, index) =>
                                            <div key={index} className={styles.tableCell}>
                                                {value === 'enabled' || value === 'readOnly'
                                                    ? <CheckBox
                                                        index={index}
                                                        keys={keys}
                                                        item={item}
                                                        value={value}
                                                        disabled={disabled}/>
                                                    : (value === 'names' || value === 'controlNo')
                                                        ? <Input
                                                            invalid={true}
                                                            index={index}
                                                            item={item}
                                                            keys={keys}
                                                            value={value}
                                                            disabled={disabled}/>
                                                        : <span>{item}</span>}
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