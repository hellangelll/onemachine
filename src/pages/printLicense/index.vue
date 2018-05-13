<template>
<!--首页-->
    <div class="index">
        <!--顶栏-->
        <Header></Header>
        <!--顶部的tabs及列表内容-->
        <div class="coment">
          <div class="yyzz-note">
            <transition>
              <router-view @do-something="changeSec"></router-view>
            </transition>
          </div>
            <div class="count-down">{{sec}}</div>
            <img class="img" style="top:740px;left:1780px;" @click="back()" src="@/assets/btn_return.png" alt="返回">
            <img class="img" style="top:880px;left:1780px;" @click="goto('/')" src="@/assets/btn_leave.png" alt="退出">
        </div>
    </div>
</template>

<script>
    import Header from '@/components/header.vue'
    export default {
        components: {
            Header
        },
        beforeDestroy: function(){
             window.external.listen_Stop()
        },
        mounted(){
            let me = this;
            let oldPath = '';
            let interval = window.setInterval(function() {
              if(oldPath !== me.$router.currentRoute.path){
                oldPath = me.$router.currentRoute.path;
                me.sec = 120;
                me.isNeedSound =true;
                return
              }
              if(me.sec <= 20 && me.isNeedSound){
                me.isNeedSound = false;
                setTimeout(function(){
                    window.soundPlayer18();
                },100)
              }
              if ((me.sec--) <= 0) {
                window.PP_viewer_three && window.PP_viewer_three.hide();
                window.PP_viewer_four && window.PP_viewer_four.hide();
                window.hideLoding();
                window.clearInterval(interval);
                me.$router.push('/');
              }
            }, 1000);
        },
        data(){
            return {
              sec:120,
              isNeedSound: true
            }
        },
        methods: {
            goto (par) {
              this.$router.push({ path: par })
            },
            back () {
              this.$router.back(-1)
            },
            changeSec (){
              this.sec = 120;
            }
        }
    }
</script>

<style scope>
   .index{
     margin: 0;
     width: 100%;
   }
    .yyzz-note{
      position: absolute;
      left: 155px;
      top: 160px;
      height: 895px;
      width: 1595px;
      background-image: url('../../assets/box_bg.png');
      background-repeat: no-repeat;
      /* opacity: 0.9; */
    }
   .coment{
     width: 100%;
      height: 940px;
     background-image: url('../../assets/bg.jpg');
   }
   .count-down{
      position: absolute;
      width: 116px;
      height: 116px;
      line-height: 116px;
      text-align: center;
      top: 900px;
      left: 10px;
      font-size: 58px;
      color: #04a4f9;
      background-image: url(../../assets/321.png);
      background-repeat: no-repeat;
      background-size: 135px;
      border-radius: 200px;
      background-position-y: -7px;
      background-position-x: -9px;
    }
</style>