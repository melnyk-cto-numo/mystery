// core
import React, {useState} from 'react';

// library
import {useDispatch, useSelector} from "react-redux";
import MaskedInput from 'react-text-mask'

// components
import {networkActions} from "../../../bus/network/actions";
import {getNetwork} from "../../../bus/network/selectors";

// styles
import styles from './Table.module.scss';

export const Table = ({item, objKey, disabled = true, primary, enable, secondary,}) => {
    const dispatch = useDispatch();
    const network = useSelector(getNetwork);
    const [value, setValue] = useState(item[objKey]);
    const [enabled, setEnabled] = useState(enable);
    const [primaryDNS, setPrimaryDNS] = useState(primary);
    const [secondaryDNS, setSecondaryDNS] = useState(secondary);

    const handleChange = (e) => {
        if (e.target.name === 'enabled') {
            setEnabled(e.target.value);
            dispatch(networkActions.setNetwork({...network.network.data, 'enabled': e.target.value}));
        } else if (e.target.name === 'primaryDNS') {
            setPrimaryDNS(e.target.value);
            dispatch(networkActions.setNetwork({...network.network.data, 'primaryDNS': e.target.value}));
        } else if (e.target.name === 'secondaryDNS') {
            setSecondaryDNS(e.target.value);
            dispatch(networkActions.setNetwork({...network.network.data, 'secondaryDNS': e.target.value}));
        } else {
            setValue(e.target.value);
            dispatch(networkActions.setNetwork({...network.network.data, [objKey]: e.target.value}));
        }
    };

    const mask = (value) => {
        let result = [];
        const chunks = value.split(".");
        for (let i = 0; i < 4; ++i) {
            const chunk = (chunks[i] || "").replace(/_/gi, "");

            if (chunk === "") {
                result.push(/\d/, /\d/, /\d/, ".");
            } else if (+chunk === 0) {
                result.push(/\d/, ".");
            } else if (chunks.length < 4 || (chunk.length < 3 && chunks[i].indexOf("_") !== -1)) {
                if ((chunk.length < 2 && +`${chunk}00` > 255) || (chunk.length < 3 && +`${chunk}0` > 255)) {
                    result.push(/\d/, /\d/, ".");
                } else {
                    result.push(/\d/, /\d/, /\d/, ".");
                }
            } else {
                result.push(...new Array(chunk.length).fill(/\d/), ".");
            }
        }
        result = result.slice(0, -1);
        return result;
    };
    const pipe = (value) => {
        if (value === "." || value.endsWith("..")) return false;

        const parts = value.split(".");

        if (
            parts.length > 4 ||
            parts.some(part => part === "00" || part < 0 || part > 255)
        ) {
            return false;
        }

        return value;
    };

    const maxValue = (e) => {
        if (e.target.value < 65535) {
            setValue(e.target.value);
            dispatch(networkActions.setNetwork({...network.network.data, [objKey]: e.target.value}))
        } else {
            setValue(65535);
        }

    };

    return (
        item.type === 'ip' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <MaskedInput type='text'
                             mask={(e) => mask(e)}
                             pipe={(e) => pipe(e)}
                             className={styles.networkValue}
                             value={value}
                             disabled={disabled}
                             onChange={(e) => handleChange(e)}/>
            </div>
            : item.type === 'port' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <input
                    type='number'
                    className={styles.networkValue}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => maxValue(e)}/>
            </div>
            : item.type === 'select' ?
                <div key={item.id} className={styles.tableRow}>
                    <span>{item.title}</span>
                    <div className={styles.select}>
                        <select className={styles.networkValue}
                                disabled={disabled}
                                onChange={(e) => handleChange(e)}>
                            {item[objKey].map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </div>

                </div>
                : item.type === 'mac' ?
                    <div key={item.id} className={styles.tableRow}>
                        <span>{item.title}</span>
                        <div className={styles.select}>
                            <select className={styles.networkValue}
                                    disabled={disabled}
                                    onChange={(e) => handleChange(e)}>
                                <option>{item.mac.macAddress}</option>
                                {item[objKey].type.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

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
                                    <MaskedInput
                                        mask={(e) => mask(e)}
                                        pipe={(e) => pipe(e)}
                                        name='primaryDNS'
                                        type='text' className={styles.networkValue}
                                        value={primaryDNS}
                                        disabled={disabled}
                                        onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                    <span>{item.title[2]}</span>
                                    <MaskedInput
                                        mask={(e) => mask(e)}
                                        pipe={(e) => pipe(e)}
                                        name='secondaryDNS'
                                        type='text' className={styles.networkValue}
                                        value={secondaryDNS}
                                        disabled={disabled}
                                        onChange={(e) => handleChange(e)}/>
                                </div>
                            </div>
                        </div> : '')
};