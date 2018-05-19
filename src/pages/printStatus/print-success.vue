<template>
  <div id="print-success">
    <img class="print-status" src="@/assets/print-status/print-success.jpg">
    <img class="print-status-btn" src="@/assets/print-status/print-ok.png" @click="onClickBtn" alt="">
  </div>
</template>

<script>
  export default {
  	props: ['canPrint'],
    mounted: function(){
        window.soundPlayer14();
    },
    methods: {
      onClickBtn (){
        var me = this;
      	if(this.canPrint){
        	 this.$router.push({ path: '/printLicense/four' ,query:{
                itemStr: me.$route.query.itemStr,
                printerId:  me.$route.query.printerId,
                bizType:  me.$route.query.bizType
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
