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

let interval = null;
export const Utilities = () => {
    const [disabled, setDisabled] = useState(true);
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');
    const [fieldValidation, setFieldValidation] = useState(true);

    const dispatch = useDispatch();
    const data = useSelector(getFader);
    const pressed = useSelector(getStatus);

    const smallTable = [
        {id: '0', name: 'Button Pressed', label: 'Button Pressed', type: 'text', value: pressed.buttonPress},
        {id: '1', name: 'Fader Pressed', label: 'Fader Pressed', type: 'text', value: pressed.faderTouch},
        {id: '2', name: 'TestFader', label: 'Test Faders', type: 'button', value: 'Go'},
        {id: '3', name: 'TestLed', label: 'Test Indicators', type: 'button', value: 'Go'},
        {id: '4', name: 'LogLevel', label: 'Log Level', type: 'select', value: ['Normal', 'Debug']},
        {id: '5', name: 'DownLoadLog', label: 'DownLoad Log', type: 'link', value: '/utilities'},
    ];

    const editingData = () => {
        setDisabled(!disabled);
    };

    const cancelingData = () => {
        setDisabled(!disabled);

        dispatch(faderActions.setFader({}));
        dispatch(faderActions.getFaderAsync());
    };


    useEffect(() => {

        // check validation
        if (Object.keys(data).length === 0) return;
        if (
            data.centerCalibration.find(item => item === '') !== '') {
            setFieldValidation(true);
        } else {
            setFieldValidation(false);
        }
    }, [data]);

    const savingData = async () => {
        setDisabled(!disabled);

        await server.setFader({
            fader: {
                centerCalibration: data.centerCalibration,
            }
        }).then((response) => {
            if (response.status === 200) {
                setNotice('The data was saved successfully');
                setTimeout(() => {
                    setNotice('');
                }, 3000);
            }
        })
            .catch(() => {
                setError('The internet connection has timed out');
                setTimeout(() => {
                    setError('');
                }, 3000);
            });

        dispatch(mysteryActions.setShowPopup(true));
        setTimeout(() => {
            dispatch(mysteryActions.setShowPopup(false));
        }, 1000)
    };

    useEffect(() => {
        dispatch(statusActions.getStatusAsync());
        dispatch(faderActions.getFaderAsync());

        interval = setInterval(() => {
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
                <div className="notice">{notice}</div>
                <div className="error">{error}</div>
            </div>
            <TableSmall fields={smallTable} disabled={disabled}/>
            <UtilitiesTable data={data} disabled={disabled}/>
            <div className={styles.utilitiesButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => cancelingData()}>Cancel
                </button>
                <button type="button"
                        className={fieldValidation ? styles.primaryBtn : styles.primaryBtn + ' ' + styles.disabled}
                        onClick={() => savingData()}>Save changes
                </button>
            </div>
        </section>
    );
};