<template>
  <div class="about">
    <div class="aboutTop" v-if="this.$store.state.user.name==''|| this.$store.state.user.name ==null">
      <span class="loginBtn"><router-link to="/login">登陆</router-link></span>
      <span class="newAccount"><router-link to="/resign">注册新账号</router-link></span>
    </div>
   
    <div class="loginUser" v-if="this.$store.state.user.name!='' && this.$store.state.user.name!=null">
      <router-link to="/uploadAvatar" ><img class="userIcon" :src="avatar"></router-link>
      <span>{{user.name}}</span>
    </div>

     <div v-transfer-dom>
      <confirm v-model="show"
        :title="('提示')"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        @on-show="onShow"
        @on-hide="onHide">
          <p style="text-align:center;">你确定要退出吗？</p>
      </confirm>
    </div>   

    <group>
      <cell v-if="this.$store.state.user.name!=''&& this.$store.state.user.name!=null" title="我的收藏" is-link link="/collect"></cell>
      <cell title="历史记录" is-link link="/historyList"></cell>
      <cell v-if="this.$store.state.user.name!=''&& this.$store.state.user.name!=null" title="设置" is-link  link="/setting"></cell>
      <cell title="意见反馈" is-link link="/feedback"></cell>
    </group>
    
     <span v-if="this.$store.state.user.name!=''&& this.$store.state.user.name!=null" class="showConfirm" @click="showConfirm">退出登陆</span>
   </div>
  </div>
</template>

<script>
import { Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom } from 'vux'
import { Cell, CellBox } from 'vux'
import { mapState } from 'vuex'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
  created() {
    if(this.$store.state.user.avatar){
      var getAvatar = this.$store.state.user.avatar;
      this.avatar = LOCALHOST_URL+ getAvatar.substring(1);
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Confirm,
    XSwitch,
    XButton
  },
  data() {
    return{
      userName:'',
      show: false,
      avatar:''
    }
  },
  methods: {
    showConfirm(){
      this.show = true;
    },
    logout() {
      this.$http.post(''+LOCALHOST_URL+'/api/logout').then((response) => {
          this.$store.commit('SET_USER', {name: ''})
          this.$router.push('/login')
          console.log('已退出')
        },(response)=>{
          console.log(response)
          }
        )
      },
    onCancel () {
      console.log('on cancel')
    },
    onConfirm () {
      this.logout();
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
  },
  computed:mapState({
      user(){
        var getUserName = window.localStorage.getItem('userName');
        var getAvatarLocal = window.localStorage.getItem('avatar');
        if(this.$store.state.user.name ==''){
            this.$store.commit('GET_USER', {name: getUserName})
        }
        return this.$store.state.user;
      }
  })  
}
</script>

<style scoped lang="less">
.about{
  margin-bottom: 90px;
}
.aboutTop{
  padding-top: 50px;
}
.newAccount a{
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
.loginUser{
  margin: 28px 0px 15px 0px;
  img{
    width: 110px;
    height: 110px;
    position: relative;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
   }
    span{
      display: block;
      position: relative;
      text-align: center;
      font-size: 16px;
      font-weight: 200;
      margin-top: 9px;
    }
}
.showConfirm{
    text-align: center;
    display: block;
    background: #fff;
    margin-top: 18px;
    padding: 8px 0px 8px 0px;
    margin-bottom: 30px;
}
</style>


