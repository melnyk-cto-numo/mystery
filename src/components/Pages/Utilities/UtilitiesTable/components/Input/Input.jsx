// core
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";


// components
import {getFader} from "../../../../../../bus/fader/selectors";


// styles
import styles from "./Input.module.scss";
import {faderActions} from "../../../../../../bus/fader/actions";


export const Input = ({index, item, name, disabled}) => {
    const dispatch = useDispatch();

    const fader = useSelector(getFader);
    const [value, setValue] = useState(item);


    const handleChange = (e) => {
        setValue(e.target.value);
        dispatch(faderActions.setFader({
            ...fader,
            [fader[name][index - 1]]: [fader[name][index - 1] = e.target.value]
        }))
    };

    return (
        <input key={index} className={styles.tableCell} value={value}
               onChange={(e) => handleChange(e)} disabled={disabled}/>
    );
};