<template>
<div class="uplaodAvatar">
    <img class="avatar" :src="imgSrc">
    <vue-core-image-upload
        class="btn btn-primary"
        :crop="false"
        text="点击上传头像"
        compress="50"   
        inputOfFile='user'
        @imageuploaded="imageuploaded"
        :max-file-size="5242880"
        url="http://back.dubinbin.cn:8080/api/uploadUserPic" >
    </vue-core-image-upload>

    <div class="btnGroup">
        <span class="sureChange" v-if="src!=''" @click="cofirmChange">确定更换</span>
        <span class="cancelChange" @click="cancelUpload">取消更换</span>
    </div>
</div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapState } from 'vuex'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
  created() {
    if(this.$store.state.user.avatar){
      var getAvatar = this.$store.state.user.avatar;
      this.imgSrc =LOCALHOST_URL + getAvatar.substring(1);
    }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  data() {
    return {
      src: '',
      imgSrc:''
    }
  },
  methods: {
    cofirmChange(){
     let uid = this.$store.state.user.id;
     this.$http.post(''+LOCALHOST_URL+'/api/setUserPic',{
        PicSrc:this.src,
        uid:uid
     }).then((response)=>{
        this.$store.state.user.avatar = this.src;
        this.$router.push('/about')
     },(response)=>{
        console.log(response)
     })       
    },
    cancelUpload(){
      if(this.src==''){
        this.$router.push('/about')
      }else{
        this.$http.post(''+LOCALHOST_URL+'/api/cancelUpload',{
          PicSrc:this.src
        }).then((response)=>{
         this.$router.push('/about')
        },(response)=>{
         console.log(response)
        }) 
      }
    },
    imageuploaded(res) {
      if (res!=null) {
        this.src = res;
        this.imgSrc = LOCALHOST_URL + (this.src).substring(1);
      }
    }
  },
  computed:mapState({
      user(){
        var getUserName = window.localStorage.getItem('userName');
        if(this.$store.state.user.name ==''){
            this.$store.commit('GET_USER', {name: getUserName})
        }
          return this.$store.state.user;
        }
    })
}
</script>

<style scoped lang="less">
.avatar{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: block;
    position: relative;
    margin: 0 auto;
    margin-top: 30px;
}
#g-core-upload-input-8392{
    background: #f0f;
}
.btn-primary{
    text-align: center;
    background: #478411;
    width: 64%;
    display: block;
    border-radius: 3px;
    font-size: 14px;
    position: relative;
    padding: 10px;
    color: #fff;
    margin: 0 auto;
    margin-top: 22px;
}
.btnGroup{
    .sureChange{
        text-align: center;
        background: #478411;
        width: 64%;
        display: block;
        border-radius: 3px;
        font-size: 14px;
        position: relative;
        padding: 10px;
        margin: 0 auto;
        color: #fff;
        margin-top: 22px
    }
    .cancelChange{
        text-align: center;
        background: #ac4242;
        width: 64%;
        display: block;
        margin: 0 auto;
        border-radius: 3px;
        font-size: 14px;
        position: relative;
        padding: 10px;
        color: #fff;
        margin-top: 22px
    }
}
</style>
