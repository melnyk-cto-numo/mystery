// core
import React, {useEffect, useState} from 'react';

// library
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

//components
import {Button, TableSmall} from "../../common";
import {SiteSetupTable} from "./components/SiteSetupTable/SiteSetupTable";

//styles
import styles from './SiteSetup.module.scss';

// api
import bbc from '../../../api/siteDefaults/BSS_default'
import hal from '../../../api/siteDefaults/HAL_default'
import jupiter from '../../../api/siteDefaults/Jupiter_default'
import qsys from '../../../api/siteDefaults/QSYS_default'
import symetrix from '../../../api/siteDefaults/Symetrix_default'
import tesira from '../../../api/siteDefaults/Tesira_default'
import xilica from '../../../api/siteDefaults/Xilica_default'

const smallTable = [
    {id: '0', label: 'Site name', type: 'text', value: 'QSYS'},
    {
        id: '2',
        label: 'Test Indicators',
        type: 'select',
        value: ['BBC', 'Hal', 'Jupiter', 'Q-SYS', 'Symetrix', 'Tesira', 'Xilica']
    },
];


const headerTableName = [
    {
        faders: ['ON', 'Link', 'Name', 'Control No.'],
        altFader1: ['ON', 'Link', 'Control No.'],
        altFader2: ['ON', 'Link', 'Control No.'],
        altToggle: ['ON', 'Link', 'Name', 'Control No.'],
        meter1: ['ON', 'Link', 'Control No.'],
        meter2: ['ON', 'Link', 'Control No.'],
        mute: ['ON', 'Link', 'Name', 'Control No.'],
        hg: ['ON', 'Link', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Link', 'On Name', 'Off Name', 'Name', 'Control No.'],
    },
    {
        faders: ['ON', 'Link', 'Control No.'],
        altFader1: ['ON', 'Control No.'],
        altFader2: ['ON', 'Control No.'],
        altFader3: ['ON', 'Control No.'],
        altToggle: ['ON', 'Name', 'Control No.'],
        mute: ['ON', 'Name', 'Control No.'],
        meter1: ['ON', 'Control No.'],
        meter2: ['ON', 'Control No.'],
        hg: ['ON', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Name', 'Control No.'],
    },
    {
        faders: ['ON', 'Link', 'Control No.'],
        altFader1: ['ON', 'Control No.'],
        altFader2: ['ON', 'Control No.'],
        altFader3: ['ON', 'Control No.'],
        altToggle: ['ON', 'Name', 'Control No.'],
        mute: ['ON', 'Name', 'Control No.'],
        meter1: ['ON', 'Control No.'],
        meter2: ['ON', 'Control No.'],
        hg: ['ON', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Name', 'Control No.'],
    },
    {
        faders: ['ON', 'Link', 'Control No.'],
        altFader1: ['ON', 'Control No.'],
        altFader2: ['ON', 'Control No.'],
        altFader3: ['ON', 'Control No.'],
        altToggle: ['ON', 'Name', 'Control No.'],
        mute: ['ON', 'Name', 'Control No.'],
        meter1: ['ON', 'Control No.'],
        meter2: ['ON', 'Control No.'],
        hg: ['ON', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Name', 'Control No.'],
    },
    {
        faders: ['ON', 'Link', 'Control No.'],
        altFader1: ['ON', 'Control No.'],
        altFader2: ['ON', 'Control No.'],
        altFader3: ['ON', 'Control No.'],
        altToggle: ['ON', 'Name', 'Control No.'],
        mute: ['ON', 'Name', 'Control No.'],
        meter1: ['ON', 'Control No.'],
        meter2: ['ON', 'Control No.'],
        hg: ['ON', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Name', 'Control No.'],
    },
    {
        faders: ['ON', 'Link', 'Name', 'Control No.'],
        altFader1: ['ON', 'Link', 'Interface', 'Control No.'],
        altFader2: ['ON', 'Link', 'Interface', 'Control No.'],
        altFader3: ['ON', 'Link', 'Control No.'],
        altToggle: ['ON', 'Name', 'Link', 'Interface', 'Control No.'],
        mute: ['ON', 'Name', 'Link', 'Interface', 'Control No.'],
        meter1: ['ON', 'Link', 'Interface', 'Control No.'],
        meter2: ['ON', 'Link', 'Interface', 'Control No.'],
        hg: ['ON', 'Link', 'Interface', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Link', 'On Name', 'Off Name', 'Control No.'],
    },
    {
        faders: ['ON', 'Link', 'Control No.'],
        altFader1: ['ON', 'Control No.'],
        altFader2: ['ON', 'Control No.'],
        altFader3: ['ON', 'Control No.'],
        altToggle: ['ON', 'Name', 'Control No.'],
        mute: ['ON', 'Name', 'Control No.'],
        meter1: ['ON', 'Control No.'],
        meter2: ['ON', 'Control No.'],
        hg: ['ON', 'Control No.'],
        control: ['No', 'ON', 'Read Only', 'Link to Button', 'Name', 'Control No.'],
    },
];

export const SiteSetup = () => {
    const [api, setApi] = useState(bbc);
    const [indicator, setIndicator] = useState(0);
    const [headerTable, setHeaderTable] = useState(headerTableName[0]);
    const [fieldId, setFieldId] = useState(true);

    useEffect(() => {
        switch (indicator) {
            case 0:
                setApi(bbc);
                setHeaderTable(headerTableName[indicator]);
                break;
            case 1:
                setApi(hal);
                setHeaderTable(headerTableName[indicator]);
                break;
            case 2:
                setApi(jupiter);
                setHeaderTable(headerTableName[indicator]);
                break;
            case 3:
                setApi(qsys);
                setHeaderTable(headerTableName[indicator]);
                break;
            case 4:
                setApi(symetrix);
                setHeaderTable(headerTableName[indicator]);
                break;
            case 5:
                setApi(tesira);
                setHeaderTable(headerTableName[indicator]);
                break;
            case 6:
                setApi(xilica);
                setHeaderTable(headerTableName[indicator]);
                break;
            default:
                setApi(bbc);
                setHeaderTable(headerTableName[0]);
                break;
        }
        if (api) {
            setFieldId(true);
        } else {
            setFieldId(false)
        }

    }, [indicator]);


    return (
        <section className={styles.siteSetup}>
            <div className={styles.siteSetupTitle}>
                <h2>
                    Site Setup
                </h2>
                <Button text='Edit'/>
            </div>
            <div className={styles.siteSetupInner}>
                <TableSmall fields={smallTable} setIndicator={setIndicator} fieldId={fieldId}/>
                <div className={styles.siteSetupButtons}>
                    <Button text='Save'/>
                    <Button text='Download Backup'/>
                    <Button text='Import to Page'/>
                </div>
            </div>

            {[api].map((data, index) => (
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


                            console.log(headerTableName[keys]);
                            // console.log(keys)
                            if (headerTable[keys]) {
                                return (
                                    <TabPanel key={index}>
                                        <SiteSetupTable keys={keys} array={data} titles={headerTable[keys]}/>
                                    </TabPanel>)
                            } else {
                                return (<TabPanel key={index}>
                                    <SiteSetupTable keys={keys} array={data} titles={headerTable['faders']}/>
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

