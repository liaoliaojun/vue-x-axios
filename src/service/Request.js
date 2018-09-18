import Base from './Base';

/**
 * 请求服务类
 */
export default class Request {
    /**
     * 构造函数
     * @param {String} moduleName RESTful风格代码中module的值
     * @param {Object} others 请求出错全局处理函数，和需要提供Vuex的commit
     */
    constructor(moduleName, { commit }) {
        this.resource = new Base(__HOST__ + `/${moduleName}{/action}{/id}`);

        this.resource.injectResponseHook(
            (response) => {
                return response.data;
            },
            // error
            () => {
                console.log('以上错误信息不用管，成功时不会出现，在同目录下的Base.js里定义');
                // return '错误';
            }
        );
    }
};
