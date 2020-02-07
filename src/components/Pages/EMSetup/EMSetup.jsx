// core
import React, {useEffect, useState} from 'react';

//library
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

//components
import {Table} from "../../common";
import {TopRowButtons, Faders} from "./components";
import {useDispatch} from "react-redux";
import {emSetupActions} from "../../../bus/emSetup/actions";


// styles
import styles from './EMSetup.module.scss';

// api
import emsetup from '../../../api/emsetup.test'

const setup = [
    {id: 0, type: 'input', title: 'EQ timeout', value: ''},
];

const faders = {
    header: ['Location', ['Fader'], 'Mute', 'Signal', 'High Gain'],
    body:
        [
            {
                location: 'Fader 1',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 2',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 3',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 4',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 5',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 6',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 7',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 8',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 9',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 10',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
            {
                location: 'Fader 11',
                fader: ['Fader'],
                mute: ['OFF', 'ON'],
                signal: ['OFF', 'ON'],
                highGain: ['OFF', 'ON']
            },
        ],
};


const titleTopRowButtons = {
    header: ['Buttons', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    column: ['Type', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
};


export const EMSetup = () => {
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(true);

    const editingData = () => {
        setDisabled(!disabled)
    };


    useEffect(() => {
        dispatch(emSetupActions.getEmSetupAsync());
    }, []);


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
                    <Tab>Faders</Tab>
                </TabList>
                <TabPanel>
                    <Table data={setup} disabled={disabled}/>
                </TabPanel>
                <TabPanel>
                    <TopRowButtons data={emsetup.Buttons} title={titleTopRowButtons} disabled/>
                </TabPanel>
                <TabPanel>
                    <Faders data={faders} disabled={disabled}/>
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