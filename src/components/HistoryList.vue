<template>
  <div id="history">
    <span class="Ctitle">观看记录</span>
    <div class="historyList" v-if="haveHistory">
      <ul class="history">
          <li class="videoArea" v-for="item of movielist">
            <router-link :to="{path:'video',query:{id:item.id}}" tag="a">
                <img :src="item.PicUrl" width="100%">
                <span>{{item.Mname}}</span>
            </router-link>
          </li>
      </ul>
    </div>

    <div class="Nohistory" v-else>您暂时没有观看记录</div>
  </div>
</template>

<script>
import { LOCALHOST_URL } from '../common/js/localhost.js'
export default {
    data() {
        return{
            movielist:'',
            haveHistory:''
        }
    },
    created() { 
        let id = localStorage.getItem('historyList');
        if(id!=='' && id!=='undefined' && id!==null){
          this.haveHistory = true;
          this.$http.get(''+LOCALHOST_URL+'/api/getHistory',{
          params:{historyID : id}
          }).then((response)=>{
          let body = response.body;
          this.movielist = body;
          for(let i=0;i<body.length;i++){
             body[i].PicUrl = LOCALHOST_URL + body[i].PicUrl.substring(1);
             }
          })   
        }else{
          this.haveHistory = false;
        }
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
.history{
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
.Nohistory{
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  color: #a4a4a4;
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


