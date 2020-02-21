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
        {id: 0, type: 'ip', title: 'DSP IP Address', dspIP: data.dspIP},
        {id: 1, type: 'port', title: 'DSP Port', dspPort: data.dspPort},
    ];

    const [disabled, setDisabled] = useState(true);

    const editingData = () => {
        setDisabled(!disabled);
    };
    const cancelButton = () => {
        setDisabled(!disabled);
        dispatch(networkActions.setNetwork({}));
        dispatch(networkActions.getNetworkAsync());
    };
    const savingData = async () => {
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
        });

        dispatch(mysteryActions.setShowPopup(true));
        setTimeout(() => {
            dispatch(mysteryActions.setShowPopup(false));
        }, 1000)
    };

    useEffect(() => {
        dispatch(networkActions.getNetworkAsync());
    }, []);


    // need for fix fields
    if (array[3].value.enabled === undefined || array[3].value.primaryDNS === undefined || array[3].value.secondaryDNS === undefined) {
        return false;
    }
    const enabled = array[3].value.enabled;
    const primaryDNS = array[3].value.primaryDNS;
    const secondaryDNS = array[3].value.secondaryDNS;

    return (
        <section>
            <div className={styles.networkTitle}>
                <h2>Network</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editingData()}>Edit
                </button>
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
                            enable={enabled}
                            primary={primaryDNS}
                            secondary={secondaryDNS}
                        />)
                    })}
                </div>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.table}>
                    {DSP.map((item, index) => {
                        const key = Object.keys(item)[Object.keys(item).length - 1];
                        if (item[key] === undefined) return false;
                        return (<Table key={index} objKey={key} item={item} data={data} disabled={disabled}/>)
                    })}
                </div>
            </div>
            <div className={styles.networkButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => cancelButton()}>Cancel
                </button>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => savingData()}>Save
                </button>
            </div>
        </section>
    );
};