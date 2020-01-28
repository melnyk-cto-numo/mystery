// core
import React from 'react';

//styles
import styles from './Button.module.scss';

export const Button = ({text}) => {
    return (<button type="button" className={styles.primaryBtn}>{text}</button>);
};