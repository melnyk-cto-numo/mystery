// core
import React, {useEffect, useState} from 'react';

// library
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {useDispatch, useSelector} from "react-redux";


//components
import {DspTable} from "./components/DspTable/DspTable";
import {SiteSetupTable} from "./components/SiteSetupTable/SiteSetupTable";
import {server} from "../../../REST";

import {siteSetupActions} from "../../../bus/siteSetup/actions";
import {errorsActions} from "../../../bus/errors/actions";
import {statusActions} from "../../../bus/status/actions";
import {getSiteSetup} from "../../../bus/siteSetup/selectors";
import {getErrors} from "../../../bus/errors/selectors";
import {getStatus} from "../../../bus/status/selectors";


//styles
import styles from './SiteSetup.module.scss';
import {mysteryActions} from "../../../bus/mystery/actions";

const DSP = {
    siteName: {label: 'Site name', type: 'text', value: 'QSYS'},
    dsp: {label: 'DSP', type: 'select', value: ['BSS', 'Hal', 'Jupiter', 'QSYS', 'Symetrix', 'Tesira', 'Xilica']},
    DspID: {label: 'ID', type: 'text', value: '0000'},
};

const headerTableName = {
    bss: {
        faders: ['No', 'Link', 'ON', 'Name', 'Object ID', 'SV ID'],
        altFader1: ['No', 'Link', 'ON', 'Object ID', 'SV ID'],
        altFader2: ['No', 'Link', 'ON', 'Object ID', 'SV ID'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Object ID', 'SV ID'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Object ID', 'SV ID'],
        meter1: ['No', 'Link', 'ON', 'Object ID', 'SV ID'],
        meter2: ['No', 'Link', 'ON', 'Object ID', 'SV ID'],
        hg: ['No', 'Link', 'ON', 'Object ID', 'SV ID'],
        control: ['Name', 'No', 'Link', 'ON', 'Read Only', 'Link to Button', 'Type', 'Object ID', 'SV ID'],
    },
    hal: {
        faders: ['No', 'Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['No', 'Link', 'ON', 'Control No.'],
        altFader2: ['No', 'Link', 'ON', 'Control No.'],
        altFader3: ['No', 'Link', 'ON', 'Control No.'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['No', 'Link', 'ON', 'Control No.'],
        meter2: ['No', 'Link', 'ON', 'Control No.'],
        hg: ['No', 'Link', 'ON', 'Control No.'],
        control: ['No', 'Link', 'Name', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
    jupiter: {
        faders: ['No', 'Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['No', 'Link', 'ON', 'Control No.'],
        altFader2: ['No', 'Link', 'ON', 'Control No.'],
        altFader3: ['No', 'Link', 'ON', 'Control No.'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['No', 'Link', 'ON', 'Control No.'],
        meter2: ['No', 'Link', 'ON', 'Control No.'],
        hg: ['No', 'Link', 'ON', 'Control No.'],
        control: ['No', 'Link', 'Name', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
    qsys: {
        faders: ['No', 'Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['No', 'Link', 'ON', 'Control No.'],
        altFader2: ['No', 'Link', 'ON', 'Control No.'],
        altFader3: ['No', 'Link', 'ON', 'Control No.'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['No', 'Link', 'ON', 'Control No.'],
        meter2: ['No', 'Link', 'ON', 'Control No.'],
        hg: ['No', 'Link', 'ON', 'Control No.'],
        control: ['No', 'Link', 'Name', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
    symetrix: {
        faders: ['No', 'Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['No', 'Link', 'ON', 'Control No.'],
        altFader2: ['No', 'Link', 'ON', 'Control No.'],
        altFader3: ['No', 'Link', 'ON', 'Control No.'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['No', 'Link', 'ON', 'Control No.'],
        meter2: ['No', 'Link', 'ON', 'Control No.'],
        hg: ['No', 'Link', 'ON', 'Control No.'],
        control: ['No', 'Link', 'Name', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
    tesira: {
        faders: ['No', 'Link', 'ON', 'Name', 'Instance ID', 'Index'],
        altFader1: ['No', 'Link', 'ON', 'Instance ID', 'Index'],
        altFader2: ['No', 'Link', 'ON', 'Instance ID', 'Index'],
        altFader3: ['No', 'Link', 'ON', 'Instance ID', 'Index'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Instance ID', 'Index'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Instance ID', 'Index'],
        meter1: ['No', 'Link', 'ON', 'Instance ID', 'Index'],
        meter2: ['No', 'Link', 'ON', 'Instance ID', 'Index'],
        hg: ['No', 'Link', 'ON', 'Instance ID', 'Index'],
        control: ['No', 'Link', 'Name', 'ON', 'Read Only', 'Link to Button', 'Type', 'Instance ID', 'Index'],
    },
    xilica: {
        faders: ['No', 'Link', 'ON', 'Name', 'Control No.'],
        altFader1: ['No', 'Link', 'ON', 'Control No.'],
        altFader2: ['No', 'Link', 'ON', 'Control No.'],
        altFader3: ['No', 'Link', 'ON', 'Control No.'],
        altToggle: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        mute: ['No', 'Link', 'ON', 'Invert', 'Control No.'],
        meter1: ['No', 'Link', 'ON', 'Control No.'],
        meter2: ['No', 'Link', 'ON', 'Control No.'],
        hg: ['No', 'Link', 'ON', 'Control No.'],
        control: ['No', 'Link', 'Name', 'ON', 'Read Only', 'Link to Button', 'Type', 'Control No.'],
    },
};

export const SiteSetup = () => {
    const dispatch = useDispatch();

    const dataErrors = useSelector(getErrors);
    const status = useSelector(getStatus);
    const data = useSelector(getSiteSetup);


    const [disabled, setDisabled] = useState(true);
    const [bank, setBank] = useState('EM4');
    const [dspType, setDspType] = useState(DSP.dsp.value[3].toLowerCase());
    const [selectedTab, setSelectedTab] = useState(headerTableName.qsys);
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');
    const [fieldValidation, setFieldValidation] = useState(true);
    const [inputHeaderValidation, setInputHeaderValidation] = useState(true);


    useEffect(() => {
        setSelectedTab(headerTableName[dspType]);
    }, [dspType]);


    useEffect(() => {
        // check model for Bank field on Status page
        switch (status.model) {
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
    }, [status]);


    useEffect(() => {
        dispatch(siteSetupActions.getSiteSetupAsync());
        dispatch(statusActions.getStatusAsync());
        dispatch(errorsActions.getErrorsAsync());

        dispatch(siteSetupActions.getBssAsync());
        dispatch(siteSetupActions.getQsysAsync());
        dispatch(siteSetupActions.getHalAsync());
        dispatch(siteSetupActions.getJupiterAsync());
        dispatch(siteSetupActions.getSymetrixAsync());
        dispatch(siteSetupActions.getTesiraAsync());
        dispatch(siteSetupActions.getXilicaAsync());
    }, [dispatch]);


    useEffect(() => {
        if (Object.keys(data).length === 0) return;
        if (data.SiteName !== '' && data.DspID !== '') {
            setFieldValidation(true)
        } else {
            setFieldValidation(false)
        }
    }, [data]);

    if (data.DspType === undefined) {
        return false;
    }

    const editingData = () => {
        setDisabled(!disabled)
    };

    const cancelingData = () => {
        setDisabled(!disabled);

        dispatch(siteSetupActions.setSiteSetup({}));
        dispatch(siteSetupActions.getSiteSetupAsync());
    };

    const savingData = async () => {
        setDisabled(!disabled);

        await server.setSiteSetup(({...data}))
            .then((response) => {
                if (response.status === 200) {
                    setNotice('The data was saved successfully');
                    setTimeout(() => {
                        setNotice('');
                    }, 3000);
                }
            })
            .catch(() => {
                setError('The internet connection has timed out');
                setTimeout(() => {
                    setError('');
                }, 3000);
            });

        dispatch(mysteryActions.setShowPopup(true));
        setTimeout(() => {
            dispatch(mysteryActions.setShowPopup(false));
        }, 1000)
    };

    const downloadingConfig = (el) => {
        const file = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify([data, {model: status.model}, {errors: dataErrors}]));
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
                <div className="notice">{notice}</div>
                <div className="error">{error}</div>
            </div>
            <div className={styles.siteSetupInner}>
                <DspTable
                    data={data}
                    fields={DSP}
                    dspType={dspType}
                    setDspType={setDspType}
                    disabled={disabled}/>
                <div className={styles.siteSetupButtons}>
                    <button
                        type="button"
                        className={fieldValidation && inputHeaderValidation ? styles.primaryBtn : styles.primaryBtn + ' ' + styles.disabled}
                        onClick={() => savingData()}
                        disabled={disabled}>Save
                    </button>
                    <button type="button" className={styles.primaryBtn} disabled={disabled}
                            onClick={() => cancelingData()}>Cancel
                    </button>
                    {disabled &&
                    (<>
                        <a href="/" className={styles.primaryBtn} onClick={(el) => downloadingConfig(el)}>Download
                            Backup</a>
                        <label htmlFor="import" className={styles.primaryBtn}>Import to Page</label>
                        <input id='import' type="file" onChange={(e) => importing(e)}/>
                    </>)}

                </div>
            </div>

            {[data].map((item, index) => (
                <Tabs key={index} className={styles.siteSetupTabsWrapper}>
                    <TabList className={styles.siteSetupTabs}>
                        {Object.keys(selectedTab).map((keys, index) => {
                            if (keys !== 'DspType' && keys !== 'DspID' && keys !== 'SiteName' && keys !== 'updateRate') {
                                return (<Tab key={index}>{keys}</Tab>)
                            }
                            return null;
                        })}
                    </TabList>
                    {Object.keys(selectedTab).map((keys, index) => {
                        if (keys !== 'DspType' && keys !== 'DspID' && keys !== 'SiteName' && keys !== 'updateRate') {
                            return (
                                <TabPanel key={index}>
                                    <SiteSetupTable
                                        keys={keys}
                                        dspType={dspType}
                                        array={item}
                                        titles={headerTableName[dspType][keys]}
                                        errors={dataErrors}
                                        bank={bank}
                                        disabled={disabled}
                                        setInputHeaderValidation={setInputHeaderValidation}/>
                                </TabPanel>)
                        }
                        return null;
                    })}
                </Tabs>
            ))}
        </section>
    );
};

