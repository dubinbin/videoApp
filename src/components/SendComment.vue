<template>
  <div class="sendComment" v-if="user.name!==''">
    <input type="text" class="CommentWrite" v-model="commentinfo">
    <span class="icon-send" @click="sendComment"></span>
  </div>
</template>

<script>
import { LOCALHOST_URL } from '../common/js/localhost.js'
export default {
    data(){
        return{
            commentinfo:''
        }
    },
    methods: {
        sendComment() {
            let mid = this.$route.query.id;
            let userid = this.$store.state.user.id;
            let userName = this.$store.state.user.name;
            let sendDate = new Date();
            let comment_List_length = parseInt(this.commentLength);
            let serializeDate = formatDate(sendDate, 'yyyy-MM-dd hh:mm');

            this.newComment.time = serializeDate;
            this.newComment.username = userName;
            this.newComment.comment = this.commentinfo;
            this.commentlist.push(this.newComment);

            if(this.commentlist.length==0){
                this.commentShow = false;
            }else{
                this.commentShow = true;
            }

            this.$http.post('{LOCALHOST_URL}/api/insertcomment',{
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
        }
    }
}
</script>

