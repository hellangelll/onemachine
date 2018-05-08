<template>
    <div id="printLicense-three">
        <img style="margin-top:6px; margin-left:2px;height:160px;display: inline-block;" src="@/assets/printLicense_nav_3.jpg" alt="">
        <div class="print-license-content-wrap">
            <div class="plcw-left">
                <div id="plcwl-box-preview-three" class="plcwl-box">
                    <img class="img" style="position:absolute;z-index:6;top:0px;margin:auto;width:544px;height:770px;display:block" src="@/assets/print-preview-background.jpeg" alt="">
                    <img class="img" style="position:absolute;z-index:8;top:0px;margin:auto;width:544px;height:770px;display:block" :src="printImg" alt="">
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
            if(this.$route.query && this.$route.query.itemStr){
                var itemOb = JSON.parse(this.$route.query.itemStr);
            }
            var itemUrl;
            // 区分一下企业和个人营业执照
            if(itemOb.address){
                var itemUrl_preview = '/licenses/national/original/preview';
                var itemUrl = '/licenses/national/original/gen';
            } else {
                var itemUrl_preview = '/licenses/individual/original/preview'
                var itemUrl = '/licenses/individual/original/gen'
            }

            // this.$http.post(itemUrl_preview,itemOb).then(response => {
            //       this.printImg_preview = response.data;
            // }, response => {
            //     if(response.response.data && response.response.data.msg){
            //        alert(response.response.data.msg) 
            //     } else {
            //         window.errorAlertInfo(response.stauts)
            //    }
            // })
            this.$http.post(itemUrl,itemOb).then(response => {
                  this.printImg = response.data;
            }, response => {
                if(response.response.data && response.response.data.msg){
                   alert(response.response.data.msg) 
                }  else {
                    window.errorAlertInfo(response.stauts)
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
                    window.external.PrintWakeup();
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
                if(!this.printImg){
                    this.reading = false;
                    alert('暂未获取到需要打印的图片')
                    return
                }
                this.reading = true; 
                var img3 = this.printImg.split(',')[1];
                var photo = {
                    "Num": 1,
                    "ChoiceTray": me.getRadioVal('ChoiceTray'),
                    "ChoicePaper": me.getRadioVal('ChoicePaper'),
                    "Imgstr": img3
                };
                var data = JSON.stringify(photo);
                me.printBitmap(data, function (receivedData) {
                    var info = JSON.parse(receivedData);
                    if (info.status == 100) {
                        var itemOb = JSON.parse(me.$route.query.itemStr);
                        me.$http.post('/licenses/original/print',{
                            "bizId": itemOb.bizId,
                            "bizType": me.$route.query.bizType,
                            "entityId": me.$route.query.entityId,
                            "equipmentId": window.equipmentID,
                            "printNum": 1,
                            "printerId": me.$route.query.printerId,
                            "result": 1
                        }).then(response => {
                            me.$router.push({ path:'/printLicense/print-success/true',query:{
                                itemStr: me.$route.query.itemStr,
                                printerId:  me.$route.query.printerId,
                                bizType: me.$route.query.bizType
                            }});
                        }, response => {
                            if(response.response.data && response.response.data.msg){
                               alert(response.response.data.msg) 
                            }  else {
                                window.errorAlertInfo(response.stauts)
                           }
                        })
                    } else {
                        alert(info.msg)
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
        margin-top: -16px;
        background-color: #093c8d;
        width: 544px;
        height: 770px;
        position: relative;
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