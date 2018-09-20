# vue-x-axios

> A Vue.js project

## 作者: 了了君
QQAuthor：1030219089
<br>
QQGroup： 545119205

 
## Build Setup

## 怎么查看/修改vue-x-axios的demo?
``` bash
step1: 使用github克隆/下载本项目到本地.
step2: 进入本地的项目 npm install
step3: install 完成后执行 npm run dev 启用项目
end: 浏览器输入 localhost:8080 进行访问
```

## 我现有的项目怎么引入vue-x-axios封装的vuex和axios?
``` bash
step1: 要使用的项目npm install vuex与axios
step2: 复制src/store所有文件，复制src/service所有文件
step3: 在自己的项目src目录详情新建文件夹store与service，并粘贴对应的文件
step4: 在main.js中引入 
        import store from './store';
        // 把store挂载vue上  vuex与axios都是通过store，所以只用引入一次
        new Vue({
            el: '#app',
            store,
            components: {App},
            template: '<App/>'
        });
end: 组件内通过 import { mapActions } from 'vuex'; 发起axios请求和修改vuex，详情看以下内容。
```


## 怎么发送axios请求?
``` bash
service层指src/service/中的文件
step1: 在service层中复制其他module.js并粘贴 设置函数和请求地址（如请求 /api/moduleA/data, 则对应模块是moduleA,具体地址是'data'）
step2: 在actions中引入该js，并调用对应函数实例化生成actions函数。 具体流程为 store/actions.js -  service/module.x - service/Request.js - service/Base.js
step3: 在 组件中通过 import { mapActions } from 'vuex'; 
       引入mapActions函数，解构到methods方法上
        methods: {
            ...mapActions({
                axios: 'AXIOS' // 使用与vuex中调用mutations的函数一样的方式调用
            })
        },
step4: 触发actions中的方法 this.axios('这里传参') 实现调用axios
end: 请求完成
```


## 怎么修改vuex中的状态?
``` bash
vuex是src/store/中的文件
step1: 在mutations中设置修改状态的函数，通过state关键字去(修改)vuex中的状态
step2: 在actions中通过关键字commit去去触发mutations中的函数
step3: 在 组件中通过 import { mapActions } from 'vuex'; 
       引入mapActions函数，解构到methods方法上
        methods: {
            ...mapActions({
                aaa: 'AAA'
            })
        },
step4: 触发actions中的方法 this.aaa('这里传参');
end: 修改完成
```


## 怎么获取vuex中的状态?
``` bash
step1: 在getters中设置获取状态的函数，函数通过state关键字去(获取)vuex中的状态
step2: 在 组件中通过 import { mapGetters } from 'vuex';
       引入getters函数，通过计算属性实现实时更新
        computed: {
            ...mapGetters({
                aaa: 'AAA'
            })
        },
step3: console.log(this.aaa);
end: 获取完成
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
