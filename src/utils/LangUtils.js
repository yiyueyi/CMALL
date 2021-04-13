import _ from 'lodash';
import Promise from 'bluebird';
import numeral from 'numeral';
import CaseChange from 'change-case-object';

const isNil = (value) => {
    return null === value || undefined === value || '' === value;
};

const isNotNil = (value) => {
    return !isNil(value);
};

const isArrayEmpty = value => {
    return !value || !value.length;
};

const isArrayNotEmpty = value => {
    return !isArrayEmpty(value);
};

const isObjectEmpty = (object) => {
    if (isNil(object)) {
        return true;
    }
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

const isObjectNotEmpty = (object) => {
    return !isObjectEmpty(object);
};

/**
 * 获取字符串长度：英文占1个字符，中文汉字占2个字符
 * @param str
 * @returns {number}
 */
const getStringLen = (str) => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        str.charCodeAt(i) > 255 ? len += 2 : len += 1;
    }
    return len;
};

const regexIndexOf = (str, regex, startPos) => {
    let indexOf = str.substring(startPos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf;
};

function CancelablePromise(executor) {
    const self = this;
    const p = new Promise(function(resolve, reject) {
        return executor(resolve, reject, self);
    });
    p.__proto__ = CancelablePromise.prototype;
    return p;
}

CancelablePromise.__proto__ = Promise;
CancelablePromise.prototype.__proto__ = Promise.prototype;

const promiseEach = ($fns, $delays, $continueFn = true) => {
    let fns = [];
    if (_.isFunction($fns)) {
        _.forEach($delays, () => (fns.push($fns)));
    } else if (_.isArray($fns)) {
        fns = $fns;
    } else {
        return Promise.reject(new Error());
    }
    let index = 0;
    return new CancelablePromise((resolve, reject, promise) => {
        function next() {
            if (!!promise.cancelable) {
                resolve(null);
            } else {
                if (index < fns.length) {
                    Promise.delay($delays[index]).then(() => {
                        let fn = fns[index];
                        fn().then((result) => {
                            let $continue = true === $continueFn || $continueFn(result, index);
                            if ($continue) {
                                ++index;
                                next();
                            } else {
                                resolve(result, index);
                            }
                        }, reject);
                    });
                } else {
                    resolve(null);
                }
            }
        }

        next();
    });
};

/**
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 */
const unionBy = (...arrays) => {
    let iteratee = _.last(arrays);
    if (_.isArrayLikeObject(iteratee)) {
        iteratee = undefined;
    }
    let fromItems = arrays[0];
    let toItems = arrays[1];
    _.forEach(fromItems, (fromItem) => {
        let index = _.findIndex(toItems, (toItem) => {
            if (_.isFunction(iteratee)) {
                return iteratee(toItem, fromItem);
            } else {
                return _.get(toItem, iteratee) === _.get(fromItem, iteratee);
            }
        });
        if (index >= 0) {
            toItems[index] = fromItem;
        }
    });
    return toItems;
};

const $rename = (object, oldKey, newKey) => {
    if (_.includes(_.keys(object), oldKey)) {
        object[newKey] = _.clone(object[oldKey], true);
        delete object[oldKey];
    }
    return object;
};

const rename = (object, oldKey, newKey) => {
    if (!object) {
        return object;
    }
    if (_.isArray(object)) {
        let ret = [];
        _.forEach(object, (item) => {
            ret.push($rename(item, oldKey, newKey));
        });
        return ret;
    } else {
        return $rename(object, oldKey, newKey);
    }
};

const truncateNil = (object) => {
    const keys = _.keys(object);
    return _.reduce(keys, (all, key) => {
        let value = object[key];
        if (isNil(value) && '' !== value) {
            all[key] = value;
        }
        return all;
    }, {});
};

const getRandomAlphabet = (count) => {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    const times = _.range(count);
    const chars = _.map(times, () => _.sample(alphabets));
    return chars.join('');
};

const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

const getRandomPoint = (leftTopPoint, rightBottomPoint) => {
    if (isArrayNotEmpty(leftTopPoint) && isArrayNotEmpty(rightBottomPoint)) {
        const x = getRandom(leftTopPoint[0], rightBottomPoint[0]);
        const y = getRandom(leftTopPoint[1], rightBottomPoint[1]);
        return { x, y };
    }
    return { x: 0, y: 0 };
};

const sleep = (timeout) => {
    if (timeout < 0) {
        timeout = 0;
    }
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout);
    });
};

const waitFor = (condition, timeout, interval) => {
    return new Promise(async (resolve) => {
        const start = new Date().getTime();
        const wait = async () => {
            if (new Date().getTime() - start >= timeout) {
                resolve(false);
            } else if ((await condition())) {
                resolve(true);
            } else setTimeout(wait, interval || 100);
        };
        await wait();
    });
};

const firstOrderBy = (function() {

    function identity(v) {
        return v;
    }

    function ignoreCase(v) {
        return typeof (v) === 'string' ? v.toLowerCase() : v;
    }

    function makeCompareFunction(f, opt) {
        opt = typeof (opt) === 'number' ? { direction: opt } : opt || {};
        if (typeof (f) !== 'function') {
            let prop = f;
            // make unary function
            f = function(v1) {
                return !!v1[prop] ? v1[prop] : '';
            };
        }
        if (f.length === 1) {
            // f is a unary function mapping a single item to its sort score
            let uf = f;
            let preprocess = opt.ignoreCase ? ignoreCase : identity;
            let cmp = opt.cmp || function(v1, v2) {
                return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
            };
            f = function(v1, v2) {
                return cmp(preprocess(uf(v1)), preprocess(uf(v2)));
            };
        }
        if (opt.direction === -1) return function(v1, v2) {
            return -f(v1, v2);
        };
        return f;
    }

    /* adds a secondary compare function to the target function (`this` context)
       which is applied in case the first one returns 0 (equal)
       returns a new compare function, which has a `thenOrderBy` method as well */
    function tb(func, opt) {
        /* should get value false for the first call. This can be done by calling the
        exported function, or the firstOrderBy property on it (for es6 module compatibility)
        */
        let x = (typeof (this) === 'function' && !this.firstOrderBy) ? this : false;
        let y = makeCompareFunction(func, opt);
        let f = x ? function(a, b) {
                return x(a, b) || y(a, b);
            }
            : y;
        f.thenOrderBy = tb;
        return f;
    }

    tb.firstOrderBy = tb;
    return tb;
})();

const changeCase = (object, caseName) => {
    switch (caseName) {
        case 'camelCase':
        case'camel':
            return CaseChange.camelCase(object);
        case  'snakeCase':
        case 'snake':
            return CaseChange.snakeCase(object);
        case 'paramCase':
        case 'param':
            return CaseChange.paramCase(object);
        default:
            return CaseChange.camelCase(object);
    }
};

const camelCase = (object) => {
    return changeCase(object, 'camelCase');
};

const snakeCase = (object) => {
    return changeCase(object, 'snakeCase');
};

const paramCase = (object) => {
    return changeCase(object, 'paramCase');
};

const $pad = (array, length, generator, pos) => {
    const padLength = length - array.length;
    if (padLength <= 0 || !_.isFunction(generator)) {
        return array;
    } else {
        const padded = [];
        for (let i = 0; i < padLength; i++) {
            padded.push(generator());
        }
        return pos === 'start' ? _.concat(padded, array) : _.concat(array, padded);
    }
};

const padStart = (array, length, generator) => {
    return $pad(array, length, generator, 'start');
};

const padEnd = (array, length, generator) => {
    return $pad(array, length, generator, 'end');
};

const isNullString = (value) => {
    return '' === value;
};

const valueIsNumeric = (value) => {
    if (value.indexOf('-') >= 0) {
        value = _.split(value, '-')[1];
    }
    if (value.indexOf('.') >= 0) {
        value = _.split(value, '.')[0];
    }
    return value;
};

const isJson = (value) => {
    return new Promise((resolve) => {
        resolve(typeof JSON.parse(value) == 'object');
    }).catch((e) => {
        return false;
    });
};

const numeralToCent = (value) => {
    return numeral(value).format('0.00');
};

const get = (object, path, defaultValue) => {
    const value = _.get(object, path, defaultValue);
    return isNil(value) ? defaultValue : value;
};

export default {
    isArrayEmpty,
    isArrayNotEmpty,
    isObjectEmpty,
    isObjectNotEmpty,
    isNil,
    isNotNil,
    regexIndexOf,
    getStringLen,
    promiseEach,
    unionBy,
    rename,
    truncateNil,
    getRandomAlphabet,
    getRandom,
    getRandomPoint,
    sleep,
    waitFor,
    firstOrderBy,
    changeCase,
    camelCase,
    snakeCase,
    paramCase,
    padStart,
    padEnd,
    isNullString,
    valueIsNumeric,
    isJson,
    numeralToCent,
    get
};
