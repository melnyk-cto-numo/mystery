// core
import React, {useState} from 'react';

//library
import {useDispatch, useSelector} from "react-redux";

// components
import {siteSetupActions} from "../../../../../../../bus/siteSetup/actions";
import {getSiteSetup} from "../../../../../../../bus/siteSetup/selectors";

export const Input = ({index, item, keys, value, disabled}) => {
    const dispatch = useDispatch();

    const data = useSelector(getSiteSetup);

    const [valueInput, setValueInput] = useState(item);
    const [api, setApi] = useState(data);

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

    return (
        <input type="text" value={valueInput} disabled={disabled} onChange={(e) => handleChange(e)}/>
    )
};