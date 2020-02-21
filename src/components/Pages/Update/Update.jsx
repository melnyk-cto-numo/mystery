// core
import React, {useState} from 'react';
import {useDispatch} from "react-redux";

//components
import {Button, Input} from "../../common";
import {commandActions} from "../../../bus/command/actions";
import {server} from '../../../REST'
//styles
import styles from './Update.module.scss';

export const Update = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const reboot = async () => {
        await server.getCommand({command: "Reboot"});
        dispatch(commandActions.setCommand({command: "Reboot"}));
    };

    const upload = async () => {

        if (inputValue.length === 0) {
            alert('Please choose file first.')
        } else {
            alert('Done');
            await server.firmware(new Blob([inputValue]));
        }
    };

    return (
        <section className={styles.update}>
            <h2>Update</h2>
            <div className={styles.updateInner}>
                <h3>Bootloader Version</h3>
                <Input setInputValue={setInputValue}/>
                <div className={styles.updateButtons}>
                    <Button text='Upload Firmware' func={() => upload()}/>
                    <Button text='Reboot / Apply firmware' func={() => reboot()}/>
                </div>
            </div>
        </section>
    );
};