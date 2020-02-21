// core
import React, {useState} from 'react';

//library
import {useDispatch, useSelector} from "react-redux";

// components
import {siteSetupActions} from "../../../../../../../bus/siteSetup/actions";
import {getSiteSetup} from "../../../../../../../bus/siteSetup/selectors";

export const CheckBox = ({index, item, keys, value, disabled}) => {
    const dispatch = useDispatch();

    const data = useSelector(getSiteSetup);

    const [valueCheckBox, setValueCheckBox] = useState(item);
    const [api, setApi] = useState(data);

    const handleChange = (e) => {
        setValueCheckBox(e.target.checked);

        // set state "Name" and "Control No"
        const stateCopy = Object.assign({...item}, api);

        stateCopy[keys][value][index] = e.target.checked ? 1 : 0;
        setApi(stateCopy);

        dispatch(siteSetupActions.setSiteSetup({...data}))
    };

    return (
        <div className='checkbox'>
            <input
                id={'enabled_' + index}
                type="checkbox"
                value={valueCheckBox}
                checked={valueCheckBox}
                disabled={disabled}
                onChange={(e) => handleChange(e)}/>
            <label htmlFor={'enabled_' + index}/>
        </div>
    )
};