<template>
  <div class="category">
   <ul class="categoryList">
     <li>
       <span><router-link to="/categorylist">新番</router-link></span>
      </li>
     <li>
       <span><router-link to="/categorylist">新番</router-link></span>
    </li>
     <li>
       <span><router-link to="/categorylist">新番</router-link></span>
    </li>
     <li>
       <span><router-link to="/categorylist">新番</router-link></span>
   </li>
   </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
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
