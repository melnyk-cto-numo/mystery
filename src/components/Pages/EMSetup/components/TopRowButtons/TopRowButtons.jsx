// core
import React, {useState} from 'react';

// library
import {useDispatch} from "react-redux";

// components
import {Select} from "./Select/Select";
import {emSetupActions} from "../../../../../bus/emSetup/actions";

// styles
import styles from './TopRowButtons.module.scss';


export const TopRowButtons = ({item, data, index, controls}) => {
    const dispatch = useDispatch();
    const [type, setType] = useState(item.type);

    const controlOptions = ['none', 'unused', ...controls.names];
    const advancedOptions = ['none', 'unused', 'altFader1', 'altFader2', 'altFader3', 'altToggle'];
    const options = ['none'];

    const handleChange = (e) => {
        console.log(e.target.value);
        setType(e.target.value);
        // dispatch(emSetupActions.setEmSetup({...data, [Object.key(data.Buttons[0])]: '44444'}))
    };

    return (
        <div className={styles.tableRow}>
            <div className={styles.tableCell}>{index + 1}</div>
            <div className={styles.type}>
                <select value={type} onChange={(e) => handleChange(e)}>
                    <option value="control">control</option>
                    <option value="ctrlSelector">ctrlSelector</option>
                    <option value="advanced">advanced</option>
                    <option value="bank">bank</option>
                    <option value="power">power</option>
                </select>
            </div>
            {type === 'control' ?
                item.levels.map((level, index) => (
                    <Select key={index} level={level} options={controlOptions}/>))
                : type === 'advanced' ?
                    item.levels.map((level, index) => (
                        <Select key={index} level={level} options={advancedOptions}/>))
                    : type === 'ctrlSelector' || type === 'bank' || type === 'power' ?
                        item.levels.map((level, index) => (
                            <Select key={index} options={options}/>)) : ''}
        </div>);
};