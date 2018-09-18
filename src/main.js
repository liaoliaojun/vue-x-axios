/**
 * 封装vuex&axios
 * @author  liaoliaojun<1030219089@qq.com>
 * @date  2018-09-17
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
