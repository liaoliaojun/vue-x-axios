const getVuexParam = (state) => state.vuexParam;

const getCount = (state) => state.count;

export default {
    'GET_VUEX_PARAM': getVuexParam,
    'GET_COUNT': getCount
};
