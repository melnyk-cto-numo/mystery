// core
import React from 'react';

// library
// import {useDispatch} from "react-redux";

// components
// import {emSetupActions} from "../../../../../bus/emSetup/actions";

// styles
import styles from './TopRowButtons.module.scss';

const controls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const TopRowButtons = ({item, data, index}) => {
    // const dispatch = useDispatch();

    const handleChange = (e) => {
        console.log(e.target.value);
        // dispatch(emSetupActions.setEmSetup({...data, Buttons: [{type: 'control', levels: ['levels']}]}))
    };

    console.log(data.Buttons[index].type);


    return (
        <div className={styles.tableRow}>
            <div className={styles.tableCell}>{index + 1}</div>
            <div className={styles.type}>
                <select value={item.type} onChange={(e) => handleChange(e)}>
                    <option value="control">control</option>
                    <option value="ctrlSelector">ctrlSelector</option>
                    <option value="advanced">advanced</option>
                    <option value="bank">bank</option>
                    <option value="power">power</option>
                </select>
            </div>

            {item.type === 'control' ?
                item.levels.map((level, index) => (
                    <div key={index} className={styles.type}>
                        <select value={level} onChange={(e) => handleChange(e)}>
                            <option value="none">none</option>
                            <option value="unused">unused</option>
                            {controls.map(i => <option key={i} value={`control${i}`}>{`control${i}`}</option>)}
                        </select>
                    </div>))
                : item.type === 'advanced' ?
                    item.levels.map((level, index) => (
                        <div key={index} className={styles.type}>
                            <select value={level} onChange={(e) => handleChange(e)}>
                                <option value="none">none</option>
                                <option value="unused">unused</option>
                                <option value="altFader1">altFader1</option>
                                <option value="altFader2">altFader2</option>
                                <option value="altFader3">altFader3</option>
                                <option value="altToggle">altToggle</option>
                            </select>
                        </div>))
                    : item.type === 'ctrlSelector' || item.type === 'bank' || item.type === 'power' ?
                        item.levels.map((level, index) => (
                            <div key={index} className={styles.type}>
                                <select value={level} onChange={(e) => handleChange(e)}>
                                    <option value="unused">none</option>
                                </select>
                            </div>)) : ''}
        </div>);
};