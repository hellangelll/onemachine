<template>
<div class="coment">
  <div class="gg">
    <ul style="list-style-type:none;">
      <li>营业执照当日(正本)打印: 188 份</li>
      <li>营业执照当日(副本)打印: 188 份</li>
      <li>营业执照累计(副本)打印:3568份</li>
      <li>营业执照累计(正本)打印:3889份</li>
    </ul>
  </div>
  <div class="yyzz-btn" @click="printInfo('printInfo')"></div>
  <div class="yyzz-btn-font">
    <div @click="printInfo('printInfo')" style="cursor: pointer;">营业执照打印</div>
  </div>
  <div class="zmq-btn"  @click="printInfo('recognition')"></div>
  <div class="zmq-btn-font">
    <div @click="printInfo('recognition')" style="cursor: pointer;">自贸区识别</div>
  </div>
  <div class="count-down">{{sec}}</div>
</div>
</template>

<script>
export default {
  mounted(){
    let me = this;
        let interval = window.setInterval(function() {
          if(me.$router.currentRoute.path !== '/'){
            window.clearInterval(interval);
          }
          if ((me.sec--) <= 0) {
            window.hideLoding();
            window.clearInterval(interval);
            me.$router.push('/');
          }
        }, 1000);
        setTimeout(function(){
          window.soundPlayer1();
        },1200)
         this.$http.get('common/errors').then(data => {
            if(data.status == 200){
                window.__common_errors = data.data;
            }
        })

        // me.$http.get('common/errors')
  },
  data(){
    return {
      sec:120
    }
  },
  methods: {
    printInfo: function (par) {
      debugger
      this.$router.push({ path: par })
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
.yyzz-btn{
  cursor: pointer;
  position: relative;
  left: 640px;
  top: 610px;
  height: 210px;
  width: 222px;
  background-image: url('../assets/yyzz.png');
}
.yyzz-btn-font{
  position: relative;
  left: 640px;
  top: 400px;
  font-size: 36px;
  color:white;
  margin-top: 210px;
}
.zmq-btn{
  cursor: pointer;
  position: relative;
  left: 1190px;
  top: 150px;
  height: 210px;
  width: 222px;
  background-image: url('../assets/zmq.png');
}
.zmq-btn-font{
  position: relative;
  left: 1210px;
  top: -70px;
  font-size: 36px;
  color:white;
  margin-top: 210px;
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
.gg{
  position: absolute;
  top: 160px;
  left: 1360px;
  width: 510px;
  height: 210px;
  background-image: url('../assets/ggbj.png');
  background-size: 510px 210px;
  font-size: 26px;
  color: white;
}
.gg li{
  line-height: 40px;
}
</style>
