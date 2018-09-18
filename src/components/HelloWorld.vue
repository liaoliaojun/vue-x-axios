<template>
  <div class="liaoliaojun">
      <div class="vuex-llj">
        <h1>vuex部分</h1>
        <div class="count-llj">
            <h3>count: {{count}}</h3>
            <button @click="changeCount(1)">增加count计数</button>
            <button @click="changeCount(-1)">减少count计数</button>
            <button @click="actionsCount(999)">赋值count计数</button>
        </div>
        <div class="vuex-param-llj">
            <h3>vuexParam: </h3>
            <p>{{vuexParam}}</p>
            <button @click="actionsVuexParam('paramA', 'aaa')">改变vuexParam中的A</button>
            <button @click="actionsVuexParam('paramB', 'bbb')">改变vuexParam中的B</button>
            <button @click="actionsVuexParam('paramC', 'ccc')">添加C属性</button>
        </div>
      </div>

      <div class="axios-llj">
        <h1>axios部分</h1>
        <div>
            <h3>请求A接口</h3>
            <button @click="getModuleA()">点击请求A接口</button>
            <button @click="getModuleAList()">点击请求A接口List数据</button>
            <p>service层下的ModuleA.js的假数据{{dataA}}</p>
        </div>
         <div>
            <h3>请求B接口</h3>
            <button @click="getModuleB()">点击请求B接口</button>
            <p>service层下的ModuleB.js的假数据{{dataB}}</p>
        </div>
      </div>
  </div>
</template>

<script>
/**
 * 封装vuex&axios
 * @author  liaoliaojun<1030219089@qq.com>
 * @date  2018-09-17
 */
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'HelloWorld',
    data() {
        return {
            dataA: '',
            dataB: ''
        };
    },
    computed: {
        // 使用计算属性去获取vuex中的状态
        ...mapGetters({
            count: 'GET_COUNT',
            vuexParam: 'GET_VUEX_PARAM'
        })
    },
    methods: {
        // 抛出出store中的actions.js中的方法 用来修改vuex的状态
        ...mapActions({
            setCount: 'SET_COUNT',
            setVuexParam: 'SET_VUEX_PARAM',
            requestModuleA: 'REQUEST_MODULE_A',
            requestModuleAList: 'REQUEST_MODULE_A_LIST',
            requestModuleB: 'REQUEST_MODULE_B'
        }),
        // mapGetters获取 this.count
        changeCount(number) {
            let num = this.count;
            num += number;
            this.actionsCount(num);
        },
        // 提交count,actions触发mutations更改state中的count，修改vuex中的count来触发该组件内的计算属性的改变 从而实现双向绑定
        actionsCount(num) {
            this.setCount(num);
        },
        // 提交VuexParam,actions触发mutations更改state中的VuexParam，修改vuex中的VuexParam来触发该组件内的计算属性的改变 从而实现双向绑定
        actionsVuexParam(key, value) {
            this.setVuexParam({ key, value });
        },
        // 请求a接口
        getModuleA() {
            let data = {
                'param': '我是A接口的参数'
            };
            this.requestModuleA(data).then((res) => {
                this.dataA = res;
            });
        },
        // 请求a接口列表数据
        getModuleAList() {
            let data = {
                'param': '我是A接口的参数'
            };
            this.requestModuleAList(data).then((res) => {
                this.dataA = res;
            });
        },
        // 请求b接口
        getModuleB() {
            let data = {
                'param': '我是B接口的参数'
            };
            this.requestModuleB(data).then((res) => {
                this.dataB = res;
            });
        }
    }
};
</script>

<style>
.liaoliaojun button {
      margin-right: 10px;
  }
</style>
