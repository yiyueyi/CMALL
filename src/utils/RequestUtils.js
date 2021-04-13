import _ from 'lodash';
import Url from 'url-parse';
import LangUtils from 'utils/LangUtils';
import DesktopRuntime from 'utils/DesktopRuntime';

const [rp, tcpp] = DesktopRuntime.getRuntime().require(['request-promise', 'tcp-ping']);

const HTTP_PROXY = 'http://127.0.0.1:8888';

const isDevelopment = () => (process.env.NODE_ENV !== 'production');

const splitHostAndPort = (address) => {
    const url = Url(address);
    return {
        host: `${url.hostname}`,
        port: url.port ? Number(url.port) : 80
    };
};

const useProxy = async () => {
    return new Promise((resolve) => {
        if (isDevelopment()) {
            const { host, port } = splitHostAndPort(HTTP_PROXY);
            tcpp.probe(host, port, (error, available) => {
                if (error) {
                    resolve({
                        available: false,
                        proxy: HTTP_PROXY
                    });
                } else {
                    resolve({
                        available: available,
                        proxy: HTTP_PROXY
                    });
                }
            });
        } else {
            resolve({
                available: false,
                proxy: HTTP_PROXY
            });
        }
    });
};

const serializeParams = (params) => {
    let query = '';
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            if (query !== '') {
                query += '&';
            }
            query += key + '=' + encodeURIComponent(params[key]);
        }
    }
    return query;
};

const doRequest = ({ url, method, params, headers, json = true, requestCase, responseCase, upload = false }) => {
    return new Promise((resolve, reject) => {
        useProxy().then(({ available, proxy }) => {
            // console.log(`proxy[${proxy}] is available=[${available}]`);
            let request = { uri: url };
            !_.isEmpty(method) ? _.assign(request, { method: method }) : _.assign(request, { method: 'get' });
            if (upload) {
                !_.isUndefined(params) ? _.assign(request, { formData: params }) : _.noop();
            } else {
                !_.isUndefined(params) ? _.assign(request, { body: params }) : _.noop();
                _.assign(request, { json: !!json });
            }
            !_.isEmpty(headers) ? _.assign(request, { headers: headers }) : _.noop();
            if (available) {
                _.assign(request, { rejectUnauthorized: false, proxy: proxy });
            }
            if ('get' === request.method && !_.isEmpty(params)) {
                let query = new Url(url).query || '';
                if (query && query.startsWith('?')) {
                    url += serializeParams(params);
                } else {
                    url += '?' + serializeParams(params);
                }
                _.assign(request, { uri: url });
            }
            if (!!requestCase) {
                request = LangUtils.changeCase(request, requestCase);
            }
            // console.log(request);
            rp(request).then((response) => {
                if (!!responseCase) {
                    response = LangUtils.changeCase(response, responseCase);
                }
                // console.log(response);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    });
};

const doGet = ({ url, params, headers, json, requestCase, responseCase }) => {
    return doRequest({
        url: url,
        method: 'get',
        params: params,
        headers: headers,
        json: json,
        requestCase: requestCase,
        responseCase: responseCase
    });
};

const doPost = ({ url, params, headers, json, requestCase, responseCase, upload }) => {
    // console.log(params);
    return doRequest({
        url: url,
        method: 'post',
        params: params,
        headers: headers,
        json: json,
        requestCase: requestCase,
        responseCase: responseCase,
        upload: upload
    });
};

export default {
    doRequest,
    doPost,
    doGet
};
