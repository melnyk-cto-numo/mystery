// core
import React from 'react';

//components
import {Input} from "../../common/Input/Input";
import {Button} from "../../common";

//styles
import styles from './Update.module.scss';

export const Update = () => {
    return (
        <section className={styles.update}>
            <h2>Update</h2>
            <div className={styles.updateInner}>
                <h4>Bootloader Version</h4>
                <Input/>
                <div className={styles.updateButtons}>
                    <Button text='Upload Firmware'/>
                    <Button text='Reboot / Apply firmware'/>
                </div>
            </div>

        </section>
    );
};