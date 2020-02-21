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
import {
    getBss,
    getHal,
    getJupiter,
    getQsys,
    getSiteSetup,
    getSymetrix, getTesira,
    getXilica
} from "../../../bus/siteSetup/selectors";
import {getErrors} from "../../../bus/errors/selectors";
import {getStatus} from "../../../bus/status/selectors";


//styles
import styles from './SiteSetup.module.scss';

const DSP = {
    siteName: {label: 'Site name', type: 'text', value: 'QSYS'},
    dsp: {label: 'DSP', type: 'select', value: ['BSS', 'Hal', 'Jupiter', 'QSYS', 'Symetrix', 'Tesira', 'Xilica']},
};

const headerTableName = {
    bss: {
        faders: ['No', 'Bank', 'Link', 'ON', 'Name', 'Object ID', 'SV ID'],
        altFader1: ['No', 'Bank', 'Link', 'ON', 'Object ID', 'SV ID'],
        altFader2: ['No', 'Bank', 'Link', 'ON', 'Object ID', 'SV ID'],
        altToggle: ['No', 'Bank', 'Link', 'ON', 'Invert', 'Object ID', 'SV ID'],
        mute: ['No', 'Bank', 'Link', 'ON', 'Invert', 'Object ID', 'SV ID'],
        meter1: ['No', 'Bank', 'Link', 'ON', 'Object ID', 'SV ID'],
        meter2: ['No', 'Bank', 'Link', 'ON', 'Object ID', 'SV ID'],
        hg: ['No', 'Bank', 'Link', 'ON', 'Object ID', 'SV ID'],
        control: ['Name', 'No', 'Bank', 'Link', 'ON', 'Read Only', 'Link to Button', 'Type', 'Object ID', 'SV ID'],
    },
    hal: {
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
    jupiter: {
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
    qsys: {
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
    symetrix: {
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
    tesira: {
        faders: ['No', 'Bank', 'Link', 'ON', 'Name', 'Instance ID', 'Index'],
        altFader1: ['No', 'Bank', 'Link', 'ON', 'Instance ID', 'Index'],
        altFader2: ['No', 'Bank', 'Link', 'ON', 'Instance ID', 'Index'],
        altFader3: ['No', 'Bank', 'Link', 'ON', 'Instance ID', 'Index'],
        altToggle: ['No', 'Bank', 'Link', 'ON', 'Invert', 'Instance ID', 'Index'],
        mute: ['No', 'Bank', 'Link', 'ON', 'Invert', 'Instance ID', 'Index'],
        meter1: ['No', 'Bank', 'Link', 'ON', 'Instance ID', 'Index'],
        meter2: ['No', 'Bank', 'Link', 'ON', 'Instance ID', 'Index'],
        hg: ['No', 'Bank', 'Link', 'ON', 'Instance ID', 'Index'],
        control: ['Name', 'No', 'Bank', 'Link', 'ON', 'Read Only', 'Link to Button', 'Type', 'Instance ID', 'Index'],
    },
    xilica: {
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
};

export const SiteSetup = () => {
    const dispatch = useDispatch();

    const bss = useSelector(getBss);
    const hal = useSelector(getHal);
    const jupiter = useSelector(getJupiter);
    const qsys = useSelector(getQsys);
    const symetrix = useSelector(getSymetrix);
    const tesira = useSelector(getTesira);
    const xilica = useSelector(getXilica);
    const dataErrors = useSelector(getErrors);
    const status = useSelector(getStatus);
    const siteSetup = useSelector(getSiteSetup);


    const [disabled, setDisabled] = useState(true);
    const [bank, setBank] = useState('EM4');
    const [dspType, setDspType] = useState(DSP.dsp.value[3].toLowerCase());
    const [selectedTab, setSelectedTab] = useState(headerTableName.qsys);
    const [data, setData] = useState(siteSetup);

    useEffect(() => {
        setData(siteSetup)
    }, [siteSetup]);


    useEffect(() => {
        switch (dspType) {
            case 'bss':
                setData(bss);
                setSelectedTab(headerTableName[dspType]);
                break;
            case 'hal':
                setData(hal);
                setSelectedTab(headerTableName[dspType]);
                break;
            case 'jupiter':
                setData(jupiter);
                setSelectedTab(headerTableName[dspType]);
                break;
            case 'qsys':
                setData(qsys);
                setSelectedTab(headerTableName[dspType]);
                break;
            case 'symetrix':
                setData(symetrix);
                setSelectedTab(headerTableName[dspType]);
                break;
            case 'tesira':
                setData(tesira);
                setSelectedTab(headerTableName[dspType]);
                break;
            case 'xilica':
                setData(xilica);
                setData(headerTableName[dspType]);
                break;
            default:
                setData(qsys);
                setSelectedTab(headerTableName['qsys']);
                break;
        }
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
        dispatch(siteSetupActions.getQsysAsync());
        dispatch(siteSetupActions.getSymetrixAsync());
        dispatch(siteSetupActions.getTesiraAsync());
        dispatch(siteSetupActions.getXilicaAsync());
    }, []);


    if (data.DspType === undefined) {
        return false;
    }

    const editingData = () => {
        setDisabled(!disabled)
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
            </div>
            <div className={styles.siteSetupInner}>
                <DspTable
                    fields={DSP}
                    dspType={dspType}
                    setDspType={setDspType}
                    disabled={disabled}/>
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
                                        array={item}
                                        titles={headerTableName[dspType][keys]}
                                        errors={dataErrors}
                                        bank={bank}
                                        disabled={disabled}/>
                                </TabPanel>)
                        }
                        return null;
                    })}
                </Tabs>
            ))}
        </section>
    );
};

