//core
import React, {useEffect, useState} from 'react';

//library
import axios from "axios";

// components
import {TableStatus} from '../../common'

const EasyMix = [
    'EasyMix Model',
    'Easy Mix IP',
    'Status',
    'Connection info'
];


const DSP = [
    'Selected type',
    'DSP response time',
    'DSP Loop'
];


export const Status = () => {
    const [error, setErrors] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get('http://167.172.238.159/status.php')
            .then(res => setData(res.data.Status))
            .catch(err => setErrors(err));
    }, []);

    return (
        <section>
            {console.log(error)}
            <h2>Status</h2>
            {!error ?
                <>
                    <TableStatus title='EasyMix Details' header={EasyMix} data={data}/>
                    <TableStatus title='DSP Details' header={DSP} data={data}/>
                </>
                :
                ''}

        </section>
    );
};