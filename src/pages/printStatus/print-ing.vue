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
      if(me.canPrint){
        var time = 2000;
        window.soundPlayer13();
      } else {
        var time = 18000;
        window.soundPlayer15();
      }
      setTimeout(function(){
        var interval = window.setInterval(function() {
            var receivedData = window.external.PrintStatus();
            var info = JSON.parse(receivedData);
            // alert(receivedData)
            if (info.status == 100) {
                if(info.typecode != 1){
                  clearInterval(interval);
                  me.printSuccess()
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
