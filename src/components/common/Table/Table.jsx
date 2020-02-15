import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";


import styles from './Table.module.scss';
import {networkActions} from "../../../bus/network/actions";
import {getNetwork} from "../../../bus/network/selectors";


export const Table = ({item, objKey, disabled = true, primary, enable, secondary,}) => {
    const dispatch = useDispatch();
    const network = useSelector(getNetwork);
    const [value, setValue] = useState(item[objKey]);
    const [enabled, setEnabled] = useState(enable);
    const [primaryDNS, setPrimaryDNS] = useState(primary);
    const [secondaryDNS, setSecondaryDNS] = useState(secondary);


    const handleChange = async (e) => {
        if (e.target.name === 'enabled') {
            setEnabled(e.target.value);
            await dispatch(networkActions.setNetwork({...network.network.data, 'enabled': e.target.value}));
        } else if (e.target.name === 'primaryDNS') {
            setPrimaryDNS(e.target.value);
            await dispatch(networkActions.setNetwork({...network.network.data, 'primaryDNS': e.target.value}));
        } else if (e.target.name === 'secondaryDNS') {
            setSecondaryDNS(e.target.value);
            await dispatch(networkActions.setNetwork({...network.network.data, 'secondaryDNS': e.target.value}));
        } else {
            setValue(e.target.value);
            await dispatch(networkActions.setNetwork({...network.network.data, [objKey]: e.target.value}));
        }
    };

    return (
        item.type === 'input' ?
            <div key={item.id} className={styles.tableRow}>
                <span>{item.title}</span>
                <input type='text'
                       className={styles.networkValue}
                       value={value}
                       disabled={item.title === 'Mac Address' ? 'disabled' : disabled}
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
            : item.type === 'checkbox' ?
                <div key={item.id} className={styles.tableRow}>
                    <span/>
                    <div className={styles.macDns}>
                        <div className={styles.enable}>
                            <div className='checkbox'>
                                <input name='enabled' id='enabled' type="checkbox" value={enabled} disabled={disabled}/>
                                <label htmlFor='enabled'>Enabled</label>
                            </div>
                        </div>
                        <div>

                            <span>{item.title[1]}</span>
                            <input name='primaryDNS' type='text' className={styles.networkValue} value={primaryDNS}
                                   disabled={disabled}
                                   onChange={(e) => handleChange(e)}/>
                        </div>
                        <div>
                            <span>{item.title[2]}</span>
                            <input name='secondaryDNS' type='text' className={styles.networkValue} value={secondaryDNS}
                                   disabled={disabled}
                                   onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                </div> : ''
    );
};