// core
import React, {useEffect, useState} from 'react';

// library
import {useDispatch, useSelector} from "react-redux";


// components
import {Table} from "../../common";
import {networkActions} from "../../../bus/network/actions";
import {getNetwork} from "../../../bus/network/selectors";


//styles
import styles from './Network.module.scss';

export const Network = () => {
    const dispatch = useDispatch();
    const {network} = useSelector(getNetwork);
    const data = network.data;

    const [disabled, setDisabled] = useState(true);

    const editButton = () => {
        setDisabled(!disabled);
        console.log('edit')
    };
    const cancelButton = () => {
        setDisabled(!disabled);
        console.log('cancel')
    };

    useEffect(() => {
        dispatch(networkActions.getNetworkAsync());
    }, []);


    const array = [
        {id: 0, type: 'input', title: 'EasyMix IP Address', value: data.myIP},
        {id: 1, type: 'select', title: 'Mode', value: [data.mode]},
        {id: 2, type: 'input', title: 'Mac Address', value: data.mac},
        {
            id: 3,
            type: 'checkbox',
            title: 'Mac DNS',
            primary: data.primaryDNS,
            secondary: data.secondaryDNS
        },
        {id: 4, type: 'select', title: 'Communication type', value: [data.comType]},
    ];

    const DSP = [
        {id: 0, type: 'input', title: 'DSP IP Address', value: data.dspIP},
        {id: 1, type: 'input', title: 'DSP Port', value: data.dspPort},
    ];


    return (
        <section>
            <div className={styles.networkTitle}>
                <h2>Network</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editButton()}>Edit
                </button>
            </div>
            <Table data={array} disabled={disabled}/>
            <Table data={DSP} disabled={disabled}/>
            <div className={styles.networkButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => cancelButton()}>Cancel
                </button>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => editButton()}>Save
                </button>
            </div>
        </section>
    );
};