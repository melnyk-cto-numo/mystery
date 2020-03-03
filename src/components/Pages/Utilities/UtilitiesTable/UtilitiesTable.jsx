// core
import React from 'react';

// library
import {useSelector} from "react-redux";

// components
import {getStatus} from "../../../../bus/status/selectors";
import {UtilitiesTableEm4} from "./components";
import {UtilitiesTableEm8} from "./components";
import {UtilitiesTableEm12} from "./components";

// styles
import styles from './UtilitiesTable.module.scss';

export const UtilitiesTable = ({data, disabled}) => {
    const status = useSelector(getStatus);


    if (data.rawFader === undefined) {
        return false;
    }
    const utilities = {
        'Header': ['', 'Fader 1', 'Fader 2', 'Fader 3', 'Fader 4', 'Fader 5', 'Fader 6', 'Fader 7', 'Fader 8', 'Fader 9', 'Fader 10', 'Fader 11', 'Fader 12'],
        'Raw value': ['Raw value', ...data.rawFader],
        'Center value': ['Center value', ...data.centerCalibration],
    };

    return (
        <div className={styles.wrapper}>
            {status.model === 'EM12' &&
            <UtilitiesTableEm12
                utilities={utilities}
                model={status.model}
                data={data}
                disabled={disabled}/>}
            {status.model === 'EM8' &&
            <UtilitiesTableEm8
                utilities={utilities}
                model={status.model}
                data={data}
                disabled={disabled}/>}
            {status.model === 'EM4' &&
            <UtilitiesTableEm4
                utilities={utilities}
                model={status.model}
                data={data}
                disabled={disabled}/>}
        </div>
    );
};