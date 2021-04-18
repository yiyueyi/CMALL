import { createAction, createReducer } from 'redux-act';
import _ from 'lodash';
import LocalStorageConstants from 'constants/LocalStorageConstants';

const REDUCER = 'seller';
const NS = `@@${REDUCER}/`;

export const setMalls = createAction(`${NS}SET_MALLS`);
export const setService = createAction(`${NS}SET_SERVICE`);
export const setSellerService = createAction(`${NS}SET_SELLER_SERVICE`);
export const setShanghuoState = createAction(`${NS}SELLER__SHANGHUO_STATE`);
export const setShanghuoAuthorizetion = createAction(`${NS}SELLER__SHANGHUO_AUTHORIZETION`);
export const setSellerConfig = createAction(`${NS}SET_SELLER_CONFIG`);
export const setCollectConfig = createAction(`${NS}SET_COLLECT_CONFIG`);
export const setPlatformConfig = createAction(`${NS}SET_PLATFORM_CONFIG`);
export const setSecurityInfo = createAction(`${NS}SET_SECURITY_INFO`);
export const setVMallSecurityInfo = createAction(`${NS}SET_VMALL_SECURITY_INFO`);
export const setWorkspaceInfo = createAction(`${NS}SET_WORKSPACE_INFO`);
export const setPlatformRecord = createAction(`${NS}SET_PLATFORM_RECORD`);
export const setCommissionRecord = createAction(`${NS}SET_COMMISSION_RECORD`);
export const setHotGoodsRecord = createAction(`${NS}SET_HOT_GOODS_RECORD`);
export const setAutoLogin = createAction(`${NS}SET_AUTO_LOGIN`);
export const setFilterSetting = createAction(`${NS}SET_FILTER_SETTING`);
export const setUploadConfig = createAction(`${NS}SET_UPLOAD_CONFIG`);
export const setCategoryMap = createAction(`${NS}SET_CATEGORY_MAP`);
export const setPddConfig = createAction(`${NS}SET_PDD_CONFIG`);
export const setCurrentMall = createAction(`${NS}SET_CURRENT_MALL`);
export const removePlatformRecord = createAction(`${NS}REMOVE_PLATFORM_RECORD`);
export const removeCommissionRecord = createAction(`${NS}REMOVE_COMMISSION_RECORD`);
export const removeHotGoodsRecord = createAction(`${NS}REMOVE_HOT_GOODS_RECORD`);
export const removeCurrentMall = createAction(`${NS}REMOVE_CURRENT_MALL`);

const initState = {
    // malls: [],
    // //当前服务版本
    // sellerService: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__SELLER_SERVICE)) || {},
    // sellerConfig: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__SELLER_CONFIG)) || { isRemember: false },
    // securityInfo: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__SECURITY_INFO)) || [],
    // vMallSecurityInfo: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__VMALL_SECURITY_INFO)) || [],
    // collectConfig: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__COLLECT_CONFIG)) || {},
    // shanghuoState: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__SHANGHUO_STATE)) || {},
    // platformConfig: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__PLATFORM_CONFIG)) || { mall: { isPdd: true } },
    // workspaceInfo: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__WORKSPACE_INFO)) || { isRemind: true },
    // platformRecord: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__PLATFORM_RECORD)) || {},
    // commissionRecord: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__COMMISSION_RECORD)) || {},
    // hotGoodsRecord: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__HOT_GOODS_RECORD)) || {},
    // currentMall: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__CURRENT_MALL)) || {},
    // filterSetting: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__FILTER_SETTING)) || { skipUploaded: false },
    // uploadConfig: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__UPLOAD_CONFIG)) || ['config', 'list'],
    // categoryMap: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__CATEGORY_MAP)) || [],
    // pddConfig: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__CATEGORY_MAP)) || { canPublish: false },
    // service: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__SERVICE)) || {},
    // autoLogin: JSON.parse(window.localStorage.getItem(LocalStorageConstants.SELLER__AUTO_LOGIN)) || { allowAutoLogin: false }
};

export default createReducer(
    {
        [setMalls]: (state, malls) => {
            return { ...state, malls };
        },
        [setService]: (state, service) => ({ ...state, service }),
        [setSellerService]: (state, param) => {
            const sellerService = { ...state.sellerService, ...param };
            const newState = { ...state, sellerService };
            window.localStorage.setItem(LocalStorageConstants.SELLER__SELLER_SERVICE, JSON.stringify(newState.sellerService));
            return newState;
        },
        [setShanghuoState]: (state, param) => {
            const shanghuoState= { ...state.shanghuoState, ...param };
            const newState = { ...state, shanghuoState };
            window.localStorage.setItem(LocalStorageConstants.SELLER__SHANGHUO_STATE, JSON.stringify(newState.shanghuoState));
            return newState;
        },
        [setShanghuoAuthorizetion]: (state, param) => {
            const ShanghuoAuthorizetion= { ...state.ShanghuoAuthorizetion, ...param };
            const newState = { ...state, ShanghuoAuthorizetion };
            window.localStorage.setItem(LocalStorageConstants.SELLER__SHANGHUO_AUTHORIZATION, JSON.stringify(param));
            return newState;
        },
        [setSellerConfig]: (state, param) => {
            const sellerConfig = { ...state.sellerConfig, ...param };
            const newState = { ...state, sellerConfig };
            window.localStorage.setItem(LocalStorageConstants.SELLER__SELLER_CONFIG, JSON.stringify(newState.sellerConfig));
            return newState;
        },
        [setSecurityInfo]: (state, param) => {
            const securityInfo = _.uniqBy(param, 'mallId');
            const newState = { ...state, securityInfo };
            window.localStorage.setItem(LocalStorageConstants.SELLER__SECURITY_INFO, JSON.stringify(newState.securityInfo));
            return newState;
        },
        [setVMallSecurityInfo]: (state, param) => {
            const vMallSecurityInfo = _.uniqBy(param, 'mallId');
            const newState = { ...state, vMallSecurityInfo };
            window.localStorage.setItem(LocalStorageConstants.SELLER__VMALL_SECURITY_INFO, JSON.stringify(newState.vMallSecurityInfo));
            return newState;
        },
        [setCollectConfig]: (state, param) => {
            const collectConfig = param;
            const newState = { ...state, collectConfig };
            window.localStorage.setItem(LocalStorageConstants.SELLER__COLLECT_CONFIG, JSON.stringify(newState.collectConfig));
            return newState;
        },
        [setPlatformConfig]: (state, param) => {
            const platformConfig = param;
            const newState = { ...state, platformConfig };
            window.localStorage.setItem(LocalStorageConstants.SELLER__PLATFORM_CONFIG, JSON.stringify(newState.platformConfig));
            return newState;
        },
        [setWorkspaceInfo]: (state, param) => {
            const workspaceInfo = param;
            const newState = { ...state, workspaceInfo };
            window.localStorage.setItem(LocalStorageConstants.SELLER__WORKSPACE_INFO, JSON.stringify(newState.workspaceInfo));
            return newState;
        },
        [setPlatformRecord]: (state, param) => {
            const platformRecord = param;
            const newState = { ...state, platformRecord };
            window.localStorage.setItem(LocalStorageConstants.SELLER__PLATFORM_RECORD, JSON.stringify(newState.platformRecord));
            return newState;
        },
        [setCommissionRecord]: (state, param) => {
            const commissionRecord = param;
            const newState = { ...state, commissionRecord };
            window.localStorage.setItem(LocalStorageConstants.SELLER__COMMISSION_RECORD, JSON.stringify(newState.commissionRecord));
            return newState;
        },
        [setHotGoodsRecord]: (state, param) => {
            const hotGoodsRecord = param;
            const newState = { ...state, hotGoodsRecord };
            window.localStorage.setItem(LocalStorageConstants.SELLER__HOT_GOODS_RECORD, JSON.stringify(newState.hotGoodsRecord));
            return newState;
        },
        [setAutoLogin]: (state, param) => {
            const autoLogin = param;
            const newState = { ...state, autoLogin };
            window.localStorage.setItem(LocalStorageConstants.SELLER__AUTO_LOGIN, JSON.stringify(newState.autoLogin));
            return newState;
        },
        [setCurrentMall]: (state, param) => {
            const currentMall = _.isEmpty(param) ? {} : { ...state.currentMall, ...param };
            const newState = { ...state, currentMall };
            window.localStorage.setItem(LocalStorageConstants.SELLER__CURRENT_MALL, JSON.stringify(newState.currentMall));
            return newState;
        },
        [setFilterSetting]: (state, param) => {
            const filterSetting = { ...state.filterSetting, ...param };
            const newState = { ...state, filterSetting };
            window.localStorage.setItem(LocalStorageConstants.SELLER__FILTER_SETTING, JSON.stringify(newState.filterSetting));
            return newState;
        },
        [setUploadConfig]: (state, param) => {
            const uploadConfig = param;
            const newState = { ...state, uploadConfig };
            window.localStorage.setItem(LocalStorageConstants.SELLER__UPLOAD_CONFIG, JSON.stringify(newState.uploadConfig));
            return newState;
        },
        [setCategoryMap]: (state, param) => {
            const categoryMap = param;
            const newState = { ...state, categoryMap };
            window.localStorage.setItem(LocalStorageConstants.SELLER__CATEGORY_MAP, JSON.stringify(newState.categoryMap));
            return newState;
        },
        [setPddConfig]: (state, param) => {
            const pddConfig = param;
            const newState = { ...state, pddConfig };
            window.localStorage.setItem(LocalStorageConstants.SELLER__PDD_CONFIG, JSON.stringify(newState.pddConfig));
            return newState;
        },
        [removePlatformRecord]: (state) => {
            const platformRecord = {};
            const newState = { ...state, platformRecord };
            window.localStorage.setItem(LocalStorageConstants.SELLER__PLATFORM_RECORD, JSON.stringify(newState.platformRecord));
            return newState;
        },
        [removeCommissionRecord]: (state) => {
            const commissionRecord = {};
            const newState = { ...state, commissionRecord };
            window.localStorage.setItem(LocalStorageConstants.SELLER__COMMISSION_RECORD, JSON.stringify(newState.commissionRecord));
            return newState;
        },
        [removeHotGoodsRecord]: (state) => {
            const hotGoodsRecord = {};
            const newState = { ...state, hotGoodsRecord };
            window.localStorage.setItem(LocalStorageConstants.SELLER__HOT_GOODS_RECORD, JSON.stringify(newState.hotGoodsRecord));
            return newState;
        },
        [removeCurrentMall]: (state) => {
            const currentMall = {};
            const newState = { ...state, currentMall };
            window.localStorage.setItem(LocalStorageConstants.SELLER__CURRENT_MALL, JSON.stringify(newState.currentMall));
            return newState;
        }
    },
    initState
);
