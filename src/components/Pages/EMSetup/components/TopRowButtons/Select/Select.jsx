// core
import React, {useState} from 'react';

//styles
import styles from './Select.module.scss';

export const Select = ({level, options}) => {
    const [value, setValue] = useState(level);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={styles.type}>
            <select value={value} onChange={(e) => handleChange(e)}>
                {options.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </div>
    )
};