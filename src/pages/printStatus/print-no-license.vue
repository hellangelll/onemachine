<template>
  <div id="print-no-license">
    <div class="print-status"></div>
    <img class="print-status-btn" src="@/assets/print-status/print-back.png" @click="onClickBtn" alt="">
  </div>
</template>

<script>
  export default {
    methods: {
      onClickBtn (){
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style>
  #print-no-license .print-status {
    width: 1584px;
    height: 732px;
    background-image: url('../../assets/print-status/print-no-license.jpg');
    background-size: 1586px 732px;
    background-repeat: no-repeat;
    margin-top: 6px;
    margin-left: 2px;
  }
  #print-no-license .print-status-btn {
    margin: auto;
    cursor: pointer;
    display: block;
  }
</style>
