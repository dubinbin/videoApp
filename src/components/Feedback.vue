<template>
  <div id="feedback">
    <group :title="('意见 & 反馈')">
      <x-input :placeholder="('功能？样式？')" v-model="title"></x-input>
      <x-textarea :max="200" name="description" :placeholder="(' 请写下您的意见和建议')" v-model="content"></x-textarea>
    </group>

    <group :title="('联系方式')">
      <x-textarea :max="200" name="detail" :placeholder="('邮箱或者QQ,手机号')" :show-counter="false" v-model="contact"></x-textarea>
    </group>
   <div class="sendbtn">
     <span @click="sendFeed">提交</span>
   </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {formatDate} from '../common/js/date.js';
import { XTextarea, Group, XInput } from 'vux'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
  components: {
    XTextarea,
    Group,
    XInput
  },
  data() {
    return {
      title:'',
      content:'',
      contact:''
    }
  },
  methods: {
    sendFeed() {
     let sendDate = new Date();
     let userName;
     let serializeDate = formatDate(sendDate, 'yyyy-MM-dd hh:mm');
     if(this.$store.state.user.name==''||this.$store.state.user.name=='undefined'){
       userName = '访客'
     }else{
       userName = this.$store.state.user.name;
     }
     this.$http.post(''+LOCALHOST_URL+'/api/insertAdvise' ,{
      title:this.title,
      content: this.content,
      contact:this.contact,
      time:serializeDate,
      uName:userName
     }).then((response)=>{
       let body=  response.body;
       if(body.state === '成功'){
         alert('反馈成功，感谢反馈');
         this.$router.push('/about')
       }else{
         alert('反馈失败，可能是网络原因')
       }
     },(response)=>{
       console.log(response)
       }
      )
    }
  }
}
</script>

<style scoped lang="less">
#feedback{
  .sendbtn{
      padding:15px;
      span{
        display: inline-block;
        height: 40px;
        width: 100%;
        background: #439f10;
        text-align: center;
        line-height: 40px;
        border-radius: 3px;
        color: #fff;

      }
  }
}
</style>


