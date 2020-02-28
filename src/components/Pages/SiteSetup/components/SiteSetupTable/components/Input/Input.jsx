// core
import React, {useEffect, useState} from 'react';

//library
import {useDispatch, useSelector} from "react-redux";
import AutosizeInput from 'react-input-autosize';

// components
import {siteSetupActions} from "../../../../../../../bus/siteSetup/actions";
import {getSiteSetup} from "../../../../../../../bus/siteSetup/selectors";
import styles from "./Input.module.scss";

export const Input = ({invalid, index, item, keys, value, disabled}) => {
    const dispatch = useDispatch();

    const data = useSelector(getSiteSetup);

    const [valueInput, setValueInput] = useState(item);
    const [api, setApi] = useState(data);
    const [validation, setValidation] = useState('');

    const handleChange = (e) => {

        setValueInput(e.target.value);

        // set state "Name" and "Control No"
        const stateCopy = Object.assign({...item}, api);

        if (index === undefined) {
            stateCopy[keys][value] = e.target.value === "" ? " " : e.target.value;
        } else {
            stateCopy[keys][value][index] = e.target.value === "" ? " " : e.target.value;
        }
        setApi(stateCopy);

        dispatch(siteSetupActions.setSiteSetup({...data}))
    };

    useEffect(() => {
        if (valueInput === '') {
            setValidation('fill in the field please')
        } else {
            setValidation('');
        }
    }, [item, valueInput]);

    return (
        <>
            {(value !== 'controlNo' && value !== 'names')
                ? <AutosizeInput
                    type="text"
                    value={valueInput}
                    disabled={disabled} onChange={(e) => handleChange(e)}/>
                : <input
                    type="text"
                    className={validation ? 'validation' : ''}
                    value={valueInput} disabled={disabled}
                    onChange={(e) => handleChange(e)}/>}
            {!invalid && <div className={styles.validation}>{validation}</div>}
        </>)
};