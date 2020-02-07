//core
import React, {useEffect} from 'react';

//library
import {useDispatch, useSelector} from 'react-redux';

// components
import {TableStatus} from '../../common'
import {statusActions} from "../../../bus/status/actions";
import {networkActions} from "../../../bus/network/actions";
import {getStatus} from '../../../bus/status/selectors';
import {getNetwork} from "../../../bus/network/selectors";

const EasyMix = [
    'EasyMix Model',
    'Easy Mix IP',
];

const DSP = [
    'Selected type',
    'Status',
    'Connection info'
];

export const Status = () => {
    const dispatch = useDispatch();
    const {status} = useSelector(getStatus);
    const statusData = status.data;
    const {network} = useSelector(getNetwork);
    const networkData = network.data;


    useEffect(() => {
        dispatch(statusActions.getStatusAsync());
        dispatch(networkActions.getNetworkAsync());
    }, []);


    const EasyMixData = [statusData.model, networkData.myIP];

    const DSPData = [statusData.dspType, statusData.connectionStatus, statusData.connectionInfo];

    return (
        <section>
            <h2>Status</h2>
            <TableStatus title='EasyMix Details' header={EasyMix} data={EasyMixData}/>
            <TableStatus title='DSP Details' header={DSP} data={DSPData}/>
        </section>
    );
};