// core
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

// components
import {siteSetupActions} from "../../../../../bus/siteSetup/actions";
import {
    getBss,
    getHal,
    getJupiter,
    getQsys,
    getSiteSetup,
    getSymetrix,
    getTesira, getXilica
} from "../../../../../bus/siteSetup/selectors";

//styles
import styles from './DspTable.module.scss';

export const DspTable = ({fields, dspType, setDspType, disabled = true}) => {
    const dispatch = useDispatch();

    const bss = useSelector(getBss);
    const hal = useSelector(getHal);
    const jupiter = useSelector(getJupiter);
    const qsys = useSelector(getQsys);
    const symetrix = useSelector(getSymetrix);
    const tesira = useSelector(getTesira);
    const xilica = useSelector(getXilica);
    const data = useSelector(getSiteSetup);

    const [siteName, seSiteName] = useState(fields.siteName.value);
    const [validation, setValidation] = useState('');

    const handleSiteName = (e) => {
        seSiteName(e.target.value);

        dispatch(siteSetupActions.setSiteSetup({...data, SiteName: e.target.value}))
    };

    const handleDsp = (e) => {
        setDspType(e.target.value.toLowerCase());
        switch (e.target.value.toLowerCase()) {
            case 'bss':
                dispatch(siteSetupActions.setSiteSetup({...bss}));
                seSiteName(bss.SiteName);
                break;
            case 'hal':
                dispatch(siteSetupActions.setSiteSetup({...hal}));
                seSiteName(hal.SiteName);
                break;
            case 'jupiter':
                dispatch(siteSetupActions.setSiteSetup({...jupiter}));
                seSiteName(jupiter.SiteName);
                break;
            case 'qsys':
                dispatch(siteSetupActions.setSiteSetup({...qsys}));
                seSiteName(qsys.SiteName);
                break;
            case 'symetrix':
                dispatch(siteSetupActions.setSiteSetup({...symetrix}));
                seSiteName(symetrix.SiteName);
                break;
            case 'tesira':
                dispatch(siteSetupActions.setSiteSetup({...tesira}));
                seSiteName(tesira.SiteName);
                break;
            case 'xilica':
                dispatch(siteSetupActions.setSiteSetup({...xilica}));
                seSiteName(xilica.SiteName);
                break;
            default:
                dispatch(siteSetupActions.setSiteSetup({...qsys}));
                seSiteName(qsys.SiteName);
                break;
        }
    };

    useEffect(() => {
        if (data.SiteName === '') {
            setValidation('fill in the field please')
        } else {
            setValidation('');
        }
    }, [data]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>
                <div className={styles.tableRow}>
                    <span>{fields.siteName.label}</span>
                    <div className={styles.field}>
                        <input
                            type={fields.siteName.type}
                            className={styles.value}
                            value={siteName}
                            disabled={disabled}
                            onChange={(e) => handleSiteName(e)}/>
                        <div className={styles.validation}>{validation}</div>
                    </div>
                </div>
                <div className={styles.tableRow}>
                    <span>{fields.dsp.label}</span>
                    <div className={styles.select}>
                        <select
                            value={dspType}
                            className={styles.value}
                            disabled={disabled}
                            onChange={(e) => handleDsp(e)}>
                            {fields.dsp.value.map((item, index) => (
                                <option value={item.toLowerCase()} key={index}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>)

};