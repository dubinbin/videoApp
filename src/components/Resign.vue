<template>
 <div class="resignForm">
  <span class="resignTitle">注册</span>
   <div class="resignGroup">
    <input type="text" placeholder="请输入您的用户名" class="userName" v-model="username"  @blur="onBlur">
    <span class="tips"></span>
    <input type="password" placeholder="请设置您的密码" class="password" v-model="password">
    <input type="password" placeholder="请再次输入您的密码" class="repassword" v-model="repassword">
    <input type="tel" placeholder="请输入您的手机号码" class="mobilephone" v-model="mobilephone">

    <a class="resign" @click="resign">注册</a>
    <p class="userUselist">阅读用户使用协议</p>
  </div>
 </div>
</template>

<script>
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
    data() {
     return {
        username: '',
        password: '',
        repassword: '',
        checkCode:'',
        mobilephone: ''
       }
    },
    methods: {
      //鼠标移出时验证用户名是否存在数据库
      onBlur(){
        this.$http.post(''+LOCALHOST_URL+'/api/checkUserName',{
          username:this.username
        }).then((response)=>{
           let body = response.body;
           if(body.state ==='用户名已存在'){
             this.checkCode = false;
             document.querySelector('.tips').innerHTML = '昵称已被使用,请使用其他昵称'
           }else{
             this.checkCode = true;
             document.querySelector('.tips').innerHTML = ''
           }
        },(response)=>{
           console.log(response)
        })
      },
      resign() {
        if(this.checkCode == false || this.username ==''){
          alert('昵称已占用或者没有输入');
          this.username ='';
        }else{
        this.$http.post(''+LOCALHOST_URL+'/api/resign',{
          username:this.username,
          password:this.password,
          mobileNum:this.mobilephone,
        }).then((response)=>{
        let body = response.body;
          if(body.state=='注册失败'){
            alert('注册失败')
          }else{
            alert('注册成功')
            this.$router.push('/login')
          }
         },(response)=>{
            console.log(response)
          }
        )}
      }
    }
}
</script>

<style lang="less">
input {
  -webkit-appearance:none;
  background-color:transparent; 
  border-color:transparent;   
}
.resignGroup{
  width: 68%;
  position: relative;
  margin: 0 auto;
  .userUselist{
      font-size: 12px;
      margin-top: 5px;
      text-align: center;
      color: #949494;
      font-weight: 200;
  }
}
.userName,.password,.repassword,.mobilephone{
    width: 97%;
    outline: none;
    margin-bottom: 13px;
    padding: 9px 0px 9px 6px;
    border: 1px solid #cecece;
    border-radius: 4px;
}
input::-webkit-input-placeholder{
  padding-left: 5px;
}
.tips{
    font-size: 12px;
    color: red;
    position: relative;
    top: -9px;
}
.resign{
  display: block;
  background: #FF9797;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-weight: 200;
  padding: 7px 0px 7px 0px;
  margin-top: 4px;
}
.resignTitle{
  text-align: center;
  display: block;
  font-weight: 200;
  font-size: 16px;
  color:#FF9797;
  margin-bottom: 27px;
}
.resignForm{
  margin-top: 47px;
}
</style>
