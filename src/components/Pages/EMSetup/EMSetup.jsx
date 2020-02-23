// core
import React, {useEffect, useState} from 'react';

//library
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

//components
import {TopRowButtons} from "./components";
import {useDispatch, useSelector} from "react-redux";
import {emSetupActions} from "../../../bus/emSetup/actions";
import {mysteryActions} from "../../../bus/mystery/actions";
import {statusActions} from "../../../bus/status/actions";
import {siteSetupActions} from "../../../bus/siteSetup/actions";
import {getEmSetup} from "../../../bus/emSetup/selectors";
import {getStatus} from "../../../bus/status/selectors";
import {getSiteSetup} from "../../../bus/siteSetup/selectors";
import {server} from "../../../REST";
import {EasyMixSetup} from "./components/EasyMixSetup/EasyMixSetup";


// styles
import styles from './EMSetup.module.scss';

export const EMSetup = () => {
    const dispatch = useDispatch();
    const data = useSelector(getEmSetup);
    const status = useSelector(getStatus);
    const siteSetup = useSelector(getSiteSetup);
    const controls = siteSetup.control;
    const model = status.model;

    const [disabled, setDisabled] = useState(true);
    const [column, setColumn] = useState('EM4');
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');

    const editingData = () => {
        setDisabled(!disabled)
    };
    const cancelingData = () => {
        setDisabled(!disabled);

        dispatch(emSetupActions.setEmSetup({}));
        dispatch(emSetupActions.getEmSetupAsync());
    };

    const savingData = async () => {
        setDisabled(!disabled);
        await server.setEmSetup({
            Settings: {
                altFaderTimeout: data.Settings.altFaderTimeout,
                altToggleTimeout: data.Settings.altToggleTimeout
            },
            Buttons: [...data.Buttons]
        })
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
        const file = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        el.target.setAttribute("href", "data:" + file);
        el.target.setAttribute("download", "emsetup.json");
    };

    const uploading = async (e) => {
        const file = e.target.files[0];
        if (file.length !== 0) {

            // validation resolution file
            if (file.type === 'application/json') {
                const handleFileLoad = async (e) => {
                    await server.setSiteSetup(e.target.result);
                    dispatch(emSetupActions.getEmSetupAsync());
                };
                const reader = new FileReader();
                reader.onload = handleFileLoad;
                reader.readAsText(file);
            } else {
                alert('please upload ".json" file');
            }
        }
    };

    useEffect(() => {
        dispatch(emSetupActions.getEmSetupAsync());
        dispatch(statusActions.getStatusAsync());
        dispatch(siteSetupActions.getSiteSetupAsync());
    }, [dispatch]);

    useEffect(() => {

        // check model for Bank field on Status page
        switch (model) {
            case 'EM4':
                setColumn(4);
                break;
            case 'EM8':
                setColumn(8);
                break;
            case 'EM12':
                setColumn(12);
                break;
            default:
                setColumn('model not found');
                break;
        }
    }, [model]);

    if (data.Settings === undefined) {
        return false;
    }

    const setup = [
        {id: 0, type: 'input', title: 'Alternate Toggle timeout', altFaderTimeout: data.Settings.altFaderTimeout},
        {id: 1, type: 'input', title: 'Alternate Fader timeout', altToggleTimeout: data.Settings.altToggleTimeout},
    ];

    return (
        <section>
            <div className={styles.emSetupTitle}>
                <h2>EM Setup</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editingData()}>Edit
                </button>
                <div className="notice">{notice}</div>
                <div className="error">{error}</div>
            </div>
            <Tabs className={styles.emSetupTabsWrapper}>
                <TabList className={styles.emSetupTabs}>
                    <Tab>EasyMix Setup</Tab>
                    <Tab>Top Row Buttons</Tab>
                </TabList>
                <TabPanel>
                    <div className={styles.wrapper}>
                        <div className={styles.table}>
                            {setup.map((item, index) => {
                                const key = Object.keys(item)[Object.keys(item).length - 1];
                                if (item[key] === undefined) return false;
                                return (<EasyMixSetup objKey={key} key={index} item={item} disabled={disabled}/>)
                            })}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={styles.wrapper}>
                        <div className={styles.table + ' ' + styles.tableTopRowButtons}>
                            {data.Buttons.slice(0, column).map((item, index) => (
                                <TopRowButtons key={index} item={item} data={data} row={index}
                                               controls={controls} disabled={disabled}/>))}
                        </div>
                    </div>
                </TabPanel>
            </Tabs>

            <div className={styles.emSetupButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => savingData()}>Save Settings
                </button>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => cancelingData()}>Cancel
                </button>
                {disabled && <>
                    <a href="/" className={styles.primaryBtn} onClick={(el) => downloadingConfig(el)}>Download
                        Config</a>
                    <label htmlFor="upload" className={styles.primaryBtn}>Upload Config</label>
                    <input id='upload' type='file' onChange={(e) => uploading(e)}/></>}
            </div>

        </section>
    );
};