// core
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

//components
import {Button, Input} from "../../common";
import {commandActions} from "../../../bus/command/actions";
import {mysteryActions} from "../../../bus/mystery/actions";
import {getUploadProgress} from "../../../bus/mystery/selectors";
import {server} from '../../../REST'
//styles
import styles from './Update.module.scss';

export const Update = () => {
    const dispatch = useDispatch();
    const progress = useSelector(getUploadProgress);
    const [inputValue, setInputValue] = useState('');
    const [show, setShow] = useState(false);
    const [disabled, seDisabled] = useState(false);

    const config = {
        onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            dispatch(mysteryActions.setUploadProgress(percentCompleted));
        }
    };

    const reboot = async () => {
        await server.getCommand({command: "Reboot"});
        dispatch(commandActions.setCommand({command: "Reboot"}));
    };
    const upload = async () => {
        if (inputValue.length === 0) {
            alert('Please choose file first.')
        } else {
            await server.firmware(new Blob([inputValue]), config)
        }
    };

    useEffect(() => {
        if (progress === 100 || progress === '') {
            setTimeout(() => {
                setShow(false);
                seDisabled(false)
            }, 1000);
        } else {
            setShow(true);
            seDisabled(true)
        }
    }, [progress]);

    return (
        <section className={styles.update}>
            <h2>Update</h2>
            <div className={styles.updateInner}>
                <h3>Bootloader Version</h3>
                <Input setInputValue={setInputValue}/>
                <div className={styles.updateButtons}>
                    {show && <div className={styles.progressBar}><span style={{width: `${progress}%`}}/></div>}
                    <Button text='Upload Firmware' func={() => upload()} disabled={disabled}/>
                    <Button text='Reboot / Apply firmware' func={() => reboot()}/>
                </div>
            </div>
        </section>
    );
};