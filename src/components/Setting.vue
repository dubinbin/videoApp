<template>
  <div>
    <group title="请输入您的新密码">
      <x-input title='重设密码' v-model="psw" type="password"></x-input>
    </group>

    <group title="请确认您的新密码">
      <x-input title='确认密码' v-model="rpsw" type="password"></x-input>
    </group>

    <input type="button" class="btn-primary" value="提交" @click="setPsw">
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { XInput, Group} from 'vux'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
  components: {
    XInput,
    Group
  },
  data () {
    return {
      psw: '',
      rpsw: ''
    }
  },
  methods: {
    setPsw() {
      if(this.psw != this.rpsw){
          alert('唔吼')
        }
        else{
          this.$http.post(''+LOCALHOST_URL+'/api/setPsw',{
           id :this.$store.state.user.id,
           password: this.psw,
           repeatPsw: this.rpsw
          }).then((response) => {
            this.setPswResponse(response)
          },(response)=>{
            console.log(response)
           }
          )
       }
    },
    setPswResponse(response){
        let body = response.body;
        if (body.state === '修改成功') {
            alert('修改成功!')
            this.logout();
          }else{
             alert('可能因为网络原因修改失败!')
          }
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
   }
}
</script>

<style lang="less">
.btn-primary{
    text-align: center;
    background: #478411;
    width: 90%;
    display: block;
    border-radius: 3px;
    font-size: 14px;
    position: relative;
    padding: 10px;
    color: #fff;
    margin: 0 auto;
    margin-top: 22px;
}
</style>