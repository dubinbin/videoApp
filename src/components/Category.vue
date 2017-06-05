<template>
  <div class="category">

    <div class="loading" v-if="loadShow">
      <load-more :tip="('正在加载')"></load-more>
    </div>

   <ul class="categoryList">
     <li v-for="item of categorylist">
       <span><router-link :to="{path:'categorylist',query:{id:item.fid}}">{{item.name}}</router-link></span>
    </li>
   </ul>
  </div>
</template>

<script>
import { LoadMore } from 'vux'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
  created() {
    this.loadShow = true
    this.$http.get(''+LOCALHOST_URL+'/api/movieCategoryList').then((response)=>{
      this.categorylist = response.body;
      this.loadShow = false
    })
  },
  data() {
    return {
      categorylist:'',
      loadShow:''
    }
  },
  components: {
     LoadMore
  }
}
</script>

<style scoped lang="less">
.loading{
    position: absolute;
    top: 43%;
    left: 35%;
    right: 35%;
    color: #fff;
    width: 30%;
    background: rgba(36, 36, 36, 0.75);
    height: 90px;
    border-radius: 9px;
}
.categoryList{
  padding: 10px 10px 10px 10px;
  li{
    width: 33.33333%;
    display: block;
    float: left;
  }
  span{   
    a{
      display: block;
      color: #FFC3C3;
      padding: 5px 0px 5px 0px;
      margin: 13px 9px 0px 9px;
      border: 1px solid #FFC3C3;
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>
