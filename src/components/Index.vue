<template>
  <div style="margin-bottom: 50px;">
    <swiper :list="swiper_list" v-model="swiper_index" @on-index-change="swiper_onIndexChange" auto></swiper>
      <videoGroup :typeID="1"></videoGroup>
      <videoGroup :typeID="2"></videoGroup>
      <videoGroup :typeID="3"></videoGroup>
  </div>
</template>

<script>
import { LOCALHOST_URL } from '../common/js/localhost.js'
import { Swiper, SwiperItem } from 'vux'
import videoGroup from './VideoGroup.vue';

export default {
  components: {
    Swiper,
    SwiperItem,
    videoGroup,
  },
  created () {
    this.$http.get(''+LOCALHOST_URL+'/api/bannerList').then((response=>{
        let body = response.body;
        var data = [];
        let _this = this;
        for(let i=0;i<body.data.length;i++){
          var obj = {};
          obj.title = body.data[i].title;
          obj.img = LOCALHOST_URL + body.data[i].url.substring(1);
          data[i] = obj;
        }
       _this.swiper_list = data;
    }))
  },
  methods: {
    swiper_onIndexChange (index) {
      this.swiper_index = index
    }
  },
  data () {
    return {
      swiper_list:[],
      swiper_index: 0,
      typeID:''
    }
  },
}
</script>

<style lang="less">

</style>