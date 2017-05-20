<template>
  <div id="danmup" style="left:0;top:0"></div>
</template>

<script> 
import '../common/js/jquery.shCircleLoader'
import '../common/js/sco.tooltip'
import '../common/js/colpick'
import '../common/js/jquery.danmu'
import '../common/js/main'

export default {
  data(){
    return{
        videoSrc: '../common/video/1.mp4'
    }
 }, 
  mounted() {
    $("#danmup").DanmuPlayer({
        src: this.videoSrc,
        width: "100%" //区域的宽度
     });       
    }
}
</script>

<style lang="less">
@import '../common/css/scojs.css';
@import '../common/css/scojs.css';
@import '../common/css/fontsign.css';
@import '../common/css/main.css';

</style>


