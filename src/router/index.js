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
import video   from  '../components/Video.vue'
import resign  from  '../components/Resign.vue'
import topic   from  '../components/Topic.vue'
import collect from  '../components/Collect.vue'
import article from  '../components/Article.vue'
import feedback from '../components/Feedback.vue'
import uploadAvatar from '../components/UploadAvatar.vue'
import setting  from  '../components/Setting.vue'
import historyList from '../components/HistoryList.vue'

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
    },{
      path:'/video',
      name: 'video',
      component:video  
    },{
      path:'/resign',
      name: 'resign',
      component:resign
    },{
      path:'/topic',
      name: 'topic',
      component:topic
    },{
      path:'/collect',
      name:'collect',
      component:collect
    },{
      path:'/article',
      name:'article',
      component:article
    },{
      path: '/feedback',
      name: 'feedback',
      component:feedback
    },{
      path: '/uploadAvatar',
      name: 'uploadAvatar',
      component:uploadAvatar
    },{
      path: '/setting',
      name: 'setting',
      component:setting
    },{
      path: '/historyList',
      name: 'historyList',
      component:historyList
    }
  ]
})
