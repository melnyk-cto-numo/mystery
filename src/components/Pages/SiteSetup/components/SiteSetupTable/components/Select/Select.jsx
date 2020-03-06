// core
import React, {useState} from 'react';

//library
import {useDispatch, useSelector} from "react-redux";

// components
import {siteSetupActions} from "../../../../../../../bus/siteSetup/actions";
import {getSiteSetup} from "../../../../../../../bus/siteSetup/selectors";

export const Select = ({index, item, keys, value, disabled}) => {
    const dispatch = useDispatch();

    const data = useSelector(getSiteSetup);

    const [valueInput, setValueInput] = useState(item);
    const [api, setApi] = useState(data);

    const handleChange = (e) => {
        setValueInput(e.target.value);

        // set state "bssType"
        const stateCopy = Object.assign({...item}, api);
        stateCopy[keys][value][index] = e.target.value;
        setApi(stateCopy);

        dispatch(siteSetupActions.setSiteSetup({...api}))
    };


    return (
        <select value={valueInput} disabled={disabled}
                onChange={(e) => handleChange(e)}>
            <option value='Virtual Audio'>Virtual Audio</option>
            <option value='Virtual Logic'>Virtual Logic</option>
        </select>)
};