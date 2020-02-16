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
import {statusActions} from "../../../bus/status/actions";
import {getSiteSetup} from "../../../bus/siteSetup/selectors";
import {getErrors} from "../../../bus/errors/selectors";
import {getStatus} from "../../../bus/status/selectors";
import {server} from "../../../REST";

//styles
import styles from './SiteSetup.module.scss';
const headerTableName = [
    {
        faders: ['No', 'Bank', 'Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['No', 'Bank', 'Link', 'ON', 'Control No.'],
        altFader2: ['No', 'Bank', 'Link', 'ON', 'Control No.'],
        altFader3: ['No', 'Bank', 'Link', 'ON', 'Control No.'],
        altToggle: ['No', 'Bank', 'Link', 'ON', 'Invert', 'Control No.'],
        mute: ['No', 'Bank', 'Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['No', 'Bank', 'Link', 'ON', 'Control No.'],
        meter2: ['No', 'Bank', 'Link', 'ON', 'Control No.'],
        hg: ['No', 'Bank', 'Link', 'ON', 'Control No.'],
        control: ['Name', 'No', 'Bank', 'Link', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
];

export const SiteSetup = () => {
    const [disabled, setDisabled] = useState(true);
    const [bank, setBank] = useState('EM4');

    const dispatch = useDispatch();
    const siteSetup = useSelector(getSiteSetup);
    const errors = useSelector(getErrors);
    const status = useSelector(getStatus);
    const data = siteSetup.siteSetup.data;
    const dataErrors = errors.errors.data;
    const model = status.status.data.model;

    useEffect(() => {
        dispatch(siteSetupActions.getSiteSetupAsync());
        dispatch(statusActions.getStatusAsync());
        dispatch(errorsActions.getErrorsAsync());
    }, []);


    useEffect(() => {

        // check model for Bank field on Status page
        switch (model) {
            case 'EM4':
                setBank(4);
                break;
            case 'EM8':
                setBank(8);
                break;
            case 'EM12':
                setBank(12);
                break;
            default:
                setBank('model not found');
                break;
        }
    }, [model]);


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

    const downloadingConfig = (el) => {
        const file = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([data, {model: model}, {errors: dataErrors}]));
        el.target.setAttribute("href", "data:" + file);
        el.target.setAttribute("download", "sitesetup.json");
    };

    const importing = (e) => {
        const file = e.target.files[0];
        if (file.length !== 0) {

            // validation resolution file
            if (file.type === 'application/json') {
                const handleFileLoad = async (e) => {
                    await server.setSiteSetup(e.target.result);
                    dispatch(siteSetupActions.getSiteSetupAsync());
                };
                const reader = new FileReader();
                reader.onload = handleFileLoad;
                reader.readAsText(file);
            } else {
                alert('please upload ".json" file');
            }
        }
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
                    <a className={styles.primaryBtn} onClick={(el) => downloadingConfig(el)}>Download Backup</a>
                    <label htmlFor="import" className={styles.primaryBtn}>Import to Page</label>
                    <input id='import' type="file" onChange={(e) => importing(e)}/>
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
                                                        errors={dataErrors} bank={bank}
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

