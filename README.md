# vue-x-axios

> A Vue.js project

作者: 了了君
QQ交流群： 545119205


怎么发送axios请求?
地址：src/service/中的文件
step1: 在service层中复制其他module.js并粘贴 设置函数和请求地址（如请求 /api/moduleA/data, 则对应模块是moduleA,具体地址是'data'）
step2: 在actions中引入该js 并实例化对应函数，下面export导出
step3: 在 组件中通过 import { mapActions } from 'vuex'; 去引入mapActions函数
        methods: {
            ...mapActions({
                axios: 'AXIOS' // 使用与vuex中调用mutations的函数一样的方式调用
            })
        },
step4: 触发actions中的方法 this.axios('这里传参') 实现调用axios
end: 请求完成


怎么修改vuex中的状态?
地址：src/store/中的文件
step1: 在mutations中设置修改状态的函数，通过state关键字去(修改)vuex中的状态
step2: 在actions中通过关键字commit去去触发mutations中的函数
step3: 在 组件中通过 import { mapActions } from 'vuex'; 去引入mapActions函数
        methods: {
            ...mapActions({
                aaa: 'AAA'
            })
        },
step4: 触发actions中的方法 this.aaa('这里传参');
end: 修改完成


怎么获取vuex中的状态?
step1: 在getters中设置获取状态的函数，函数通过state关键字去(获取)vuex中的状态
step2: 在 组件中通过 import { mapGetters } from 'vuex'; 去引入getters函数，通过计算属性实现实时更新
        computed: {
            ...mapGetters({
                aaa: 'AAA'
            })
        },
step3: console.log(this.aaa);
end: 获取完成
 
 
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
