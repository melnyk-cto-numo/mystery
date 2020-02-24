import React, {useEffect, useState} from 'react';

// library
import MaskedInput from 'react-text-mask'

// components
import {networkActions} from "../../../../../bus/network/actions";
import {useDispatch, useSelector} from "react-redux";
import {getNetwork} from "../../../../../bus/network/selectors";

// styles
import styles from './Input.module.scss';

const ip = '192.168.0.123';
export const Input = ({name, item, objKey, disabled}) => {
    const dispatch = useDispatch();
    const network = useSelector(getNetwork);
    const [disableIp, setDisableIp] = useState(false);

    const [value, setValue] = useState(network[objKey]);
    const [validation, setValidation] = useState('');

    const mask = (value) => {
        let result = [];
        const chunks = value.split(".");
        for (let i = 0; i < 4; ++i) {
            const chunk = (chunks[i] || "").replace(/_/gi, "");

            if (chunk === "") {
                result.push(/\d/, /\d/, /\d/, ".");
                setValidation('fill in the field please')
            } else if (+chunk === 0) {
                result.push(/\d/, ".");
                setValidation(3)
            } else if (chunks.length < 4 || (chunk.length < 3 && chunks[i].indexOf("_") !== -1)) {
                if ((chunk.length < 2 && +`${chunk}00` > 255) || (chunk.length < 3 && +`${chunk}0` > 255)) {
                    result.push(/\d/, /\d/, ".");
                } else {
                    result.push(/\d/, /\d/, /\d/, ".");
                    setValidation('fill in the field please')
                }
            } else {
                result.push(...new Array(chunk.length).fill(/\d/), ".");
                setValidation('')
            }
        }
        result = result.slice(0, -1);
        return result;
    };

    const pipe = (value) => {
        if (value === "." || value.endsWith("..")) return false;

        const parts = value.split(".");

        if (
            parts.length > 4 ||
            parts.some(part => part === "00" || part < 0 || part > 255)
        ) {
            return false;
        }

        return value;
    };

    const handleChange = (e) => {
        setValue(e.target.value);
        if (name === 'primaryDNS') {
            dispatch(networkActions.setNetwork({...network, 'primaryDNS': e.target.value}));
        } else if (name === 'secondaryDNS') {
            dispatch(networkActions.setNetwork({...network, 'secondaryDNS': e.target.value}));
        } else {
            dispatch(networkActions.setNetwork({...network, [objKey]: e.target.value}));
        }
    };

    useEffect(() => {
        if (network.mode === 'DHCP') {
            if (item === 'ip') {
                setValue(ip);
                setDisableIp(true);
                setValidation('');
                dispatch(networkActions.setNetwork({...network, [objKey]: ip}));
            }
        } else {
            setDisableIp(false);
        }
    }, [network.mode]);

    return (
        <div className={styles.field}>
            <MaskedInput type='text'
                         mask={(e) => mask(e)}
                         pipe={(e) => pipe(e)}
                         name={name}
                         className={styles.networkValue}
                         value={value}
                         disabled={disabled || disableIp}
                         onChange={(e) => handleChange(e)}/>
            <div className={styles.validation}>{validation}</div>
        </div>
    );
};