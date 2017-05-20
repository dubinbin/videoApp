<template>
  <div id="app">
    <myheader></myheader>
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from './components/Footer.vue';
import myheader from './components/Header.vue'
export default {
  name: 'app',
  components:{
    myfooter,
    myheader
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
