// core
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

//components
import {Button, Input} from "../../common";
import {commandActions} from "../../../bus/command/actions";
import {server} from '../../../REST'
//styles
import styles from './Update.module.scss';

export const Update = () => {
    const dispatch = useDispatch();


    const reboot = async () => {

        await server.getCommand({command: "Reboot"})
            .then(res => {
                console.log(res)
            });

        dispatch(commandActions.getCommandAsync());

    };


    useEffect(() => {
        dispatch(commandActions.getCommandAsync())
    }, []);
    return (
        <section className={styles.update}>
            <h2>Update</h2>
            <div className={styles.updateInner}>
                <h3>Bootloader Version</h3>
                <Input/>
                <div className={styles.updateButtons}>
                    <Button text='Upload Firmware'/>
                    <Button text='Reboot / Apply firmware' reboot={() => reboot()}/>
                </div>
            </div>

        </section>
    );
};