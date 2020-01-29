// core
import React from 'react';

//library
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';

//components
import {Button, Table} from "../../common";
import {TopRowButtons} from "./TopRowButtons/TopRowButtons";


// styles
import styles from './EMSetup.module.scss';

import emsetup from '../../../api/emsetup.test'
import faders from '../../../api/faders.test.json'

const setup = [
    {id: 0, type: 'input', title: 'EQ timeout', value: ''},
    {id: 1, type: 'select', title: 'Mute LEDs', value: ['Normal', 'Standard']},
    {id: 2, type: 'select', title: 'Auto LEDs', value: ['Normal', 'Standard']},
];


export const EMSetup = () => {

    console.log(faders.fader);
    return (
        <section>
            <div className={styles.emSetupTitle}>
                <h2>EM Setup</h2>
                <Button text='Edit'/>
            </div>
            <Tabs>
                <TabList>
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
                    <Table data={faders.fader}/>
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