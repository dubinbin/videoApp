<template>
  <div id="collect">
    <span class="Ctitle">我的收藏</span>
    <ul class="collect">
      <li class="videoArea" v-for="item of movielist">
         <router-link :to="{path:'video',query:{id:item.id}}" tag="a">
            <img :src="item.PicUrl" width="100%">
            <span>{{item.Mname}}</span>
         </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
    data() {
        return{
            movielist:''
        }
    },
    created() { 
         this.$http.get(''+LOCALHOST_URL+'/api/getUsercollect',{
             params:{id : this.$store.state.user.id}
            }).then((response)=>{
            let body = response.body;
            var id = body[0].collect.substring(1);
                this.$http.get(''+LOCALHOST_URL+'/api/getCollect',{
                  params:{collectID : id}
                }).then((response)=>{
                  let body = response.body;
                  this.movielist = body;
                  for(let i=0;i<body.length;i++){
                    body[i].PicUrl = LOCALHOST_URL + body[i].PicUrl.substring(1);
                  }
              }) 
          })   
      }
}
</script>

<style scoped lang="less">
.Ctitle{
    font-weight: 200;
    font-size: 13px;
    text-align: center;
    margin-top: 10px;
    color: #787878;
    display: block;
    margin-bottom: 10px;
}
a{color:#000}
.collect{
  display: inline-block;
  padding: 0px 10px 0px 10px;
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
  a{
    display: block;
  }
  span{
    display: inline-block;
  }
  li:nth-child(2n){
    margin-left: 5.7%;
  }
}
@media only screen
and (min-device-width: 320px)
and (max-device-width: 568px)
and (-webkit-min-device-pixel-ratio: 2) {

    .videoArea{
       height: 140px;
    }
}
</style>


