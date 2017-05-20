<template>
 <div class="loginForm">
  <span class="loginTitle">登陆 | 发现更多精彩</span>

   <div class="loginGroup">
    <input type="text" placeholder="请输入您的用户名" class="userName">
    <input type="password" placeholder="请输入您的密码" class="password">

    <a class="login">登陆</a>
    <a class="quicksign">快速注册</a>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less">
input {
  -webkit-appearance:none;
  background-color:transparent; 
  border-color:transparent;   
}
.loginGroup{
  width: 68%;
  position: relative;
  margin: 0 auto;
}
.userName,.password{
  width: 99%;
  outline: none;
  margin-bottom: 13px;
  padding: 9px 0px 9px 0px;  
  border: 1px solid #cecece;
  border-radius: 4px;
}
input::-webkit-input-placeholder{
  padding-left: 5px;
}
.login{
  display: block;
  background: #FF9797;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-weight: 200;
  padding: 7px 0px 7px 0px;
  margin-top: 4px;
}
.quicksign{
  font-size: 13px;
  color: #FF9797;
}
.loginTitle{
  text-align: center;
  display: block;
  font-weight: 200;
  font-size: 13px;
  color:#FF9797;
  margin-bottom: 27px;
}
.loginForm{
  margin-top: 60px;
}
</style>
