<template>
  <div id="print-fail">
    <div class="print-status"></div>
    <img class="print-status-btn" src="@/assets/print-status/print-fail-btn.png" @click="onClickBtn" alt="">
  </div>
</template>

<script>
  export default {
    methods: {
      onClickBtn (){
        
      }
    }
  }
</script>

<style>
  #print-fail .print-status {
    width: 1584px;
    height: 732px;
    background-image: url('../../assets/print-status/print-fail.jpg');
    background-size: 1586px 732px;
    background-repeat: no-repeat;
    margin-top: 6px;
    margin-left: 2px;
  }
  #print-fail .print-status-btn {
    margin: auto;
    cursor: pointer;
    display: block;
  }
</style>
