const setCount = (state, num) => {
    state.count = num;
};

const setVuexParam = (state, param) => {
    if (state.vuexParam.hasOwnProperty(param.key) && typeof param.value !== 'object') {
        state.vuexParam[param.key] = param.value;
    } else {
        let temp = {};
        Object.assign(temp, state.vuexParam);
        temp[param.key] = param.value;
        state.vuexParam = temp;
    }
};

export default {
    'SET_COUNT': setCount,
    'SET_VUEX_PARAM': setVuexParam
};
