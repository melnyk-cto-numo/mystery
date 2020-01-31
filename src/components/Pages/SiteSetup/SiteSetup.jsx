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


export const SiteSetup = () => {
    const [api, setApi] = useState(bbc);
    const [indicator, setIndicator] = useState(0);

    useEffect(() => {
        switch (indicator) {
            case 0:
                setApi(bbc);
                break;
            case 1:
                setApi(hal);
                break;
            case 2:
                setApi(jupiter);
                break;
            case 3:
                setApi(qsys);
                break;
            case 4:
                setApi(symetrix);
                break;
            case 5:
                setApi(tesira);
                break;
            case 6:
                setApi(xilica);
                break;
            default:
                setApi(bbc);
                break;
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
            <TableSmall fields={smallTable} setIndicator={setIndicator}/>
            {[api].map((data, index) => (
                <Tabs key={index} className={styles.emSetupTabsWrapper}>
                    <TabList className={styles.emSetupTabs}>
                        {Object.keys(data).map((keys, index) => {
                            if (keys !== 'DspType' && keys !== 'DspID' && keys !== 'SiteName') {
                                return (<Tab key={index}>{keys}</Tab>)
                            }
                            return null;
                        })}
                    </TabList>
                    {Object.keys(data).map((keys, index) => {
                        if (keys !== 'DspType' && keys !== 'DspID' && keys !== 'SiteName') {
                            return (
                                <TabPanel key={index}>
                                    <SiteSetupTable keys={keys} array={data}/>
                                </TabPanel>)
                        }
                        return null;
                    })}
                </Tabs>
            ))}
        </section>
    );
};

