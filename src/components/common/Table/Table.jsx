// core
import React, {useEffect, useState} from 'react';

// library
import {useDispatch, useSelector} from "react-redux";

// components
import {networkActions} from "../../../bus/network/actions";
import {getNetwork} from "../../../bus/network/selectors";
import {Input} from "./components/Input/Input";

// styles
import styles from './Table.module.scss';

export const Table = ({item, objKey, disabled = true, enable}) => {
    const dispatch = useDispatch();
    const network = useSelector(getNetwork);
    const [value, setValue] = useState(item[objKey]);
    const [enabled, setEnabled] = useState(enable);
    const [validation, setValidation] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'enabled') {
            setEnabled(e.target.value);
            dispatch(networkActions.setNetwork({...network, 'enabled': e.target.value}));
        } else {
            setValue(e.target.value);
            dispatch(networkActions.setNetwork({...network, [objKey]: e.target.value}));
        }
    };

    const maxValue = (e) => {
        if (e.target.value < 65535) {
            setValue(e.target.value);
            dispatch(networkActions.setNetwork({...network, [objKey]: e.target.value}))
        } else {
            setValue(65535);
        }

    };

    useEffect(() => {
        if (item[objKey] === '') {
            setValidation('fill in the field please')
        } else {
            setValidation('');
        }
    }, [item, objKey]);

    return (
        item.type === 'ip' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <Input
                    data={item.myIP}
                    item={item.type}
                    objKey={objKey}
                    disabled={disabled}/>
            </div>
            : item.type === 'dspIp' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <Input
                    data={item.dspIP}
                    item={item.type}
                    objKey={objKey}
                    disabled={disabled}/>
            </div>
            : item.type === 'port' ?
                <div key={item.id} className={styles.tableRow}>
                    <span>{item.title}</span>
                    <div className={styles.field}>
                        <input
                            type='number'
                            className={styles.networkValue}
                            value={value}
                            disabled={disabled}
                            onChange={(e) => maxValue(e)}/>
                        <div className={styles.validation}>{validation}</div>
                    </div>
                </div>
                : item.type === 'mode' ?
                    <div key={item.id} className={styles.tableRow}>
                        <span>{item.title}</span>
                        <div className={styles.select}>
                            <select value={network.mode} className={styles.networkValue}
                                    disabled={disabled}
                                    onChange={(e) => handleChange(e)}>
                                {item.mode.map((item, index) => <option key={index}>{item}</option>)}
                            </select>
                        </div>

                    </div>
                    : item.type === 'comType' ?
                        <div key={item.id} className={styles.tableRow}>
                            <span>{item.title}</span>
                            <div className={styles.select}>
                                <select value={network.comType} className={styles.networkValue}
                                        disabled={disabled}
                                        onChange={(e) => handleChange(e)}>
                                    {item.comType.map((item, index) => <option key={index}>{item}</option>)}
                                </select>
                            </div>

                        </div>
                        : item.type === 'mac' ?
                            <div key={item.id} className={styles.tableRow}>
                                <span>{item.title}</span>
                                <input type='text'
                                       className={styles.networkValue}
                                       value={value}
                                       disabled='disabled'/>
                            </div>
                            : item.type === 'multiple' ?
                                <div key={item.id} className={styles.tableRow}>
                                    <span/>
                                    <div className={styles.macDns}>
                                        <div className={styles.enable}>
                                            <div className='checkbox'>
                                                <input name='enabled' id='enabled' type="checkbox" value={enabled}
                                                       disabled={disabled}/>
                                                <label htmlFor='enabled'>Enabled</label>
                                            </div>
                                        </div>
                                        <div>
                                            <span>{item.title[1]}</span>
                                            <Input
                                                data={item.value.primaryDNS}
                                                name={'primaryDNS'}
                                                item={item.type} objKey={objKey}
                                                disabled={disabled}/>
                                        </div>
                                        <div>
                                            <span>{item.title[2]}</span>
                                            <Input
                                                data={item.value.secondaryDNS}
                                                name={'secondaryDNS'}
                                                item={item.type} objKey={objKey}
                                                disabled={disabled}/>

                                        </div>
                                    </div>
                                </div> : '')
};