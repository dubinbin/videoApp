<template>
  <div id="danmup"></div>
</template>

<script>
//有严重bug 
import '../common/js/jquery.shCircleLoader'
import '../common/js/sco.tooltip'
import '../common/js/colpick'
import '../common/js/jquery.danmu'
import '../common/js/main'
import { LOCALHOST_URL } from '../common/js/localhost.js'

export default {
	props: {
		videoSrc:{
			type: String
		}
	},
  created () {
    this.$nextTick(() => {
      $("#danmup").DanmuPlayer({
          src: this.videoSrc,
          width: "100%",
          urlToGetDanmu:" "+LOCALHOST_URL+"/api/getDanmu",
          urlToPostDanmu:""+LOCALHOST_URL+"/api/sendDanmu"
       });  
    })
  },
  destroyed() {

  }
}
</script>

<style lang="less">
@import '../common/css/scojs.css';
@import '../common/css/scojs.css';
@import '../common/css/fontsign.css';
@import '../common/css/main.css';
</style>


