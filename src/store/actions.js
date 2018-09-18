import ModuleA from '@/service/ModuleA';
import ModuleB from '@/service/ModuleB';

const requestModuleA = ({ commit, state }, param) => {
    return new ModuleA(commit).getModuleA(param);
};

const getModuleAList = ({ commit, state }, param) => {
    return new ModuleA(commit).getModuleAList(param);
};

const requestModuleB = ({ commit, state }, param) => {
    return new ModuleB(commit).getModuleB(param);
};

const setVuexParam = ({ commit }, param) => {
    commit('SET_VUEX_PARAM', param);
};

const setCount = ({ commit }, num) => {
    commit('SET_COUNT', num);
};

export default {
    'REQUEST_MODULE_A': requestModuleA,
    'REQUEST_MODULE_A_LIST': getModuleAList,
    'REQUEST_MODULE_B': requestModuleB,
    'SET_VUEX_PARAM': setVuexParam,
    'SET_COUNT': setCount
};
