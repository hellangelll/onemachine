<template>
  <div id="print-success">
    <img class="print-status" src="@/assets/print-status/print-success.jpg">
    <img class="print-status-btn" src="@/assets/print-status/print-ok.png" @click="onClickBtn" alt="">
  </div>
</template>

<script>
  export default {
  	props: ['canPrint'],
    methods: {
      onClickBtn (){
        var me = this;
      	if(this.canPrint){
          if(me.$route.query){
                var address = me.$route.query.address;
                var bizId = me.$route.query.bizId;
                var bizScope = me.$route.query.bizScope;
                var bizType = me.$route.query.bizType;
                var copyNo = me.$route.query.copyNo;
                var entityName = me.$route.query.entityName;
                var foundDate = me.$route.query.foundDate;
                var fromDate = me.$route.query.fromDate;
                var legalPerson = me.$route.query.legalPerson;
                var regMoney = me.$route.query.regMoney;
                var toDate = me.$route.query.toDate;
                var uniscId = me.$route.query.uniscId;
                var printerId = me.$route.query.printerId;
            }
        	this.$router.push({ path: '/printLicense/four' ,query:{
                address: address,
                bizId: bizId,
                bizScope: bizScope,
                bizType: bizType,
                copyNo: copyNo,
                entityName: entityName,
                foundDate: foundDate,
                fromDate: fromDate,
                legalPerson: legalPerson,
                regMoney: regMoney,
                toDate: toDate,
                uniscId: uniscId,
                printerId: printerId
            }})
      	} else {
        	this.$router.push({ path: '/printLicense/print-no-license' })
      	}
      }
    }
  }
</script>

<style>
  #print-success .print-status {
    width: 1584px;
    height: 732px;
    margin-top: 6px;
    margin-left: 2px;
    display: block;
  }
  #print-success .print-status-btn {
    margin: auto;
    cursor: pointer;
    display: block;
  }
</style>
