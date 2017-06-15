<template>
  <div>
    <tabbar>
        <div class="tabnav">
            <router-link to="/home" tag="div">
                <span class="icon-index"></span>
                <p>首页</p>
            </router-link>
        </div>

        <div class="tabnav">
            <router-link to="/category" tag="div">
                <span class="icon-category"></span>
                <p>分类</p>
            </router-link>
        </div>

        <div class="tabnav">
            <router-link to="/find" tag="div">
                <span class="icon-found"></span>
                <p>发现</p>
            </router-link>
        </div>

        <div class="tabnav">
            <router-link to="/about" tag="div">
                <span class="icon-me"></span>
                <p>我</p>
            </router-link>
        </div>
    </tabbar>
  </div>
</template>

<script>
import {Tabbar} from 'vux'

export default {
components: {
    Tabbar
  }
}
</script>

<style lang="less">
.tabnav{
    flex: 1;
    div{
        &.active{
            color:rgb(240,20,20) 
        }
    }
    p {
        text-align:center;
        font-size: 12px;
    }
    span{
        display: inline-block;
        font-size: 23px;
        width: 100%;
        text-align: center;
        top: 3px;
        position: relative;
        padding-top: 2px;
    }
}

.weui-tabbar{
    background-color: #fff!important;
    position: fixed!important;
}
</style>

