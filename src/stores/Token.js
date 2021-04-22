import LocalStorageConstants from 'constants/LocalStorageConstants';


const getToken = () => {
    let token = window.localStorage.getItem(LocalStorageConstants.USER__TOKEN);
    return token;
};

const setToken = (token) => {
    window.localStorage.setItem(LocalStorageConstants.USER__TOKEN, token);
};

export default { getToken, setToken };

