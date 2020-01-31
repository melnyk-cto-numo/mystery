// core
import React, {useState} from 'react';

// components
import { Table} from "../../common";

//styles
import styles from './Network.module.scss';

const array = [
    {id: 0, type: 'input', title: 'EasyMix IP Address', value: '~EM12IpAddress~'},
    {id: 1, type: 'select', title: 'Mode', value: ['Static IP', 'Dynamic IP', 'IP']},
    {id: 2, type: 'input', title: 'Mac Address', value: '~EM12MacAddress~'},
    {id: 3, type: 'checkbox', title: 'Mac DNS', value: '~EM12MacAddress~', primary: '8.8.8.8', secondary: '8.8.4.4'},
    {id: 4, type: 'select', title: 'Communication type', value: ['TCP/IP', 'TCP', 'IP']},
];

const DSP = [
    {id: 0, type: 'input', title: 'DSP IP Address', value: '~DSPIpAddress~'},
    {id: 1, type: 'input', title: 'DSP Port', value: '~DSPPort~'},
];

export const Network = () => {
    const [disabled, setDisabled] = useState(true);

    const editData = () => {
        setDisabled(!disabled)
    };


    return (
        <section>
            <div className={styles.networkTitle}>
                <h2>Network</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editData()}>Edit
                </button>
            </div>
            <Table data={array}/>
            <Table data={DSP}/>
            <div className={styles.networkButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => editData()}>Cancel
                </button>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => editData()}>Save
                </button>
            </div>
        </section>
    );
};