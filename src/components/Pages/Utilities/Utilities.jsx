// core
import React from 'react';

// components
import {Button, TableSmall} from "../../common";
import {UtilitiesTable} from "./UtilitiesTable/UtilitiesTable";

// styles
import styles from './Utilities.module.scss';


const smallTable = [
    {id: '0', label: 'Button Passed', type: 'text', value: '~Button Passed~'},
    {id: '1', label: 'Test Faders', type: 'button', value: 'Go'},
    {id: '2', label: 'Test Indicators', type: 'button', value: 'Go'},
];

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
            <TableSmall fields={smallTable}/>
            <UtilitiesTable data={utilities} title={titleUtilities}/>
            <div className={styles.utilitiesButtons}>
                <Button text="Save changes"/>
            </div>
        </section>
    );
};