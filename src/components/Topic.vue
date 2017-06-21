<template>
  <div class="topic">
    <p class="topic_list_title">话题中心</p>
    <ul class="topiclist">
      <li v-for="item of topicList">
        <router-link :to="{path:'article',query:{id:item.id}}" tag="a">
        <img :src="item.coverPic" width="100%"> 
        <span>{{item.tname | cutText}}</span>
        <span>{{item.time}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {cutstr}  from '../common/js/cutText.js';
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
    created() {
       this.$http.get(''+LOCALHOST_URL+'/api/gettopiclist').then((response)=>{
        let body = response.body.data;
        this.topicList = body;
        for(let i=0;i<body.length;i++){
            body[i].coverPic = LOCALHOST_URL + body[i].coverPic.substring(1);
          }
      })    
    },
    data() {
      return {
        topicList:''
      }
    },
    filters: {
      cutText(text){
        return cutstr(text,'50')
      }
    }
}
</script>

<style lang="less">
.topic{
  margin-bottom: 50px;
}
.topiclist{
  li{
    width:94%;
    display: block;
    position: relative;
    margin: 0 auto;
    margin-bottom: 17px;
    background: #fff;
    box-shadow: rgb(232, 232, 232) 1px 1px 0px;
    border-radius: 4px;
    padding-bottom: 30px;
    img{
      height:150px;
    }
    span:nth-child(3){
      display: block;
      float: right;
      font-size: 12px;
      margin-right: 7px;
      margin-top: 4px;
      color: #a4a4a4;
    }
    span:nth-child(2){
      display: block;
      float: left;
      font-size: 12px; 
      margin-left: 7px;
      margin-top: 4px;  
      color: #606060;   
    }
  }

}
.topic_list_title{
  text-align: center;
  color:#F49898;
  font-size:14px;
  margin-top: 14px;
  margin-bottom: 12px;
}
</style>


