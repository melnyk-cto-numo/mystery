//core
import React from 'react';

// components
import {TableStatus} from '../../common'

const EasyMix = {
    header: [
        'EasyMix Model',
        'Easy Mix IP',
        'Status',
        'Connection info'],
    body: [
        '~EM12IpAddress~',
        '~EM12IpAddress~',
        '~ConnectionState~',
        '~ComState~',
    ]
};

const DSP = {
    header: [
        'Selected type',
        'DSP response time',
        'DSP Loop'],
    body: [
        '~DspName~',
        '~PingTime~',
        '~SymLoopTime~',]
};

export const Status = () => {
    return (
        <section>
            <h2>Status</h2>
            <TableStatus title='EasyMix Details' data={EasyMix}/>
            <TableStatus title='DSP Details' data={DSP}/>
        </section>
    );
};