<template>
  <div id="print-ing">
    <img class="print-status" src="@/assets/print-status/print-ing.jpeg">
  </div>
</template>

<script>
  export default {
  	props: ['canPrint'],
    mounted: function(){
      var me =this;
      var time = 18000;
      if(me.canPrint){
        window.soundPlayer13();
      } else {
        window.soundPlayer15();
      }
      setTimeout(function(){
        var interval = window.setInterval(function() {
            var receivedData = window.external.PrintStatus();
            var info = JSON.parse(receivedData);
            // alert('打印中倒计时的信息:'+time+'_'+'canPrint:'+me.canPrint+'_'+receivedData)
            if (info.status == 100) {
              switch (info.typecode) {
                  case 0:
                      clearInterval(interval);
                      me.printSuccess()
                      break;
                  case 1:
                      //alert("正在打印，请稍后再试");
                      break;
                  case 2:
                      // alert("初始化中，请稍后再试");
                      break;
                  case 4:
                      // alert("打印机正在准备，请稍后再试");
                      break;
                  case 100:
                      window.soundPlayer21()
                      alert("打印机缺纸，请联系工作人员，谢谢！");
                      window.refreshView();
                      break;
                  case 200:
                      window.soundPlayer20()
                      alert("打印机缺墨，请联系工作人员，谢谢！");
                      window.refreshView();
                      break;
                  case 400:
                      window.soundPlayer22()
                      alert("打印机卡纸，请联系工作人员，谢谢！");
                      window.refreshView();
                      break;
                  case 800:
                      alert("打印机仓门被打开，请联系工作人员，谢谢！"); 
                      window.refreshView();
                  default:
                      alert(info.typeinfo);
                        
              }
            }
        },time)
      },3000)
      
    },
    methods: {
      printSuccess(){
          var me = this;
          var itemOb = JSON.parse(me.$route.query.itemStr);
          me.$http.post('/licenses/printLog',{
              "bizId": itemOb.bizId,
              "bizType": me.$route.query.bizType,
              "equipmentId": window.equipmentID,
              "licenseType": me.canPrint ? 1 : 2,
              "printNum": 1,
              "printerId": me.$route.query.printerId,
              "result": 1
          }).then(response => {
              if(me.canPrint){
                me.$router.push({ path:'/printLicense/print-success/true',query:{
                    itemStr: me.$route.query.itemStr,
                    printerId:  me.$route.query.printerId,
                    bizType: me.$route.query.bizType
                }});
              } else {
                me.$router.push({ path:'/printLicense/print-end'})
              }
              
          }, response => {
              me.reading = false
              if(response.response.data && response.response.data.msg){
                 alert(response.response.data.msg) 
              }  else {
                  window.errorAlertInfo(response.response.stauts)
             }
          })
      }
    }
  }
</script>

<style>
  #print-ing .print-status {
    width: 1584px;
    height: 732px;
    margin-top: 6px;
    margin-left: 2px;
    display: block;
  }
  #print-ing .print-status-btn {
    margin: auto;
    cursor: pointer;
    display: block;
  }
</style>
