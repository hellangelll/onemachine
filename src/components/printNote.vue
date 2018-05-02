<template>
<div class="coment">
  <div class="yyzz-note">
    <img style="position: absolute;top:10px; left:10px;" src="../assets/printInfo.png" alt="">
  </div>
  <div class="count-down">{{sec}}</div>
  <img class="img" style="top:428px;left:1350px;" src="../assets/guidance.png" alt="">
  <img class="img" style="top:810px;left:720px;" @click="gotoOne" src="../assets/btn_next.png" alt="">
  <img class="img" style="top:740px;left:1780px;" @click="back()" src="../assets/btn_return.png" alt="返回">
  <img class="img" style="top:880px;left:1780px;" @click="goto('/')" src="../assets/btn_leave.png" alt="退出">
</div>
</template>
<script>
export default {
  mounted(){
    let me = this;
        let interval = window.setInterval(function() {
          if(me.$router.currentRoute.path !== '/printInfo'){
            window.clearInterval(interval);
            return
          }
          if(me.sec <= 20 && me.isNeedSound){
              me.isNeedSound = false;
              setTimeout(function(){
                  window.soundPlayer18();
              },100)
            }
          if ((me.sec--) <= 0) {
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
    gotoOne (){
      this.$router.push({ path: '/printLicense/one'})
    },
    goto (par) {
      this.$router.push({ path: par })
    },
    back () {
      this.$router.back(-1)
    }
  }
}
</script>

<style scope>
.coment{
  width: 100%;
  height: 940px;
  background-image: url('../assets/bg.jpg');
}
.coment .img{
  cursor: pointer;
  position: absolute;
}
.yyzz-note{
  position: absolute;
  left: 155px;
  top: 160px;
  height: 895px;
  width: 1595px;
  background-image: url('../assets/box_bg.png');
  background-repeat: no-repeat;
  /* opacity: 0.9; */
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
 background-image: url(../assets/321.png);
 background-repeat: no-repeat;
 background-size: 135px;
 border-radius: 200px;
 background-position-y: -7px;
 background-position-x: -9px;
}
</style>
