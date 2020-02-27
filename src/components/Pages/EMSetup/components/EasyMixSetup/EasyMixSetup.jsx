// core
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

// components
import {emSetupActions} from "../../../../../bus/emSetup/actions";

// styles
import styles from './EasyMixSetup.module.scss';
import {getEmSetup} from "../../../../../bus/emSetup/selectors";


export const EasyMixSetup = ({item, objKey, disabled}) => {
    const dispatch = useDispatch();
    const emsetup = useSelector(getEmSetup);
    const [value, setValue] = useState(item[objKey]);
    const [validation, setValidation] = useState('');

    const handleChange = async (e) => {
        if (e.target.value < 120) {
            setValue(e.target.value);
            dispatch(emSetupActions.setEmSetup({
                ...emsetup,
                Settings: {...emsetup.Settings, [objKey]: e.target.value}
            }))
        } else {
            setValue(120);
            dispatch(emSetupActions.setEmSetup({
                ...emsetup,
                Settings: {...emsetup.Settings, [objKey]: 120}
            }))
        }

    };

    useEffect(() => {
        if (item[objKey] === '') {
            setValidation('fill in the field please')
        } else {
            setValidation('');
        }
    }, [emsetup, item, objKey]);

    return (
        <div key={item.id} className={styles.tableRow}>
            <span>{item.title}</span>
            <div className={styles.field}>
                <input type='number'
                       className={styles.emSetupValue}
                       value={value}
                       disabled={disabled}
                       onChange={(e) => handleChange(e)}/>
                <div className={styles.validation}>{validation}</div>
            </div>

        </div>
    );
};