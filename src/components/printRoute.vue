<template>
<div class="coment">
  <div class="swiper-container" :style="{visibility:swiperHide}">
      <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="@/assets/swiper1.jpeg">
          </div>
          <div class="swiper-slide">
            <img src="@/assets/swiper2.jpeg">
          </div>
      </div>
  </div>
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
  beforeDestroy: function(){
          window.external.listen_Stop()
  },
  mounted(){
        let me = this;
        window.clearInterval(me.interval_pp);
        me.interval_pp = window.setInterval(function() {
          if(me.$router.currentRoute.path !== '/'){
            window.clearInterval(me.interval_pp);
          }
          if ((me.sec--) <= 0) {
            window.hideLoding();
            window.clearInterval(me.interval_pp);
            // me.$router.push('/');
            me.swiperHide = 'visible';
            var mySwiper = new Swiper('.swiper-container',{
              loop: true,
              autoplay: 3000,
              initialSlide: 0,
              onClick: function(swiper){
                  me.hideSwiper()
              },
            });
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

        window.getPrintStatus_callback = function(receivedData){
          var data = JSON.parse(receivedData);
          if (data.status == 100) {
              var breakdown = 1;
              switch (data.printerstatus.typecode) {
                  case 100:
                      breakdown = -3;
                      break;
                  case 200:
                      breakdown = -2;
                      break;
                  case 400:
                      breakdown = -1;
                      break;
              }
              var ink = data.toner.toner;
              var paper = data.printsum.printsum;

              var equipmentInfo = window.external.GetPcInfo();
              equipmentInfo = JSON.parse(equipmentInfo);
              var M_TagStr = equipmentInfo.M_Tag;
              var M_Tag;
              try {
                M_Tag =  JSON.parse(M_TagStr.replace(/\'/g,'"'));
                M_Tag.breakdown = breakdown;
                M_Tag.ink = ink;
                M_Tag.paper = paper;
                // M_Tag.
                this.$http.post('/equipments/upload',M_Tag)
              } catch(e){

              }
          }
        }
        if(!window.equipmentID){
            var equipmentInfo = window.external.GetPcInfo();
            equipmentInfo = JSON.parse(equipmentInfo);
            var M_TagStr = equipmentInfo.M_Tag;
              try {

              var M_Tag =  JSON.parse(M_TagStr.replace(/\'/g,'"'));
              window.equipmentID = M_Tag.equipmentId;
              window.external.PrintInfo("getPrintStatus_callback")
             } catch(e){

              }
        }




        // if(!window.equipmentID){
        //   var equipmentInfo = window.external.GetPcInfo();
        //   equipmentInfo = JSON.parse(equipmentInfo);
        //   var M_TagStr = equipmentInfo.M_Tag;
        //   var M_Tag;
        //   try {
        //     M_Tag =  JSON.parse(M_TagStr);
        //     // M_Tag.
        //     this.$http.post('/equipments/upload',M_Tag)

        //   } catch(e){

        //   }
        // }
  },
  data(){
    return {
      sec:120,
      swiperHide: 'hidden',
      interval_pp: '',
      interval_pp1: ''
    }
  },
  methods: {
    printInfo: function (par) {
      this.$router.push({ path: par })
    },
    hideSwiper: function(){
      var me = this;
      this.swiperHide = 'hidden';
      this.sec =120;
      window.clearInterval(me.interval_pp1);
      me.interval_pp1 = window.setInterval(function() {
          if(me.$router.currentRoute.path !== '/'){
            window.clearInterval(me.interval_pp1);
          }
          if ((me.sec--) <= 0) {
            window.hideLoding();
            window.clearInterval(me.interval_pp1);
            // me.$router.push('/');
            me.swiperHide = 'visible';
            var mySwiper = new Swiper('.swiper-container',{
              loop: true,
              autoplay: 3000,
              initialSlide: 0,
              onClick: function(swiper){
                  me.hideSwiper()
              },
            });
          }
        }, 1000);
      setTimeout(function(){
          window.soundPlayer1();
        },1200)
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
.swiper-slide {
  line-height: 300px;
  color: #fff;
  font-size: 36px;
  text-align: center;
  background: #4390EE;
}
.swiper-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
