<template>
  <div style="margin-bottom: 50px;">
    <swiper :list="swiper_list" v-model="swiper_index" @on-index-change="swiper_onIndexChange" auto></swiper>
    <ul class="hot_Recommend">
      <div class="title"><span>热门推荐</span><span>更多></span></div>
      <li class="videoArea">
         <router-link to="/videoPlay" tag="a"><img src="../assets/img/example.jpg" width="100%">
        <span>我与66的视听柜</span>
         </router-link>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg"  width="100%">
        <span>我与66的视听柜</span>
         </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg" width="100%">
        <span>我与66的视听柜</span>
        </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg"  width="100%">
        <span>我与66的视听柜</span>
         </a>
      </li>
    </ul>

    <ul class="hot_Recommend">
      <div class="title"><span>热门推荐</span><span>更多></span></div>
      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg" width="100%">
        <span>我与66的视听柜</span>
        </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg"  width="100%">
        <span>我与66的视听柜</span>
         </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg" width="100%">
        <span>我与66的视听柜</span>
        </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg"  width="100%">
        <span>我与66的视听柜</span>
         </a>
      </li>
    </ul>

     <ul class="hot_Recommend">
      <div class="title"><span>热门推荐</span><span>更多></span></div>
      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg" width="100%">
        <span>我与66的视听柜</span>
        </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg"  width="100%">
        <span>我与66的视听柜</span>
         </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg" width="100%">
        <span>我与66的视听柜</span>
        </a>
      </li>

      <li class="videoArea">
         <a href="#"><img src="../assets/img/example.jpg"  width="100%">
        <span>我与66的视听柜</span>
         </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
const baseList = [{
  url: 'javascript:',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/3.jpg',
  title: '送你一次旅行'
}]

const only2List = baseList.slice(0, 2);

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  created () {
  },
  methods: {
    swiper_onIndexChange (index) {
      this.swiper_index = index
    }
  },
  data () {
    return {
      swiper_list: baseList,
      swiper_index: 0,
    }
  }
}
</script>

<style lang="less">
a{color:#000}
.videoArea{
  float: left;
  padding-bottom: 10px;
  width:47%;
  font-size: 12px;
  list-style: none;
  span{
    display: inline-block
      }
}
.hot_Recommend{
  display: inline-block;
  padding: 0px 10px 0px 10px;
  a{
    display: block;
  }
  span{
    display: inline-block;
  }
  li:nth-child(2n-1){
    margin-left: 5.7%;
  }
}
.title{
  margin-top: 10px;
  padding-bottom: 26px;
}
.title span:nth-child(2){
    position: absolute;
    right: 12px;
    font-size: 12px;
    color: #989698;
    font-weight: 200;
    cursor: pointer;
}
.title span:nth-child(1){
    position: absolute;
    left: 12px;
    font-size: 14px;
    color: #000;
    font-weight:400;
    cursor: pointer; 
}
</style>