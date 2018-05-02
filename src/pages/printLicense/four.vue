<template>
    <div id="printLicense-four">
        <img style="margin-top:6px; margin-left:2px;height:160px;display: inline-block;" src="@/assets/printLicense_nav_3.jpg" alt="">
        <div class="print-license-content-wrap">
            <div class="plcw-left">
                <div id="plcwl-box-preview-four" class="plcwl-box">
                    <img class="img" style="position:relative;top:20px;margin:auto;width:450px;height:666px;display:block" :src="printImg_preview" alt="">
                </div>
            </div>
            <div class="plcw-right">
                <img src="@/assets/yingye.png" style="display: block;margin: 0 auto;" alt="">
                    <p class="plcwr-text" v-if="!reading">请选择你要打印的营业执照副本</p>
                    <p class="plcwr-text" v-else>正在打印营业执照副本1-1</p>
                    <div class="plcwr-content">
                        <span :class="['plcwr-content-item',item.enable?'':'unable',activeLicenseIndex === index ? 'active':'']" v-for="(item,index) in license" :data-value="item.key" @click="clickItem(item,index)">{{item.value}}</span>
                    </div>
                    <img v-if="!reading"  class="plcwr-next" style="cursor: pointer;" @click="onPrint" src="@/assets/print-licence-other.png" alt="">
                    <img v-else class="plcwr-next" src="@/assets/print-licence-other-ing.png" alt="">
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
                printImg_preview: '',
                activeLicenseIndex: '',
                license: [
                    {
                        key: '1',
                        value: '副本1-1',
                        enable: true
                    }
                ]
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
            this.$http.post('/licenses/copy/preview',{
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
                this.$http.post('/licenses/copy/gen',{
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
            window.addEventListener('DOMContentLoaded', function () {
              var galley = document.getElementById('plcwl-box-preview-four');
              window.PP_viewer_four = new Viewer(galley, {
                button: false,
                navbar: false,
                title: false,
                toolbar: false,
              });
            });
            setTimeout(function(){
                window.soundPlayer12();
            },100)
        },
        methods: {
            goto (par) {
              this.$router.push({ path: par })
            },
            clickItem (item,index){
                this.$emit('do-something');
                if(this.reading){
                    return
                }
                if(item.enable === false){
                    return
                }
                this.activeLicenseIndex = index;
            },
            onPrint (){
                this.$emit('do-something');
                var me = this;
                // if(this.activeLicenseIndex){
                this.reading = true
                // setTimeout(function(){
                //     me.goto('/printLicense/print-success')
                // },6000)
                this.print();
                // }
                
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
                    "Imgstr": img3,
                    "ChoiceTray": me.getRadioVal('ChoiceTray'),
                    "ChoicePaper": me.getRadioVal('ChoicePaper')
                };
                var data = JSON.stringify(photo);
                if(this.$route.query){
                    var bizId = this.$route.query && this.$route.query.bizId;
                    var bizType = this.$route.query && this.$route.query.bizType;
                }
                me.printBitmap(data, function (receivedData) {
                    var info = JSON.parse(receivedData);
                   if (info.status == 100 || !info.status) {
                       me.$http.post('/licenses/copy/print',{
                           "bizId": me.$route.query.bizId,
                           "bizType": me.$route.query.bizType,
                           "printerId": me.$route.query.printerId,
                           "printNum": 1,
                           "result": 1
                       }).then(response => {
                           me.goto('/printLicense/print-success');
                       }, response => {
                           if(response.response.data && response.response.data.msg){
                              alert(response.response.data.msg) 
                           } else {
                                window.errorAlertInfo(response.stauts)
                           }
                       })
                   }
                });

            },
            printBitmap(data, callback) {
                window.printBitmap_callback = function(){
                    callback(data)
                };
                window.external.PrintBitmap(data, "printBitmap_callback");
            }
        }
    }
</script>

<style>
    #printLicense-four .print-license-content-wrap {
        height: 730px;
    }
    #printLicense-four .plcw-left {
        float: left;
        height: 100%;
        width: 40%;
    }
    #printLicense-four .plcw-right {
        float: right;
        height: 100%;
        width: 60%;
    }
    #printLicense-four .plcwl-box {
        border: 1px solid #00a4ff;
        border-radius: 5px;
        margin-left: 80px;
        margin-top: -6px;
        background-color: #093c8d;
        width: 530px;
        height: 702px;
    }
    #printLicense-four .plcw-box {
       width: 358px;
       height: 358px;
       border: 1px solid #00a4ff;
       border-radius: 5px;
       margin-left: 228px;
       margin-top: 30px;
       background-color: #093c8d;
    }
    #printLicense-four .plcwr-text {
        text-align:center;
        color:#adcdfc;
        font-size: 28px;
    }
    #printLicense-four .plcwr-next {
        position:relative;
        margin: 0 auto;
        display:block;
    }
    #printLicense-four .plcwr-content {
        display: -webkit-box; 
        display: -moz-box; 
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        justify-content: left;
        -webkit-justify-content: left;
        padding-left: 15px;
    }
    #printLicense-four .plcwr-content-item {
        width: 192px;
        height: 60px;
        color: #adcdff;
        background-color: #08398c;
        display: inline-block;
        text-align: center;
        line-height: 60px;
        border-radius: 8px;
        margin-right: 40px;
        margin-bottom: 42px;
        border: 1px solid #08398c;
        cursor: pointer;
        font-size: 29px;
    }
    #printLicense-four .plcwr-content-item.unable {
        background-color: #10397b;
        color: #3973c6;
        background-image: url(../../assets/yidayin.png);
        background-size: 28px 29px;
        background-repeat: no-repeat;
        border: 1px solid #10397b;
    }
    #printLicense-four .plcwr-content-item.active {
        background-color: #218cff;
        color: #fff;
        border: 1px solid #3abfef;
    }
</style>