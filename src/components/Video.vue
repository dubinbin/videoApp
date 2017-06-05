<template>
<div class="video">

  <videoPlay :videoSrc="videoSrc"></videoPlay>

  <div class="titlebar"><span>视频信息</span></div>
  <div class="videoInfo">
    <span>标题 : {{videoName}}</span>
    <span>评价 : {{commentLength}} 条评论</span>
    <span>简介 : {{videoContent | cutText}}</span>
  </div>
 <span class="spritelink"></span>

 <div class="author">
   <div class="author_info">
      <img :src="author_avatar">
      <span>作者: {{author}}</span>
      <span>发布于 {{publishTime}}</span>
   </div>

   <div class="favorite_btn" v-if="user.name!==''">
      <span class="icon-love favorite" @click="toggleFavorite" :class="{'active':favorite}"></span>
      <p class="favorite_text">{{favoriteText}}</p>
   </div>

 </div>
 <span class="spritelink"></span>

 <div class="comment" v-if="commentShow">
   <p class="CommentTitle">评论</p>
   <ul class="commentList">
     <li v-for="item of commentlist">
      <img :src="item.thumb">
      <span>{{item.username}}</span>
      <span>{{item.time}}</span>
      <p>{{item.comment}}</p>
     </li>
   </ul>
 </div> 

 <div class="noComment" v-else>
   <p>暂无评论</p>
 </div>
 <!--后期考虑把这个评论功能拆分一个组件-->
  <div class="sendComment" v-if="user.name!==''">
    <input type="text" class="CommentWrite" v-model="commentinfo">
    <span class="icon-send" @click="sendComment"></span>
   </div>
 </div>
</template>

<script> 
import videoPlay from './VideoPlay.vue';
import {cutstr}  from '../common/js/cutText.js';
import {formatDate} from '../common/js/date.js';
import {inArray,removeByValue} from '../common/js/inArray.js';
import { mapState } from 'vuex';
var videoUrl ='';
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
    created() {
      //取到当前视频
      let id = this.$route.query.id;
      this.$http.get(''+LOCALHOST_URL+'/api/DanmuvideoInfo',{
          params:{id : id}
        }).then((response) => {
           let videoInfo = response.body.data;
           let GetvideoSrc = LOCALHOST_URL + videoInfo[0].movieUrl.substring(1);
           videoUrl = GetvideoSrc;
           this.videoName= videoInfo[0].Mname;
           this.author = videoInfo[0].username;
           this.author_avatar =LOCALHOST_URL+videoInfo[0].thumb.substring(1);
           this.videoContent = videoInfo[0].content;
           this.publishTime = videoInfo[0].showTime;
           //从后台获取收藏字段并转为数组
        });

       //取到当前评论的数据
       this.$http.get(''+LOCALHOST_URL+'/api/getMovieCommentlist',{
          params:{id : id}
        }).then((response) => {
           let getComment = response.body;
           this.commentlist = getComment;
           for(let i=0;i<getComment.length;i++){
             getComment[i].thumb = LOCALHOST_URL + getComment[i].thumb.substring(1)
           }
           this.commentLength = getComment.length;        
           if(getComment.length==0){
            this.commentLength = '0';
            this.commentShow = false;
           }else{
            this.commentLength = getComment.length;
            this.commentShow = true;
           }
        });

        //取到用户收藏的数据  //如果有
      if(this.$store.state.user.id!='' && this.$store.state.user.id!=undefined){
        this.$http.get(''+LOCALHOST_URL+'/api/getUsercollect',{
            params:{id : this.$store.state.user.id}
          }).then((response) => {
            var collectData = response.body;
            let CollectArray = collectData[0].collect;
            var Collect_List = CollectArray.split(',');
            this.favoriteList = Collect_List;
            if(inArray(Collect_List,id)){
              this.favorite = true;
            }else{
              this.favorite = false;
            }
          });
      }

    },    
    beforeMount(){
      this.videoSrc = videoUrl;
    },
    data() {
     return {
        newComment:{
          username:'',
          time:'',
          comment:'',
          thumb:''
        },
        commentlist:'',
        favoriteList:'',
        commentinfo:'',
        commentLength:'',
        commentShow:'',
        videoSrc: '',
        videoName:'',
        videoContent:'',
        author:'',
        author_avatar:'',
        publishTime:'',
        favorite:''
      }
    },
    methods: {
        sendComment() {
          let mid = this.$route.query.id;
          let userid = this.$store.state.user.id;
          let userName = this.$store.state.user.name;
          let avatar = this.$store.state.user.avatar;
          let comment_List_length = parseInt(this.commentLength);
          let sendDate = new Date();
          let serializeDate = formatDate(sendDate, 'yyyy-MM-dd hh:mm');

          this.newComment.time = serializeDate;
          this.newComment.username = userName;
          this.newComment.comment = this.commentinfo;
          this.newComment.thumb = LOCALHOST_URL + avatar.substring(1);
          this.commentlist.push(this.newComment);

          if(this.commentlist.length==0){
              this.commentShow = false;
            }else{
              this.commentShow = true;
          }

          this.$http.post(''+LOCALHOST_URL+'/api/insertMoviecomment',{
            comment: this.commentinfo,
            time: serializeDate,
            mid: mid,
            uid: userid
          }).then((response) => {
            this.commentinfo ='';
            this.commentLength = comment_List_length+1;
            console.log(response);
          },(response)=>{
            console.log(response)
           }
          )
        },
        toggleFavorite() {
          this.favorite = !this.favorite;
          let id = this.$route.query.id;

          let SerializeId = ''+ id +'';

          if(this.favorite){
            this.favoriteList.push(SerializeId);
          }else{
            removeByValue(this.favoriteList,id);
          }
   
          this.$http.post(''+LOCALHOST_URL+'/api/toggleColllect',{
           collectlist: this.favoriteList,
           uid:this.$store.state.user.id
          }).then((response) => {
            console.log(response)
          },(response)=>{
            console.log(response)
         })
      }
    },
    components :{
     videoPlay
    },
    computed:mapState({
      user(){
        var getUserName = window.localStorage.getItem('userName');
        if(this.$store.state.user.name ==''){
            this.$store.commit('GET_USER', {name: getUserName})
        }
          return this.$store.state.user;
        },
     favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    }), 
    filters: {
      cutText(text){
        return cutstr(text,'200')
      }
    }
}
</script>

<style scoped lang="less">
.video{
  margin-bottom:100px;
}
.titlebar{
  background: #fff;
  height: 40px;
  span{
    font-size: 14px;
    color: #ffa7a7;
    display: inline-block;
    padding: 11px 0px 8px 2px;
    margin: 0px 0px 0px 10px;
    border-bottom: 1px solid #ffa8a7;
  }
}
.videoInfo{
  padding: 15px 12px 13px 12px;
  span{
    display: block;
    font-size: 14px;
    color: #767676;
    font-weight: 300;
  }
}
.author{
  padding: 14px 11px 16px;
  height:50px;
  .author_info{
    width: 78%;
    padding: 2px 0px 0px 6px;
    float:left;
  }
  img{
    border-radius: 50%;
    width: 45px;
    height:45px;
    float: left;
    }
  span:nth-child(2){
    font-size: 14px;
    color: #616161;
    font-weight: 300;
    margin-top: 2px;
    padding-bottom: 2px;
    display: block;
    margin-left: 50px;
  }
  span:nth-child(3){
    font-size:12px;
    display: block;
    margin-left: 50px;
    color: #8c8c8c;
    font-weight: 300;
  }
  .favorite_btn{
      width:18%;
      text-align: center;
      margin-top: 2px;
      float: right;
    .favorite_text{
      font-size: 9px;
      color: #a9a9a9;
      font-weight: 200;
      text-align: center;
      margin-top: -6px;
    }
    .favorite{
      font-size: 25px;
      color: #b5b5b5; 
      display: inline-block;
      margin-top: 3px;
    }
    .active{
      color: #ffc3c3;
    }
  }
}
.commentList{
  li{
    list-style: none;
    padding: 0px 0px 0px 6px;
    border-bottom: 1px solid #e8e8e8;
    margin: 0px 0px 20px 0px;
    img{
      border-radius: 50%;
      width: 47px;
      padding-right: 8px;
      height:47px;
      padding: 0px;
      float: left;
      }
    span:nth-child(2){
      font-size: 14px;
      color: #616161;
      font-weight: 300;
      margin-top: 2px;
      padding-bottom: 2px;
      display: block;
      margin-left: 54px;
    }
    span:nth-child(3){
      font-size:12px;
      display: block;
      margin-left: 50px;
      color: #8c8c8c;
      font-weight: 300;
      margin-top: 2px;
      margin-left: 54px;
    }
    p{
      padding: 14px 0px 9px 7px;
      font-size: 13px;
      font-weight: 300;
    }
  }
}
.noComment{
  p{
    text-align: center;
    font-weight: 200;
    margin-top: 16px;
    color: #9e9e9e;
  }
}
.comment{
  padding: 14px 11px 16px;
  .CommentTitle{
    padding: 0px 0px 5px 3px;
    font-size: 14px;
  }
 .CommentTitle:before{
    padding: 0px 2px;
    background-color: #DF6363;
    content: '';
    margin-right: 6px;
  }
}
.spritelink{
    width: 100%;
    display: block;
    border-bottom: 1px solid #e7e7e7;
}
.CommentWrite{
    outline: none;
    background: #e9e6e6;
    width: 75.6%;
    height: 27px;
    border-radius: 20px;
    padding-left: 11px;
    margin: 5px 9px 5px 0px;
    font-size: 15px;
}
.sendComment{
    position: fixed;
    bottom: 49px;
    width: 100%;
    padding-left: 3.2%;
    height: 41px;
    background: #ffffff;
    span{
      font-size: 22px;
      position: relative;
      float: right;
      position: absolute;
      padding: 8px 0px 0px 15px;
    }
}
</style>
