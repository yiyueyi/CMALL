import axios from 'axios';
import { message } from 'antd';
import Token from 'stores/Token';
import AppConstants from 'constants/AppConstants';

const setToken = (token) => {
    Token.setToken(token);
};

const getToken = () => {
    return Token.getToken();
};

const executeRegister = async (method, params) => {
    return new Promise((resolve, reject) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.post(url, params, {
            headers: {
                // token: getToken(),
            }
        }).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
        });
    });
};

const executePost = async (method, params) => {
    return new Promise((resolve, reject) => {
        const url = AppConstants.API_GATEWAY_URL + method;
        axios.post(url, params, {
            headers: {
                token: getToken(),
            }
        }).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error);
            if(500===error.code) {
                message.error('服务器开小差了，请稍后重试');
            }
        });
    });
};

const doGet = async (url) => {
    return await new Promise((resolve) => {
        axios.get(url).then(resp => {
            resolve(resp.data);
        }).catch(error => {
            console.log(error.message);
        });
    });
};

export default { setToken, executeRegister, doGet, getToken, executePost };
