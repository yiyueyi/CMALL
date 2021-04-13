import _ from 'lodash';

const round = (value, precision = 2) => {
    if (value) {
        return _.round(value, precision);
    }
    return value;
};

const numberToPercent = (value, abs = false) => {
    if (value) {
        if (abs) {
            value = Math.abs(value);
        }
        return _.round(value * 100, 2);
    }
    return value;
};

const centToYuan = value => {
    if (value) {
        return _.round(value / 100, 2);
    }
    return value;
};

const yuanToCent = value => {
    if (value) {
        return _.round(value * 100, 2);
    }
    return value;
};

const cashToYuan = value => {
    if (value) {
        return _.round(value / 1000, 2);
    }
    return value;
};

const yuanToCash = value => {
    if (value) {
        return _.round(value * 1000, 2);
    }
    return value;
};

const yuanToWan = value => {
    if (value) {
        return _.round(value * 10000, 2);
    }
    return value;
};

export default {
    round,
    numberToPercent,
    centToYuan,
    yuanToCent,
    cashToYuan,
    yuanToCash,
    yuanToWan
};
