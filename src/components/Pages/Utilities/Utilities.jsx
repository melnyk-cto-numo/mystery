// core
import React from 'react';

// components
import {Button} from "../../common";
import {UtilitiesTable} from "./UtilitiesTable/UtilitiesTable";

// styles
import styles from './Utilities.module.scss';


const utilities = [
    {type: "~Raw value(0)~", buttons: [0, 0, 1, 1]},
    {type: "~Raw value(0)~", buttons: [0, 0, 1, 1]},
    {type: "~Raw value(0)~", buttons: [0, 0, 1, 1]},
    {type: "~Raw value(0)~", buttons: [0, 0, 1, 1]},
    {type: "~Raw value(0)~", buttons: [0, 0, 1, 1]},
];


const titleUtilities = {
    header: ['', 'Fader 2', 'Fader 3', 'Fader 4', 'Fader 5', 'Fader 6'],
    column: ['Raw value', '0 Value', '30 Value', 'Move to 0 db', 'Move to -30 db'],
};

export const Utilities = () => {

    return (
        <section>
            <div className={styles.utilitiesTitle}>
                <h2>Utilities</h2>
                <Button text='Edit'/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.table}>
                    <div className={styles.tableRow}>
                        <span>Button Passed</span>
                        <input type='text' className={styles.utilitiesValue} defaultValue='~Button Passed~' readOnly/>
                    </div>
                    <div className={styles.tableRow}>
                        <span>Test Faders</span>
                        <Button text='Go' small/>
                    </div>
                    <div className={styles.tableRow}>
                        <span>Test Indicators</span>
                        <Button text='Go' small/>
                    </div>
                </div>
            </div>
            <UtilitiesTable data={utilities} title={titleUtilities}/>
            <div className={styles.utilitiesButtons}>
                <Button text="Save changes"/>
            </div>
        </section>
    );
};