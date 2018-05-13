<template>
  <div id="select-company-wrap">
      <div class="select-company-cover"  v-if="isShow" @click="closeMyself"></div>
      <transition name="drop">
        <div class="select-company-content"  v-if="isShow">
            <div class="select-company-head"></div>
            <div class="select-company-input-wrap">
               <input style="display:none;" class="select-company-input" placeholder="请输入公司名称进行搜索"/>
               <div style="display:none;" class="select-company-input-search-icon"></div> 
               <span style="width:40%;float:left;font-size:24px;line-height:24px;margin-top:10px;color:#f8b435;text-align:center;">名称</span>
               <span style="width:58%;float:right;font-size:24px;line-height:24px;margin-top:10px;color:#f8b435;text-align:center;">法定代表人/经营者</span>
            </div>
            <div class="select-company-list">
                <div v-for="(item,index) in company" :class="['select-company-list-item',isActiveIndex ===index?'active':'']" :data-biz-id="item.bizId" :data-biz-type="item.Type" @click="onClickItem(item,index)">
                  {{item.entityName}}<span style="position:absolute;width:270px;text-align:center;right:100px;top:0">{{item.legalPerson}}</span>  
                </div>
            </div>
            <p class="select-company-info">*以上公司执照可以在本机打印</p>
            <div class="select-company-ok" @click="openDialog"></div>
            <div class="select-company-cancel" @click="closeMyselfpp"></div>
        </div>   
      </transition>
      <div class="select-company-dialog-cover"  v-if="isShowDialog" @click="closeMyselfDialog"></div>
      <div class="select-company-dialog" v-if="isShowDialog">
        <p class="select-company-dialog-head">确认公司信息</p>
        <div class="select-company-dialog-content">确认选择打印<span style="color:#fff9ab">{{company[isActiveIndex].entityName}}</span>的营业执照？</div>
        <div class="select-company-dialog-btn">
           <div class="select-company-dialog-ok" @click="onSelectItem"></div>
           <div class="select-company-dialog-cancel" @click="closeMyselfDialogpp"></div> 
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      company: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        isShowDialog: false,
        isActiveIndex: ''
      }
    },
    methods: {
      closeMyself() {
        // this.$emit('on-do-something')
        // this.$emit('on-close')
      },
      closeMyselfpp() {
        this.$emit('on-do-something')
        this.$emit('on-close')
      },
      onSelectItem() {
        this.$emit('on-do-something')
        this.$emit('on-select',this.company[this.isActiveIndex],this.isActiveIndex)
      },
      showDialog() {
        this.$emit('on-do-something')
        this.isShowDialog = true;
      },
      closeMyselfDialog() {
        // this.$emit('on-do-something')
        // this.isShowDialog = false;
      },
      closeMyselfDialogpp(){
        this.$emit('on-do-something')
        this.isShowDialog = false;
      },
      openDialog() {
        this.$emit('on-do-something')
        if(this.company.length==0){
            return
        }
        if(!this.isActiveIndex){
            this.isActiveIndex = 0;
        }
        this.showDialog()
      },
      onClickItem (item,index) {
        this.$emit('on-do-something')
        this.isActiveIndex = index;
      }
    }
  }
</script>

<style scoped>
   #select-company-wrap {
    position: fixed;
    left: 0;
    top: 0;
    /* transform: scale(0.5) translate(-400px,-300px); */
  }
  .drop-enter-active {
    transition: all .5s ease;
  }
  .drop-leave-active {
    /*transition: all .3s ease;*/
  }
  .drop-enter {
    transform: translateY(-500px);
  }
  .drop-leave-active {
    /*transform: translateY(-500px);*/
  }

  
  .select-company-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .select-company-content {
    width: 1263px;
    height: 866px;
    position: fixed;
    overflow: auto;
    background-image: url('../assets/select-company/select-company-wrap.png');
    background-size: 1263px 866px;
    background-repeat: no-repeat;
    z-index: 10;
    left: 50%;
    margin-left: -632px;
    top: 100px;
    /*transform: scale(0.5) translate(-400px,-300px);*/
  }
  .select-company-head {
    width: 1197px;
    height: 43px;
    background-image: url('../assets/select-company/select-company-head.jpg');
    background-size: 1197px 43px;
    background-repeat: no-repeat;
    margin: 35px auto 0;
  }
  .select-company-input-wrap {
    height: 42px;
    width: 1154px;
    display: block;
    border: 1px solid #0d50b8;
    margin: 22px auto 0;
    position: relative;
  }
  .select-company-input {
    height: 38px;
    width: 1288px;
    margin-top: 2px;
    margin-left: -94px;
    background-color: #063680;
    border: 0;
    color: white;
    outline: none;
    font-size: 24px;
    padding-left: 8px;
    transform: scale(0.85);
    -webkit-transform: scale(0.85);
  }
  .select-company-input::-webkit-input-placeholder {
    color: #337ae4;
    font-size: 20px;
  }
  .select-company-input-search-icon {
    position: absolute;
    width: 40px;
    height: 40px;
    background-image: url('../assets/select-company/select-company-search.png');
    background-size: 40px 40px;
    background-repeat: no-repeat;
    top: 2px;
    right: 2px;
  }
  .select-company-list {
    width: 1154px;
    height: 382px;
    background-color: #0b4aab;
    margin: 10px auto;
    padding: 12px 0;
    overflow-y: scroll;
  }
  .select-company-list-item {
    padding: 8px 80px;
    margin: 0;
    color: #9cc2ff;
    cursor: pointer;
    font-size: 38px;
    transform: scale(0.85);
    -webkit-transform: scale(0.85);
    margin-left: -85px;
    position: relative;
  }
  .select-company-list-item.active {
        background-color: #0763d6;
  }
  .select-company-info {
    color: #fffaae;
    font-size: 24px;
    width: 1100px;
    margin: 16px auto;
    transform: scale(0.85);
    -webkit-transform: scale(0.85);
    margin-left: -1px;
  }
  .select-company-ok {
    background-image: url('../assets/select-company/select-company-ok.png');
    background-size: 297px 63px;
    background-repeat: no-repeat;
    width: 297px;
    height: 63px;
    cursor: pointer;
    margin-top: 48px;
    margin-left: 80px;
    float: left;
  }
  .select-company-cancel {
    background-image: url('../assets/select-company/select-company-cancel.jpg');
    background-size: 297px 63px;
    background-repeat: no-repeat;
    width: 297px;
    height: 63px;
    cursor: pointer;
    margin-top: 48px;
    margin-right: 80px;
    float: right;
  }
  .select-company-dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .select-company-dialog {
    width: 826px;
    height: 430px;
    background-image: url('../assets/select-company/select-company-wrap.png');
    background-size: 826px 430px;
    background-repeat: no-repeat;
    position: fixed;
    z-index: 11;
    left: 50%;
    margin-left: -413px;
    top: 300px;
  }
  .select-company-dialog-head {
    color: #b4d4fd;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 30px;
    font-size: 24px;
  }
  .select-company-dialog-content {
    color: #b4d4fd;
    width: 720px;
    margin: auto;
    height: 200px;
    font-size: 24px;
  }
  .select-company-dialog-btn {
    width: 720px;
    height: 70px;
    margin: auto;
  }
  .select-company-dialog-ok {
    background-image: url('../assets/select-company/select-company-ok.png');
    background-size: 297px 63px;
    background-repeat: no-repeat;
    width: 297px;
    height: 63px;
    float: left;
  }
  .select-company-dialog-cancel {
    background-image: url('../assets/select-company/select-company-cancel.jpg');
    background-size: 297px 63px;
    background-repeat: no-repeat;
    width: 297px;
    height: 63px;
    float: right;
  }
</style>