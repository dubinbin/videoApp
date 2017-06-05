<template>
<div id="videoGroup">

 <div class="loading" v-if="loadShow">
      <load-more :tip="('正在加载')"></load-more>
    </div>

    <ul class="hot_Recommend">
      <div class="title"><span>{{titleName}}</span>
      <span><router-link :to="{path:'categorylist',query:{id: typeID }}">更多</router-link></span>
      </div>
      <li class="videoArea" v-for="item of movielist" @click="histroy(item.id)">
          <router-link :to="{path:'video',query:{id:item.id}}" tag="a">
          <img :src="item.PicUrl" width="100%">
          <span>{{item.Mname}}</span>
         </router-link>
      </li>
    </ul>
  </div>
  
</template>

<script>
import { LOCALHOST_URL } from '../common/js/localhost.js'
const historyList = [];
import { LoadMore } from 'vux'
export default {
  components:{
     LoadMore
  },
  props:{
    typeID:{
        type: Number
    }
  },
  created () {
    this.loadShow = true;
    this.$http.get(''+LOCALHOST_URL+'/api/getmovielist',{
      params:{type : this.typeID}
    }).then((response)=>{
      let body = response.body.data;
      this.movielist = body;
      for(let i=0;i<body.length;i++){
        body[i].PicUrl = LOCALHOST_URL + body[i].PicUrl.substring(1);
      }
      this.titleName = response.body.name;
      this.loadShow = false;
    })
  },
  methods: {
    histroy(index){
      historyList.push(index);
      localStorage.setItem('historyList',historyList)
    }
  },
  data () {
    return {
      loadShow:'',
      titleName:'',
      movielist:'',
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
  img{
    border-radius: 4px;
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