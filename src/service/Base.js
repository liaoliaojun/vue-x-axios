import axios from 'axios';
import qs from 'qs';

/**
 * 定义Resource类
 */
class Resource {
    /**
     * Resource类构造函数
     * @param {String} url RESTful格式的请求地址（默认值：__HOST__ + '{/api}{/module}{/action}{/id}'）
     * @param {String} contentType 发送形式，默认JSON（application/json、application/x-www-form-urlencoded）
     */
    constructor(url, contentType) {
        this.axiosInstance = null; // axios实例
        this.cancel = () => { }; // 取消ajax请求，在init中赋值
        this.originalUrl = url || __HOST__ + '/{/api}{/module}{/action}{/id}'; // +运算符的优先级要比||运算符优先级高
        this.sections = []; // RESTful格式地址中动态部分

        this.init(contentType);
    }

    /**
     * 初始化Resource
     * @param {String} contentType 请求Header中的Content-Type
     */
    init(contentType) {
        // 设置CancelToken并实例化axios对象
        let cancelToken = new axios.CancelToken(fnCancel => {
            this.cancel = fnCancel;
        });
        this.axiosInstance = axios.create({
            cancelToken
        });

        // 设置Content-Type
        this.setHeader('Content-Type', contentType);

        // 注入request钩子函数
        this.injectRequestHook(config => {
            // 根据不同的Content-Type调整请求参数格式
            switch (contentType) {
                case 'application/json':
                    break;
                case 'application/x-www-form-urlencoded':
                default:
                    config.data = qs.stringify(config.data);
                    break;
            }
            return config;
        });

        // 注入response钩子函数
        this.injectResponseHook(
            (response) => {
                return response.data;
            },
            (error) => {
                if (axios.isCancel(error)) {
                    return Promise.reject(new Error('取消ajax请求：' + error.message));
                }

                if (error.response) {
                    console.error('ajax响应错误：' + error.response);
                } else if (error.request) {
                    console.error('ajax请求错误：' + error.request);
                } else {
                    console.error('ajax错误：' + error);
                }
                return Promise.reject(error);
            });

        // 分解原始RESTful格式地址
        let reg = /\{\/([^}]+)\}/g;
        // 因为str.match方法返回的结果只有匹配的内容，没有每一个匹配中正则表达式小括号内的内容
        // 所以使用reg.exec方法。
        while (reg.lastIndex < this.originalUrl.length) {
            let section = reg.exec(this.originalUrl);
            if (!section) {
                break;
            }
            this.sections.push(section);
        }
    }

    /**
     * 注入请求钩子函数
     * @param {Function} hookFunction 请求钩子函数
     */
    injectRequestHook(hookFunction) {
        this.axiosInstance.interceptors.request.use(config => {
            if (typeof hookFunction === 'function') {
                return hookFunction(config);
            }
        });
    }

    /**
     * 注入响应钩子函数
     * @param {Function} resolveHook 成功钩子函数
     * @param {Function} rejectHook 失败钩子函数
     */
    injectResponseHook(resolveHook, rejectHook) {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                if (typeof resolveHook === 'function') {
                    let returnValue = resolveHook(response);
                    // 如果未返回值，则表示Ajax的钩子函数不需要返回内容
                    if (typeof returnValue !== 'undefined') {
                        return returnValue;
                    }
                }
            },
            (error) => {
                if (typeof rejectHook === 'function') {
                    let returnValue = rejectHook(error);
                    // 如果未返回值，则表示Ajax的钩子函数不需要返回内容
                    if (typeof returnValue !== 'undefined') {
                        return Promise.reject(returnValue);
                    }
                }
            }
        );
    }

    /**
     * 将请求地址对象匹配到原始请求地址上
     * @param {Object} urlObj 请求地址对象
     * @returns {String} 返回匹配后的地址
     */
    urlMatch(urlObj) {
        let url = this.originalUrl;
        this.sections.forEach(section => {
            let value = urlObj[section[1]];
            if (typeof value === 'undefined') {
                value = '';
            } else {
                value = '/' + value;
            }
            let reg = new RegExp(section[0]);
            url = url.replace(reg, value);
        });
        return url;
    }

    /**
     * 设置指定请求类型附加的header，如果未指定类型，则默认全部请求都附加指定header
     * @param {String} key header的key
     * @param {String} value header的value
     * @param {String} requestType 请求类型
     */
    setHeader(key, value, requestType) {
        if (key && value) {
            this.axiosInstance.defaults.headers[requestType || 'common'][key] = value;
        }
    }

    /**
     * 并发请求
     * @param {Array<Promise>} promises Promise对象集合
     * @returns {Array<Promise>} 返回执行的结果
     */
    all(promises) {
        return axios.all(promises);
    }

    /**
     * 发送POST请求
     * @param {Object} urlObj 请求地址对象
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    post(urlObj, param) {
        return this.axiosInstance.post(this.urlMatch(urlObj), param);
    }

    /**
     * 发送DELETE请求
     * @param {Object} urlObj 请求地址对象
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    delete(urlObj, param) {
        // 附加的参数是地址栏？后面，所以参数要放到config.params里
        return this.axiosInstance.delete(this.urlMatch(urlObj), { params: param });
    }

    /**
     * 发送PUT请求
     * @param {Object} urlObj 请求地址对象
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    put(urlObj, param) {
        return this.axiosInstance.put(this.urlMatch(urlObj), param);
    }

    /**
     * 发送PATCH请求
     * @param {Object} urlObj 请求地址对象
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    patch(urlObj, param) {
        return this.axiosInstance.patch(this.urlMatch(urlObj), param);
    }

    /**
     * 发送GET请求
     * @param {Object} urlObj 请求地址对象
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    get(urlObj, param) {
        // 附加的参数是地址栏？后面，所以参数要放到config.params里
        return this.axiosInstance.get(this.urlMatch(urlObj), { params: param });
    }
}

export default Resource;
