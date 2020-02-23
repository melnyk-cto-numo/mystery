// core
import React, {useState} from 'react';
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

    return (
        <div key={item.id} className={styles.tableRow}>
            <span>{item.title}</span>
            <input type='number'
                   className={styles.emSetupValue}
                   value={value}
                   disabled={disabled}
                   onChange={(e) => handleChange(e)}/>
        </div>
    );
};