import LocalStorageConstants from 'constants/LocalStorageConstants';


const getBearer = () => {
    let bearer = window.localStorage.getItem(LocalStorageConstants.APP__BEARER);
    return bearer;
};

const setBearer = (bearer) => {
    window.localStorage.setItem(LocalStorageConstants.APP__BEARER, bearer);
};

export default { getBearer, setBearer };

