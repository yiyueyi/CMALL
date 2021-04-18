import LocalStorageConstants from 'constants/LocalStorageConstants';


const getToken = () => {
    let token = window.localStorage.getItem(LocalStorageConstants.APP__TOKEN);
    return token;
};

const setToken = (token) => {
    window.localStorage.setItem(LocalStorageConstants.APP__TOKEN, token);
};

export default { getToken, setToken };

