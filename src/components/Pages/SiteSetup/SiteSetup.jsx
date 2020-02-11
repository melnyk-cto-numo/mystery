// core
import React, {useEffect, useState} from 'react';

// library
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useDispatch, useSelector} from "react-redux";


//components
import {TableSmall} from "../../common";
import {SiteSetupTable} from "./components/SiteSetupTable/SiteSetupTable";
import {siteSetupActions} from "../../../bus/siteSetup/actions";
import {errorsActions} from "../../../bus/errors/actions";
import {getSiteSetup} from "../../../bus/siteSetup/selectors";
import {getErrors} from "../../../bus/errors/selectors";


//styles
import styles from './SiteSetup.module.scss';

const headerTableName = [
    {
        faders: ['Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['Link', 'ON', 'Control No.'],
        altFader2: ['Link', 'ON', 'Control No.'],
        altFader3: ['Link', 'ON', 'Control No.'],
        altToggle: ['Link', 'ON', 'Invert', 'Control No.'],
        mute: ['Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['Link', 'ON', 'Control No.'],
        meter2: ['Link', 'ON', 'Control No.'],
        hg: ['Link', 'ON', 'Control No.'],
        control: ['Name', 'Link', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
];

export const SiteSetup = () => {
    const dispatch = useDispatch();
    const siteSetup = useSelector(getSiteSetup);
    const errors = useSelector(getErrors);
    const data = siteSetup.siteSetup.data;
    const dataErrors = errors.errors.data;

    const [disabled, setDisabled] = useState(true);


    useEffect(() => {
        dispatch(siteSetupActions.getSiteSetupAsync());
        dispatch(errorsActions.getErrorsAsync());
    }, []);


    if (data.DspType === undefined) {
        return false;
    }

    const smallTable = [
        {id: '0', label: 'Site name', type: 'text', value: data.DspType.name},
        {
            id: '1',
            label: 'DSP',
            type: 'select',
            value: [data.DspType.type]
        },
    ];


    const editingData = () => {
        setDisabled(!disabled)
    };

    return (
        <section className={styles.siteSetup}>
            <div className={styles.siteSetupTitle}>
                <h2>
                    Site Setup
                </h2>
                <button type="button" className={styles.primaryBtn} onClick={() => editingData()}
                        disabled={!disabled}>Edit
                </button>
            </div>
            <div className={styles.siteSetupInner}>
                <TableSmall fields={smallTable} disabled={disabled}/>
                <div className={styles.siteSetupButtons}>
                    <button type="button" className={styles.primaryBtn} onClick={() => editingData()}
                            disabled={disabled}>Save
                    </button>
                    <button type="button" className={styles.primaryBtn}>Download Backup</button>
                    <button type="button" className={styles.primaryBtn}>Import to Page</button>
                </div>
            </div>

            {[data].map((item, index) => (
                <Tabs key={index} className={styles.siteSetupTabsWrapper}>
                    <TabList className={styles.siteSetupTabs}>
                        {Object.keys(data).map((keys, index) => {
                            if (keys !== 'DspType' && keys !== 'DspID' && keys !== 'SiteName') {
                                return (<Tab key={index}>{keys}</Tab>)
                            }
                            return null;
                        })}
                    </TabList>
                    {Object.keys(data).map((keys, index) => {
                        if (keys !== 'DspType' && keys !== 'DspID' && keys !== 'SiteName') {
                            if (headerTableName[0][keys]) {
                                return (
                                    <TabPanel key={index}>
                                        <SiteSetupTable keys={keys} array={item} titles={headerTableName[0][keys]}
                                                        errors={dataErrors}
                                                        disabled={disabled}/>
                                    </TabPanel>)
                            } else {
                                return (<TabPanel key={index}>
                                    <SiteSetupTable keys={keys} array={item} titles={headerTableName[0]['faders']}
                                                    errors={dataErrors}
                                                    disabled={disabled}/>
                                </TabPanel>)
                            }
                        }
                        return null;
                    })}
                </Tabs>
            ))}
        </section>
    );
};

