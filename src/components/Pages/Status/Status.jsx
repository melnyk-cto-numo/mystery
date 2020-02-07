//core
import React, {useEffect} from 'react';

//library
import {useDispatch, useSelector} from 'react-redux';


// components
import {TableStatus} from '../../common'
import {statusActions} from "../../../bus/status/actions";
import {getStatus} from '../../../bus/status/selectors';


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


    useEffect(() => {
        dispatch(statusActions.getStatusAsync());
    }, []);


    return (
        <section>
            <h2>Status</h2>
            <TableStatus title='EasyMix Details' header={EasyMix} data={status.data}/>
            <TableStatus title='DSP Details' header={DSP} data={status.data}/>
        </section>
    );
};