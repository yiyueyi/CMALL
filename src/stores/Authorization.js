import LocalStorageConstants from 'constants/LocalStorageConstants';


const getAuthorization = () => {
    let authorization = window.localStorage.getItem(LocalStorageConstants.APP__AUTHORIZATION);
    return authorization;
};

const setAuthorization = (authorization) => {
    window.localStorage.setItem(LocalStorageConstants.APP__AUTHORIZATION, authorization);
};

export default { getAuthorization, setAuthorization };

