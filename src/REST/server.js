import axios from 'axios/index';

export const getStatus = () => axios.get('http://167.172.238.159/status.php');
export const getNetwork = () => axios.get('http://167.172.238.159/network.php');
