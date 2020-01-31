// core
import React from 'react';

//components
import {Button, Input} from "../../common";

//styles
import styles from './Update.module.scss';

export const Update = () => {
    return (
        <section className={styles.update}>
            <h2>Update</h2>
            <div className={styles.updateInner}>
                <h3>Bootloader Version</h3>
                <Input/>
                <div className={styles.updateButtons}>
                    <Button text='Upload Firmware'/>
                    <Button text='Reboot / Apply firmware'/>
                </div>
            </div>

        </section>
    );
};