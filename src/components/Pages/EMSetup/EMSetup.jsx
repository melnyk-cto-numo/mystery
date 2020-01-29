// core
import React from 'react';

//library
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

//components
import {Button, Table} from "../../common";
import {TopRowButtons} from "./TopRowButtons/TopRowButtons";
import {Faders} from "./Faders/Faders";


// styles
import styles from './EMSetup.module.scss';

// api
import emsetup from '../../../api/emsetup.test'

const setup = [
    {id: 0, type: 'input', title: 'EQ timeout', value: ''},
    {id: 1, type: 'select', title: 'Mute LEDs', value: ['Normal', 'Standard']},
    {id: 2, type: 'select', title: 'Auto LEDs', value: ['Normal', 'Standard']},
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


export const EMSetup = () => {

    return (
        <section>
            <div className={styles.emSetupTitle}>
                <h2>EM Setup</h2>
                <Button text='Edit'/>
            </div>
            <Tabs className={styles.emSetupTabsWrapper}>
                <TabList className={styles.emSetupTabs}>
                    <Tab>EasyMix Setup</Tab>
                    <Tab>Top Row Buttons</Tab>
                    <Tab>Faders</Tab>
                </TabList>
                <TabPanel>
                    <Table data={setup}/>
                </TabPanel>
                <TabPanel>
                    <TopRowButtons data={emsetup.Buttons}/>
                </TabPanel>
                <TabPanel>
                    <Faders data={faders}/>
                </TabPanel>
            </Tabs>

            <div className={styles.emSetupButtons}>
                <Button text='Save Settings'/>
                <Button text='Download Config'/>
                <Button text='Upload Config'/>
            </div>

        </section>
    );
};