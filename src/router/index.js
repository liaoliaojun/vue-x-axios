import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('@/components/HelloWorld');

Vue.use(Router);

export default new Router({
    routes: [
        {
            alias: '/',
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
});
