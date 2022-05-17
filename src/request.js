import axios, { CancelToken } from 'axios';
axios.interceptors.response.use(response => response.data);
axios.defaults.baseURL = 'http://localhost:8080';
export default axios;
export { CancelToken }