import axios from 'axios/index';

export const getStatus = () => axios.get('http://167.172.238.159/status.php');
export const getNerwork = () => axios.get('http://167.172.238.159/network.php');
export const setNerwork = () => axios.post('http://167.172.238.159/status.php');