// core
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

// components
import {TableSmall} from "../../common";
import {UtilitiesTable} from "./UtilitiesTable/UtilitiesTable";
import {faderActions} from "../../../bus/fader/actions";
import {statusActions} from "../../../bus/status/actions";
import {mysteryActions} from "../../../bus/mystery/actions";
import {getFader} from "../../../bus/fader/selectors";
import {getStatus} from "../../../bus/status/selectors";

// styles
import styles from './Utilities.module.scss';
import {server} from "../../../REST";

const titleUtilities = {
    header: ['', 'Fader 1', 'Fader 2', 'Fader 3', 'Fader 4', 'Fader 5', 'Fader 6', 'Fader 7', 'Fader 8', 'Fader 9', 'Fader 10', 'Fader 11', 'Fader 12'],
    column: ['', 'Raw value', 'Left Value', 'Right Value', 'Move to 0 db', 'Move to -30 db'],
};

export const Utilities = () => {
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
    const data = useSelector(getFader);
    const pressed = useSelector(getStatus);

    const smallTable = [
        {id: '0', name: 'Button Pressed', label: 'Button Pressed', type: 'text', value: pressed.buttonPress},
        {id: '1', name: 'Fader Pressed', label: 'Fader Pressed', type: 'text', value: pressed.faderTouch},
        {id: '2', name: 'TestFader', label: 'Test Faders', type: 'button', value: 'Go'},
        {id: '3', name: 'TestLed', label: 'Test Indicators', type: 'button', value: 'Go'},
    ];

    const editingData = () => {
        setDisabled(!disabled);
    };

    const savingData = async () => {
        setDisabled(!disabled);

        await server.setFader({
            fader: {
                leftCalibration: data.leftCalibration,
                rightCalibration: data.rightCalibration,
            }
        });

        dispatch(mysteryActions.setShowPopup(true));
        setTimeout(() => {
            dispatch(mysteryActions.setShowPopup(false));
        }, 1000)
    };

    useEffect(() => {
        dispatch(statusActions.getStatusAsync());
        dispatch(faderActions.getFaderAsync());

        const interval = setInterval(() => {
            dispatch(statusActions.getStatusAsync());
            dispatch(faderActions.getFaderAsync());
        }, 1000);

        if (!disabled) clearInterval(interval);

        return () => clearInterval(interval);
    }, [dispatch, disabled]);

    return (
        <section>
            <div className={styles.utilitiesTitle}>
                <h2>Utilities</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editingData()}>Edit
                </button>
            </div>
            <TableSmall fields={smallTable} disabled={disabled}/>
            <UtilitiesTable data={data} title={titleUtilities} disabled={disabled}/>
            <div className={styles.utilitiesButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => savingData()}>Save changes
                </button>
            </div>
        </section>
    );
};