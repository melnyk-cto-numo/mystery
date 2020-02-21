// core
import React, {useState} from 'react';
import {useDispatch} from "react-redux";

// components
import {emSetupActions} from "../../../../../../bus/emSetup/actions";

//styles
import styles from './Select.module.scss';

export const Select = ({data, options, row, index, disabled}) => {
    const dispatch = useDispatch();
    const [api, setApi] = useState(data);


    const handleChange = (e) => {

        // set state "levels"
        const stateCopy = Object.assign({...data}, api);
        stateCopy.Buttons[row].levels[index] = e.target.value;
        setApi(stateCopy);

        dispatch(emSetupActions.setEmSetup({...api}))
    };

    return (
        <div className={styles.type}>
            <select value={data.Buttons[row].levels[index]} onChange={(e) => handleChange(e)} disabled={disabled}>
                {options.map(item => {
                    return (<option key={item} value={item}>{item}</option>)
                })}
            </select>
        </div>
    )
};