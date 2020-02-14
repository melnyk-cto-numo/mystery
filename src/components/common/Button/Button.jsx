// core
import React from 'react';

//styles
import styles from './Button.module.scss';

export const Button = ({text, small, empty, func}) => {
    return (
        empty ?
            <button type='button' className={[styles.primaryBtn + ' ' + styles.empty]}/>
            :
            <button type="button"
                    className={small ? [styles.primaryBtn + ' ' + styles.small] : [styles.primaryBtn]}
                    onClick={func}>{text}</button>)

};

