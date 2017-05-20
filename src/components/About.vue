<template>
  <div>
    <div class="aboutTop">
      <span class="loginBtn"><router-link to="/login">登陆</router-link></span>
      <span class="newAccount">注册新账号</span>
    </div>

    <div style="background: #fff;padding-top: 11px;">
    <group>
      <cell title="我的收藏" is-link link="/find"></cell>
      <cell title="历史记录" is-link></cell>
      <cell title="设置" is-link></cell>
      <cell title="意见反馈" is-link></cell>
    </group>
  </div>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
export default {
  components: {
    Group,
    Cell
  }
}
</script>

<style lang="less">
.aboutTop{
  padding-top: 50px;
  background: #fff;
}
.newAccount{
  display: block;
  color:#FFC3C3;
  font-weight: 200;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
.loginBtn{
   a{
    display: block;
    width: 69%;
    position: relative;
    margin: 0 auto;
    border: 1px solid #FFC3C3;
    text-align: center;
    color: #FFC3C3;
    border-radius: 8px;
    line-height: 42px;
    font-size: 18px;
   }
}
</style>


