import apiBase from "./apiBase";


// load progress file on server
const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
};

export const getBss = () => apiBase.get(`/sitesetup.php?DSP=BSS`);
export const getHal = () => apiBase.get(`/sitesetup.php?DSP=HAL`);
export const getJupiter = () => apiBase.get(`/sitesetup.php?DSP=Jupiter`);
export const getQsys = () => apiBase.get(`/sitesetup.php?DSP=QSYS`);
export const getSymetrix = () => apiBase.get(`/sitesetup.php?DSP=Symetrix`);
export const getTesira = () => apiBase.get(`/sitesetup.php?DSP=Tesira`);
export const getXilica = () => apiBase.get(`/sitesetup.php?DSP=Xilica`);

export const getStatus = () => apiBase.get(`/status.php`);
export const getNetwork = () => apiBase.get(`/network.php`);
export const setNetwork = (data) => apiBase.post(`/network.php`, data);
export const getEmSetup = () => apiBase.get(`/emsetup.php`);
export const setEmSetup = (data) => apiBase.post(`/emsetup.php`, data);
export const getSiteSetup = () => apiBase.get(`/sitesetup.php`);
export const setSiteSetup = (data) => apiBase.post(`/sitesetup.php`, data);
export const getErrors = () => apiBase.get(`/errors.php`);
export const getFader = () => apiBase.get(`/faders.php`);
export const setFader = (data) => apiBase.post(`/faders.php`, data);
export const getCommand = (data, config) => apiBase.post(`/command.php`, data, config);

export const firmware = (data) => apiBase.post(`/firmware.bin`, data, config);
