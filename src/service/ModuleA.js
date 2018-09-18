import RequestService from './Request';

/**
 * 定义Module底层服务类
 */
class ModuleA extends RequestService {
    /**
     * 构造函数
     * @param {Function} commit Vuex的commit方法(用来设置state的errorCode)
     */
    constructor(commit) {
        super('/module/a', { commit });
    }

    /**
     * 请求第一部分数据
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    getModuleA(param) {
        return this.resource.post({
            action: 'getdata'
        }, param).then((response) => {
            // return response;
            // 返回假数据
            return {
                code: 0,
                msg: 'ModuleA返回的模拟数据',
                data: {}
            };
        });
    }

    /**
     * 请求第二部分数据
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    getModuleAList(param) {
        return this.resource.post({
            action: 'getlist'
        }, param).then((response) => {
            // return response;
            // 返回假数据
            return {
                code: 0,
                msg: 'ModuleA-List数据',
                data: {}
            };
        });
    }
}

export default ModuleA;
