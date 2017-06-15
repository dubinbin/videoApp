<template>
<transition name="move">
  <div class="categorylist" style="margin-bottom: 50px;">
    <ul class="hot_Recommend">
      <div class="title">
         <p>{{title}}</p>
     </div>
      <li class="videoArea" v-for="item of movielist">
         <router-link :to="{path:'video',query:{id:item.id}}" tag="a"><img :src="item.PicUrl" width="100%">
         <span>{{item.Mname | cutText }}</span>
        </router-link>
      </li>
    </ul>
    <span  v-if="!datano" class="clickMore" @click="clickMore">更多</span>
    <div v-if="datano"><divider>{{ ('没有啦～～～') }}</divider></div>
  </div>
</transition>
</template>

<script>
import { GroupTitle, XButton, Divider } from 'vux'
import { cutstr }  from '../common/js/cutText.js'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
  components: {
    GroupTitle,
    XButton,
    Divider
  },
  data() {
    return  {
      movielist:'',
      title:'',
      datano:false,
      currentPage:1
    }
  },
  created () {
    const id = this.$route.query.id
    this.$http.get(''+LOCALHOST_URL+'/api/getCategorymovie',{
      params:{id : id}
    }).then((response)=>{
      let body = response.body.data;
      this.movielist = body;
      this.title = response.body.name;
      for(let i=0;i<body.length;i++){
        body[i].PicUrl = LOCALHOST_URL + body[i].PicUrl.substring(1);
      }
    }) 
  },
  methods: {
    clickMore(){
      const id = this.$route.query.id;
      this.$http.post(''+LOCALHOST_URL+'/api/getCategorymoviePage',{
        pageNum : this.currentPage,
        id: id
       }).then((response) => {
         if(response.body!=''){
          this.currentPage++;
          let body = response.body;
          let data = [];
          let _this = this;
          for(let i=0;i<body.length;i++){
            var obj = {};
            obj.Mname = body[i].Mname;
            obj.id = body[i].id;
            obj.PicUrl = LOCALHOST_URL + body[i].PicUrl.substring(1);
            data[i] = obj;
            this.movielist.push(obj)
          }
         }else{
            this.datano = true;
         }     
      },(response)=>{
        console.log(response)
        }
      )   
    }
  },    
  filters: {
      cutText(text){
        return cutstr(text,'50')
      }
    }
}
</script>

<style scoped lang="less">
.categorylist{
    transform: translate3d(0, 0, 0);
    &.move-enter-active{
      transition: all 0.2s linear
    }
    &.move-enter{
      transform: translate3d(100%, 0, 0)
    }
    .clickMore{
      display: block;
      text-align: center;
      width: 90%;
      position: relative;
      margin: 0 auto;
      border: 1px solid #e9e9e9;
      border-radius: 3px;
      margin-bottom: 66px;
      background: #fff;
      font-size: 12px;
      padding:5px;
    }
}
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
@media only screen and (min-device-width: 320px)and (-webkit-min-device-pixel-ratio: 2) {
         //针对iPhone 4, 5c,5s, 所有iPhone6的放大模式，个别iPhone6的标准模式
         .videoArea{
           height: 124px;
           img{
             height: 88px;
           }
         }
}
@media only screen and (min-device-width: 375px)and (-webkit-min-device-pixel-ratio: 2) {
//针对大多数iPhone6的标准模式
         .videoArea{
            height: 151px;
           img{
             height: 108px;
           }
         }
}
  
@media only screen and (min-device-width: 375px)and (-webkit-min-device-pixel-ratio: 3) {
//针对所有iPhone6+的放大模式
  //针对大多数iPhone6的标准模式
         .videoArea{
           height: 157px;
           img{
             height: 111px;
           }
         }
}
@media only screen and (min-device-width:412px) and (-webkit-min-device-pixel-ratio: 3) {
//针对所有iPhone6+的标准模式,414px写为412px是由于三星Nexus 6为412px，可一并处理
   //针对大多数iPhone6的标准模式
         .videoArea{
           height: 157px;
           img{
             height: 111px;
           }
         } 
}
</style>