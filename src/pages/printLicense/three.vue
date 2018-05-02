<template>
    <div id="printLicense-three">
        <img style="margin-top:6px; margin-left:2px;height:160px;display: inline-block;" src="@/assets/printLicense_nav_3.jpg" alt="">
        <div class="print-license-content-wrap">
            <div class="plcw-left">
                <div id="plcwl-box-preview-three" class="plcwl-box">
                    <img class="img" style="position:relative;top:20px;margin:auto;width:675px;height:999px;display:block" :src="printImg_preview" alt="">
                </div>
            </div>
            <div class="plcw-right">
                <img src="@/assets/yingye.png" style="display: block;margin: 70px auto 0;" alt="">
                <div v-if="!reading">
                    <p class="plcwr-text">打印营业执照正本</p>
                    <div>
                        <img class="plcwr-next" style="cursor: pointer;" @click="onPrint" src="@/assets/print-licence-main.png" alt="">
                    </div>
                </div>
                <div v-else>
                    <p class="plcwr-text">正在打印营业执照正本</p>
                    <div>
                        <img class="plcwr-next" src="@/assets/print-licence-main-ing.png" alt="">
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                reading: false,
                printImg: '',
                printImg_preview: ''
            }
        },
        mounted: function(){
            if(this.$route.query){
                var address = this.$route.query && this.$route.query.address;
                var bizId = this.$route.query && this.$route.query.bizId;
                var bizScope = this.$route.query && this.$route.query.bizScope;
                var bizType = this.$route.query && this.$route.query.bizType;
                var copyNo = this.$route.query && this.$route.query.copyNo;
                var entityName = this.$route.query && this.$route.query.entityName;
                var foundDate = this.$route.query && this.$route.query.foundDate;
                var fromDate = this.$route.query && this.$route.query.fromDate;
                var legalPerson = this.$route.query && this.$route.query.legalPerson;
                var regMoney = this.$route.query && this.$route.query.regMoney;
                var toDate = this.$route.query && this.$route.query.toDate;
                var uniscId = this.$route.query && this.$route.query.uniscId;
            }

            this.$http.post('/licenses/original/preview',{
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
                  uniscId: uniscId
            }).then(response => {
                  this.printImg_preview = response.data;
            }, response => {
                if(response.response.data && response.response.data.msg){
                   alert(response.response.data.msg) 
                } else {
                    window.errorAlertInfo(response.stauts)
               }
            })
                this.$http.post('/licenses/original/gen',{
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
                      uniscId: uniscId
                }).then(response => {
                      this.printImg = response.data;
                }, response => {
                    if(response.response.data && response.response.data.msg){
                       alert(response.response.data.msg) 
                    } 
                })
            
            // window.addEventListener('DOMContentLoaded', function () {
            //   var galley = document.getElementById('plcwl-box-preview-three');
            //   window.PP_viewer_three = new Viewer(galley, {
            //     button: false,
            //     navbar: false,
            //     title: false,
            //     toolbar: false,
            //   });
            // });
            setTimeout(function(){
                window.soundPlayer12();
            },100)
        },
        methods: {
            goto (par) {
              this.$router.push({ path: par })
            },
            onPrint (){
                this.$emit('do-something');
                var me = this;
                this.reading = true;
                this.print();
            },
            print() {
                var receivedData = window.external.PrintStatus();
                var info = JSON.parse(receivedData);
                if (info.status == 100) {
                    if (info.typecode < 256) {
                        //正常状态
                        switch (info.typecode) {
                            case 0:
                                // alert("就绪");
                                this.print_picture()
                                break;
                            case 1:
                                alert("正在打印，请稍后再试");
                                break;
                            case 2:
                                alert("初始化中，请稍后再试");
                                break;
                            case 4:
                                alert("睡眠，请稍后再试");
                                break;
                        }
                    }
                    else {
                        //异常状态
                        alert(info.typeinfo);
                    }
                }
                else if (info.status == 300) {
                    alert("模块未开启，请稍后再试");
                }
                else {
                    alert("失败：" + info.msg);
                }
            },
            getRadioVal(name) {
                var result;
                var radio = document.getElementsByName(name);
                for (var i = 0; i < radio.length; i++) {
                    if (radio[i].checked) {
                        result = radio[i].value;
                    }
                }
                return result;
            },
            print_picture() {
                var me = this;
                //打印图片
                var img3 = this.printImg.split(',')[1];

                var photo = {
                    "Num": 1,
                    "ChoiceTray": me.getRadioVal('ChoiceTray'),
                    "ChoicePaper": 1,
                    "Imgstr": img3
                };
                var data = JSON.stringify(photo);
                if(this.$route.query){
                    var bizId = this.$route.query && this.$route.query.bizId;
                    var bizType = this.$route.query && this.$route.query.bizType;
                }
                me.printBitmap(data, function (receivedData) {
                    var info = JSON.parse(receivedData);
                    if (info.status == 100) {
                        me.$http.post('/licenses/original/print',{
                            "bizId": me.$route.query.bizId,
                            "bizType": me.$route.query.bizType,
                            "printerId": me.$route.query.printerId,
                            "result": 1
                        }).then(response => {
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
                            me.$router.push({ path:'/printLicense/print-success/true',query:{
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
                            }});
                        }, response => {
                            if(response.response.data && response.response.data.msg){
                               alert(response.response.data.msg) 
                            } 
                        })
                    }
                    
                });
            },
            printBitmap(data, callback) {
                window.printBitmap_callback = function(data){
                    callback(data)
                };
                window.external.PrintBitmap(data, "printBitmap_callback");
            }
        }
    }
</script>

<style>
    #printLicense-three .print-license-content-wrap {
        height: 730px;
    }
    #printLicense-three .plcw-left {
        float: left;
        height: 100%;
        width: 50%;
    }
    #printLicense-three .plcw-right {
        float: right;
        height: 100%;
        width: 50%;
    }
    #printLicense-three .plcwl-box {
        border: 1px solid #00a4ff;
        border-radius: 5px;
        margin-left: 80px;
        margin-top: -6px;
        background-color: #093c8d;
        width: 530px;
        height: 702px;
    }
    #printLicense-three .plcw-box {
       width: 358px;
       height: 358px;
       border: 1px solid #00a4ff;
       border-radius: 5px;
       margin-left: 228px;
       margin-top: 30px;
       background-color: #093c8d;
    }
    #printLicense-three .plcwr-text {
        text-align:center;
        color:#adcdfc;
        font-size: 28px;
    }
    #printLicense-three .plcwr-next {
        position:relative;
        margin:200px auto 0;
        display:block;
    }
</style>