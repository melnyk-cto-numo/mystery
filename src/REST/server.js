import apiBase from "./apiBase";


// load progress file on server
const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
};

export const getStatus = () => apiBase.get(`/status.php`);
export const getNetwork = () => apiBase.get(`/network.php`);
export const setNetwork = ({network, myIP, primaryDNS, secondaryDNS, mode, dspIP, dspPort, comType}) => apiBase.post(`/network.php`, {
    network,
    myIP,
    primaryDNS,
    secondaryDNS,
    mode,
    dspIP,
    dspPort,
    comType
});
export const getEmSetup = () => apiBase.get(`/emsetup.php`);
export const getSiteSetup = () => apiBase.get(`/sitesetup.php`);
export const getErrors = () => apiBase.get(`/errors.php`);
export const getFader = () => apiBase.get(`/faders.php`);
export const getCommand = (data, config) => apiBase.post(`/command.php`, data, config);

export const firmware = (data) => apiBase.post(`/firmware.bin`, data, config);
