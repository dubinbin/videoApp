<template>
  <div style="margin-bottom: 50px;">
    <ul class="hot_Recommend">
      <div class="title">
         <p>新番区</p>
     </div>
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
import {GroupTitle, XButton, Divider } from 'vux'

export default {
  components: {
    GroupTitle,
    XButton,
    Divider
  },
  created () {
  },
}
</script>

<style scoped lang="less">
.videoArea{
  float: left;
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
  padding-bottom: 6px;
  p{
    font-size: 16px;
    color: #F49898;
    font-weight: 400;
    display: block;
    text-align: center;
    cursor: pointer;
  }
}
</style>