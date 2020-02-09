import apiBase from "./apiBase";

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
