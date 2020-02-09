// core
import React, {useEffect, useState} from 'react';

//library
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

//components
import {Table} from "../../common";
import {TopRowButtons} from "./components";
import {useDispatch, useSelector} from "react-redux";
import {emSetupActions} from "../../../bus/emSetup/actions";
import {getEmSetup} from "../../../bus/emSetup/selectors";


// styles
import styles from './EMSetup.module.scss';

export const EMSetup = () => {
    const dispatch = useDispatch();
    const emsetup = useSelector(getEmSetup);
    const data = emsetup.emSetup.data;

    const [disabled, setDisabled] = useState(true);

    const editingData = () => {
        setDisabled(!disabled)
    };


    useEffect(() => {
        dispatch(emSetupActions.getEmSetupAsync());
    }, []);


    if (data.Settings === undefined) {
        return false;
    }

    const setup = [
        {id: 0, type: 'input', title: 'Alternate Toggle timeout', value: data.Settings.altFaderTimeout},
        {id: 1, type: 'input', title: 'Alternate Fader timeout', value: data.Settings.altToggleTimeout},
    ];

    return (
        <section>
            <div className={styles.emSetupTitle}>
                <h2>EM Setup</h2>
                <button type="button" className={styles.primaryBtn} disabled={!disabled}
                        onClick={() => editingData()}>Edit
                </button>
            </div>
            <Tabs className={styles.emSetupTabsWrapper}>
                <TabList className={styles.emSetupTabs}>
                    <Tab>EasyMix Setup</Tab>
                    <Tab>Top Row Buttons</Tab>
                </TabList>
                <TabPanel>
                    <Table data={setup} disabled={disabled}/>
                </TabPanel>
                <TabPanel>
                    <TopRowButtons data={data.Buttons} disabled/>
                </TabPanel>
            </Tabs>

            <div className={styles.emSetupButtons}>
                <button type="button" className={styles.primaryBtn} disabled={disabled}
                        onClick={() => editingData()}>Save Settings
                </button>
                <button type="button" className={styles.primaryBtn}>Download Config</button>
                <button type="button" className={styles.primaryBtn}>Upload Config</button>
            </div>

        </section>
    );
};