// core
import React, { useState} from 'react';

// library
import {useDispatch} from "react-redux";

// components
import {Select} from "./Select/Select";
import {emSetupActions} from "../../../../../bus/emSetup/actions";

// styles
import styles from './TopRowButtons.module.scss';


export const TopRowButtons = ({item, data, row, controls, disabled}) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(item.type);
    const [api, setApi] = useState(data);

    const controlName = controls.names.map(item => item.toLowerCase().replace(/ +/g, ''));
    const controlOptions = ['none', 'unused', ...controlName];
    const advancedOptions = ['none', 'unused', 'altFader1', 'altFader2', 'altFader3', 'altToggle'];
    const options = ['none'];

    const handleChange = (e) => {
        setType(e.target.value);

        // set state "type"
        const stateCopy = Object.assign({...data}, api);
        stateCopy.Buttons[row].type = e.target.value;

        // set "levels" when change "type"
        stateCopy.Buttons[row].levels = data.Buttons[row].levels.map(item => 'none');

        setApi(stateCopy);
        dispatch(emSetupActions.setEmSetup({...api}));
    };

    return (
        <div className={styles.tableRow}>
            <div className={styles.tableCell}>{row + 1}</div>
            <div className={styles.type}>
                <select value={type} onChange={(e) => handleChange(e)} disabled={disabled}>
                    <option value="control">control</option>
                    <option value="ctrlSelector">ctrlSelector</option>
                    <option value="advanced">advanced</option>
                    <option value="bank">bank</option>
                    <option value="power">power</option>
                </select>
            </div>
            {type === 'control' ?
                item.levels.map((level, index) => (
                    <Select
                        key={index}
                        data={data}
                        options={controlOptions}
                        row={row}
                        index={index}
                        disabled={disabled}/>))
                : type === 'advanced' ?
                    item.levels.map((level, index) => (
                        <Select
                            key={index}
                            data={data}
                            options={advancedOptions}
                            row={row}
                            index={index}
                            disabled={disabled}/>))
                    : type === 'ctrlSelector' || type === 'bank' || type === 'power' ?
                        item.levels.map((level, index) => (
                            <Select
                                key={index}
                                data={data}
                                options={options}
                                row={row}
                                index={index}
                                disabled={disabled}/>)) : ''}
        </div>);
};