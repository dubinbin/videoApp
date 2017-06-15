<template>
<div>
  <div id="article">
    <span class="article_title">{{article_title}}</span>
    <span class="article_sendTime">发布日期:{{article_time}}</span>
    <span class="article_category">分类: {{article_category}}</span>
     <span class="spritelink"></span>
    <div class="article_main" v-html="content"></div>
  </div>

    <span class="spritelink"></span>

    <div class="discuss" v-if="commentShow">
        <span>共有 : {{commentLength}}人参与讨论</span>
    </div>

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
    <div class="sendComment" v-if="this.$store.state.user.name!=''">
        <input type="text" class="CommentWrite" v-model="commentinfo">
        <span class="icon-send" @click="sendComment"></span>
    </div>
</div>
</template>

<script>
import { LOCALHOST_URL } from '../common/js/localhost.js';
import { mapState } from 'vuex';
import {formatDate} from '../common/js/date.js';

export default {
   created() {
        let id = this.$route.query.id;
        this.$http.get(''+LOCALHOST_URL+'/api/gettopic',{
        params:{id : id}
    }).then((response) => {
        var getData = response.body;
        this.article_title = getData[0].tname;
        this.article_time = getData[0].time;
        this.article_category = getData[0].name;
        this.content = getData[0].article;
    });

     //取到当前评论的数据
     this.$http.get(''+LOCALHOST_URL+'/api/getTopicCommentlist',{
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
     },
    data() {
      return {
        newComment:{
          username:'',
          time:'',
          comment:'',
          thumb:''
        },
        content:'',
        article_title:'',
        article_time:'',
        article_category:'',
        commentLength:'',
        commentShow:'',
        commentinfo:''
    }
   },
   methods:{
        sendComment() {
          let tid = this.$route.query.id;
          let userid = this.$store.state.user.id;
          let userName = this.$store.state.user.name;
          let avatar = this.$store.state.user.avatar;
          let sendDate = new Date();
          let comment_List_length = parseInt(this.commentLength);
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

        this.$http.post(''+LOCALHOST_URL+'/api/insertTopiccomment',{
          comment: this.commentinfo,
          time: serializeDate,
          tid: tid,
          uid: userid
          }).then((response) => {
            this.commentinfo ='';
            this.commentLength = comment_List_length+1;
            console.log(response);
          },(response)=>{
            console.log(response)
           }
          )
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

<style lang="less">
#article{
    padding: 8px 8px 0px 8px;
    .article_title{
       display: block;
   }
   .article_title{
      font-size: 15px;
   }
   .article_sendTime{
     font-size: 13px;
     color: #747474;
     margin-bottom: 8px;
     display: inline-block;
     margin-right: 7px;
   }
   .article_category{
     font-size: 13px;
     margin-bottom: 8px;
     display: inline-block;
     color: #747474;   
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
      height:47px;
      float: left;
      margin-left: -2px;
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
    p{
      padding: 14px 0px 9px 2px;
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
.discuss{
    padding: 9px 0px 0px 10px;
    font-size: 14px;
    font-weight: 200;
}
@media only screen
and (min-device-width: 320px)
and (max-device-width: 368px)
and (-webkit-min-device-pixel-ratio: 2) {
    .CommentWrite{
        outline: none;
        background: #e9e6e6;
        width: 69.6%;
        height: 27px;
        border-radius: 20px;
        padding-left: 11px;
        margin: 5px 9px 5px 0px;
        font-size: 15px;
    }
}
</style>


