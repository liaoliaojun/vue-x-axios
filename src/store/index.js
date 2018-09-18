import Vue from 'vue';
import Vuex from 'vuex';

import state from './state'; // vuex存储的初始状态 state
import actions from './actions'; // 通过关键字commit去触发mutations
import mutations from './mutations'; // 通过state关键字去(修改)vuex中的状态
import getters from './getters'; // 通过state关键字去(获取)vuex中的状态

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // 开发环境启用严格模式
    state,
    getters,
    actions,
    mutations
});
