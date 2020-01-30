import React, {useState} from 'react';

import styles from './Input.module.scss';


export const Input = () => {

    const [nameFile, setNameFile] = useState('No file chosen');
    const setValue = (e) => {
        setNameFile(e.target.value.split('\\').pop());
    };

    return (

        <div className={styles.inputFile}>
            <label htmlFor="upload" className={styles.upload}>Choose file</label>
            <span>{nameFile}</span>
            <input id='upload' type="file" onChange={(e) => setValue(e)}/>
        </div>
    );
};