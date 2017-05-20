import Vue    from 'vue'
import Router from 'vue-router'
import index  from '../App'

Vue.use(Router)

import find     from '../components/Find.vue';
import category from '../components/Category.vue';
import about    from '../components/About.vue';
import home     from '../components/Index.vue';
import login    from '../components/Login.vue'
import categorylist    from '../components/CategoryList.vue'
import videoPlay   from  '../components/VideoPlay.vue'

export default new Router({
  'linkActiveClass': 'active',
  routes: [
    {
      path: '/home',
      name: 'index',
      component: home
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },
    {
      path:'/category',
      name: 'category',
      component: category
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path:'/login',
      name: 'login',
      component:login
    },
    {
      path:'/categorylist',
      name: 'categorylist',
      component:categorylist
    },
    {
      path:'/videoPlay',
      name: 'videoPlay',
      component:videoPlay
    }
  ]
})
