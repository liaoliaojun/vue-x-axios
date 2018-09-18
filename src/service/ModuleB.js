import RequestService from './Request';

/**
 * 定义Module底层服务类
 */
class ModuleB extends RequestService {
    /**
     * 构造函数
     * @param {Function} commit Vuex的commit方法(用来设置state的errorCode)
     */
    constructor(commit) {
        super('/module/b', { commit });
    }

    /**
     * 请求第一部分数据
     * @param {Object} param 请求参数
     * @returns {Promise} 返回Ajax请求Promise对象
     */
    getModuleB(param) {
        return this.resource.post({
            action: 'getdata'
        }, param).then((response) => {
            // return response;
            // 返回假数据
            return {
                code: 0,
                msg: 'ModuleB返回的模拟数据',
                data: {}
            };
        });
    }
}

export default ModuleB;
