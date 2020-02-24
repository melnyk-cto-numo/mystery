// core
import React, {useEffect, useState} from 'react';

// library
import {useDispatch, useSelector} from "react-redux";

// components
import {server} from '../../../REST'
import {Table} from "../../common";
import {networkActions} from "../../../bus/network/actions";
import {mysteryActions} from "../../../bus/mystery/actions";
import {getNetwork} from "../../../bus/network/selectors";


//styles
import styles from './Network.module.scss';

export const Network = () => {
    const dispatch = useDispatch();
    const data = useSelector(getNetwork);

    const array = [
        {id: 0, type: 'ip', title: 'EasyMix IP Address', myIP: data.myIP},
        {
            id: 1,
            type: 'mode',
            title: 'Mode',
            mode: ['Static', 'DHCP'],
        },
        {
            id: 2,
            type: 'mac',
            title: 'Mac Address',
            mac: data.mac,
        },
        {
            id: 3,
            type: 'multiple',
            title: ['Enabled', 'PrimaryDNS', 'Secondary'],
            value: {enabled: 0, primaryDNS: data.primaryDNS, secondaryDNS: data.secondaryDNS}

        },
        {
            id: 4,
            type: 'comType',
            title: 'Communication type',
            comType: ['TCP', 'UDP'],
        },
    ];

    const DSP = [
        {id: 0, type: 'dspIp', title: 'DSP IP Address', dspIP: data.dspIP},
        {id: 1, type: 'port', title: 'DSP Port', dspPort: data.dspPort},
    ];

    const [disabled, setDisabled] = useState(true);
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');
    const [fieldValidation, setFieldValidation] = useState(true);

    const editingData = () => {
        setDisabled(!disabled);
    };
    const cancelingData = () => {
        setDisabled(!disabled);
        dispatch(networkActions.setNetwork({}));
        dispatch(networkActions.getNetworkAsync());
    };

    useEffect(() => {
        if (Object.keys(data).length === 0) return;
        if (data.myIP !== '' && data.myIP.indexOf('_') === -1 &&
            data.primaryDNS !== '' && data.primaryDNS.indexOf('_') === -1 &&
            data.secondaryDNS !== '' && data.secondaryDNS.indexOf('_') === -1 &&
            data.dspIP !== '' && data.dspIP.indexOf('_') === -1 &&
            data.dspPort !== '') {
            setFieldValidation(true)
        } else {
            setFieldValidation(false)
        }
    }, [data]);

    const savingData = async () => {

        // validation form
        setDisabled(!disabled);
        await server.setNetwork({
            network: {
                myIP: data.myIP,
                mode: data.mode,
                enabled: data.enabled,
                primaryDNS: data.primaryDNS,
                secondaryDNS: data.secondaryDNS,
                dspIP: data.dspIP,
                dspPort: data.dspPort,
                comType: data.comType,
                mac: data.mac,
            }
        })
            .then((response) => {
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
        dispatch(networkActions.getNetworkAsync());
    }, [dispatch]);


    // need for fix fields
    if (array[3].value.enabled === undefined || array[3].value.primaryDNS === undefined || array[3].value.secondaryDNS === undefined) {
        return false;
    }
    const enabled = array[3].value.enabled;

    return (
        <section>
            <div className={styles.networkTitle}>
                <h2>Network</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editingData()}>Edit
                </button>
                <div className="notice">{notice}</div>
                <div className="error">{error}</div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.table}>
                    {array.map((item, index) => {
                        const key = Object.keys(item)[Object.keys(item).length - 1];
                        if (item[key] === undefined) return false;
                        return (<Table
                            key={index}
                            objKey={key}
                            item={item}
                            data={data}
                            disabled={disabled}
                            enable={enabled}/>)
                    })}
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.table}>
                    {DSP.map((item, index) => {
                        const key = Object.keys(item)[Object.keys(item).length - 1];
                        if (item[key] === undefined) return false;
                        return (<Table
                            key={index}
                            objKey={key}
                            item={item}
                            data={data}
                            disabled={disabled}/>)
                    })}
                </div>
            </div>
            <div className={styles.networkButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => cancelingData()}>Cancel
                </button>
                <button type="button"
                        className={fieldValidation ? styles.primaryBtn : styles.primaryBtn + ' ' + styles.disabled}
                        disabled={disabled}
                        onClick={() => savingData()}>Save
                </button>
            </div>
        </section>
    );
};