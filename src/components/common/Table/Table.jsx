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

    return (
        item.type === 'ip' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <MaskedInput type='text'
                             mask={[/[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/]}

                             className={styles.networkValue}
                             value={value}
                             disabled={disabled}
                             onChange={(e) => handleChange(e)}/>
            </div>
            : item.type === 'mac' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <MaskedInput type='text'
                             mask={[/[0-9a-zA-Z]/, /[0-9a-zA-Z]/, ':', /[0-9a-zA-Z]/, /[0-9a-zA-Z]/, ':', /[0-9a-zA-Z]/, /[0-9a-zA-Z]/, ':', /[0-9a-zA-Z]/, /[0-9a-zA-Z]/, ':', /[0-9a-zA-Z]/, /[0-9a-zA-Z]/, ':', /[0-9a-zA-Z]/, /[0-9a-zA-Z]/,]}
                             className={styles.networkValue}
                             value={value}
                             disabled='disabled'
                             onChange={(e) => handleChange(e)}/>
            </div>
            : item.type === 'port' ?
                <div key={item.id} className={styles.tableRow}>
                    <span>{item.title}</span>
                    <MaskedInput
                        mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                        type='text'
                        className={styles.networkValue}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => handleChange(e)}/>
                </div>
                : item.type === 'select' ?
                    <div key={item.id} className={styles.tableRow}>
                        <span>{item.title}</span>
                        <div className={styles.select}>
                            <select className={styles.networkValue}
                                    disabled={disabled}>
                                {item[objKey].map((item, index) => (
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
                                        mask={[/[0-9]/, '.', /[0-9]/, '.', /[0-9]/, '.', /[0-9]/]}
                                        name='primaryDNS'
                                        type='text' className={styles.networkValue}
                                        value={primaryDNS}
                                        disabled={disabled}
                                        onChange={(e) => handleChange(e)}/>
                                </div>
                                <div>
                                    <span>{item.title[2]}</span>
                                    <MaskedInput
                                        mask={[/[0-9]/, '.', /[0-9]/, '.', /[0-9]/, '.', /[0-9]/]}
                                        name='secondaryDNS'
                                        type='text' className={styles.networkValue}
                                        value={secondaryDNS}
                                        disabled={disabled}
                                        onChange={(e) => handleChange(e)}/>
                                </div>
                            </div>
                        </div> : '')
};