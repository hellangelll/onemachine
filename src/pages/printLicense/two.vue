<template>
    <div id="printLicense-two">
        <img style="margin-top:6px; margin-left:2px;height:160px;display: inline-block;" src="@/assets/printLicense_nav_2.jpg" alt="">
        <div class="print-license-content-wrap">
            <div class="plcw-left">
                <div class="plcwl-box">
                    <p class="plcwbs-staus">当前人员信息</p>
                    <img style="width:218px;height:218px;margin: 0 auto 35px;display:block;border-radius: 5px;" :src="'data:image/jpeg;base64,'+user.img">
                    <div class="plcwbs-txt">
                        <span class="plcwbs-txt-name">姓名：</span>
                        <span class="plcwbs-txt-value">{{user.name}}</span>
                    </div>
                    <div class="plcwbs-txt">
                        <span class="plcwbs-txt-name">身份证号码：</span>
                        <span class="plcwbs-txt-value">{{user.idCard}}</span>
                    </div>
                </div>
            </div>
            <div class="plcw-right">
                <div v-if="!reading" class="plcw-wrap">
                    <p style="position:absolute;top:-80px;font-size:30px;color:red;text-align: center;width:100%;">{{showFaceInfo}}</p>
                    <p class="plcw-box-title">请对准摄像头进行动态视频拍摄  </p>
                    <div class="plcw-box-pic">
                        <p class="plcw-box-pic-staus" style="visibility: hidden;">认证失败！</p>
                        <img class="plcw-box-img" src="@/assets/head.png">
                    </div>
                    <p v-if="failed" class="plcw-box-content-fail" style="margin-top:14px;margin-bottom:4px;position: absolute;padding-left: 5px;">抱歉，没有认出你来，请确保是身份证本人操作</p>
                    <p class="plcw-box-content" style="margin-top: 55px;">建议：①尽可能使人头位于人像虚线线框内</p>
                    <p class="plcw-box-content" style="padding-left: 70px;">②多次验证失败，请到工商注册登记窗口进行营业执照打印</p>
                    <img v-if="failed" class="img" style="margin: 0 auto;display: block;position:relative;margin-top: 30px;" @click="changeRetry" src="@/assets/retry.jpg" alt="">
                </div>
                <div v-else class="plcw-box-success">
                    <p>恭喜你，验证成功</p>
                    <img style="width:356px;height:356px;margin: 0 auto 35px;display:block;border-radius: 5px;" :src="'data:image/jpeg;base64,'+camearImg">
                    <img class="img" style="margin: 0 auto;display: block;position:relative;margin-top: 90px;" @click="changeisShowBefore" src="@/assets/btn_next.png" alt="">
                </div>
            </div>
        </div>
        <SelectCompany :company="company" :isShow="isShow" @on-close="isShow = false" @on-select="onSelectCompany" @on-do-something="doSomething"></SelectCompany>
    </div>
   
</template>

<script>
    import SelectCompany from '@/components/select-company.vue'

    export default {
        components: {
            SelectCompany
        },
        data() {
            return {
                // interval_key: '',
                isShow: false,
                reading: false,
                // reading: true,
                failed: false,
                user: {
                    name: '',
                    idCard: '',
                    img: ''
                },
                camearImg: '',
                company: [],
                individualLicenseInfosLenght: 0,
                printerId: '',
                showFaceInfo: '',
                isChangeReading: false,
                repeatNum: 0,
                individualLicenseInfos: [],
                nationalLicenseInfos: [],
                tt1: '',
                tt2: '',
                tt3: '',
                tt4: '',
                tt5: ''

            }
        },
        created: function(){
            var oneUser = JSON.parse(window.localStorage['one-user']);
            this.user.name = oneUser.name;
            this.user.idCard = oneUser.idCard;
            this.user.img = oneUser.img;
        },
        mounted: function(){
            this.repeatNum = 0;
            this.camear2();
        },
        beforeDestroy: function(){
            // clearInterval(this.interval_key);
            window.external.Close_Camera("closeCamera_callback");
            window.external.listen_Stop()
        },
        methods: {
            goto (par) {
              this.$router.push({ path: par })
            },
            // item 为选择的 公司
            onSelectCompany(item,index) {
                this.$emit('do-something');
                var itemStr = JSON.stringify(item);
                if(index < this.individualLicenseInfosLenght){
                    var bizType = 1;
                } else {
                    var bizType = 2;
                }
                this.$router.push({ path: '/printLicense/three',query:{
                    itemStr:itemStr,
                    printerId: this.printerId,
                    bizType: bizType
                }})
            },
            changeReading (){
                this.$emit('do-something');
                this.reading = true
            },
            changeRetry (){
                this.$emit('do-something');
                this.failed = false;
                this.repeatCheckFace()
            },
            changeisShowBefore (){


                var receivedData = window.external.PrintStatus();
                var info = JSON.parse(receivedData);
                if (info.status == 100) {
                    //正常状态
                    switch (info.typecode) {
                        case 0:
                            this.changeisShow()
                            break;
                        case 1:
                            alert("正在打印，请稍后再试");
                            break;
                        case 2:
                            alert("初始化中，请稍后再试");
                            break;
                        case 4:
                            window.external.PrintWakeup();
                            this.changeisShow()
                            // alert("打印机正在准备，请稍后再试");
                            break;
                        case 100:
                            // window.soundPlayer21()
                            alert("打印机缺纸，请联系工作人员，谢谢！");
                            break;
                        case 200:
                            // window.soundPlayer20()
                            alert("打印机缺墨，请联系工作人员，谢谢！");
                            break;
                        case 400:
                            // window.soundPlayer22()
                            alert("打印机卡纸，请联系工作人员，谢谢！");
                            break;
                        case 800:
                            alert("打印机仓门被打开，请联系工作人员，谢谢！"); 
                        default:
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
            changeisShow (){
                var me = this;
                this.$emit('do-something'); 
                if(this.isChangeReading){
                    return
                }
                this.isChangeReading = true;
                // window.openLoding();
                window.external.soundPlayer_stop();
                window.external.Close_Camera("closeCamera_callback");

                if(me.nationalLicenseInfos.length + me.individualLicenseInfos.length == 0){
                    me.$router.push({ path:'/printLicense/print-no-company'});
                    return
                }
                var licenseInfoList = me.individualLicenseInfos.concat(me.nationalLicenseInfos);
                me.company = licenseInfoList;
                me.isShow=true;
                setTimeout(function(){
                    window.soundPlayer12();
                    me.isChangeReading = false;
                    // window.hideLoding()
                },100)
            },
            doSomething (){
                this.$emit('do-something');
            },
            camear2() {
                var me = this;
                // var layout={'openType':1,'layoutX': 298.5,'layoutY': 588,'layoutWidth': 165,'layoutHeight': 179,'choiceCamera':0,'addGrid':1};
                var layout={'openType':1,'layoutX': 1219,'layoutY': 391,'layoutWidth': 265,'layoutHeight': 379,'choiceCamera':0,'addGrid':1,"bgStyle":1};

                var jsonlayout=JSON.stringify(layout);
                window.external.Show_Camera();

                me.openCamera(jsonlayout, function (receivedData) {
                    var idInfo = JSON.parse(receivedData);
                    if(idInfo.status == 100){
                        window.external.Show_Camera();
                        me.repeatCheckFace();
                    } else {
                        alert('打开摄像头失败!'+idInfo.msg)
                    }
                })
            },
            repeatCheckFace(){
                var me=this;

                window.soundPlayer6();
                setTimeout(function(){
                    me.showFaceInfo = '3'
                },5000)
                setTimeout(function(){
                    me.showFaceInfo = '2'
                    me.doTakePhotos()
                },6000)
                me.tt1 = setTimeout(function(){
                    me.showFaceInfo = '1'
                },7000)
                me.tt2 = setTimeout(function(){
                    me.showFaceInfo = '0'
                },8000)
                me.tt3 = setTimeout(function(){
                    me.showFaceInfo = ''
                },9000)
            },
            openCamera(data, callback) {
                window.openCamera_callback =  function(json) {
                    callback(json)
                }
                window.external.Open_Camera(data, "openCamera_callback");
            },
            doTakePhotos() {
                var me = this;
                me.takePhoto(function (receivedData) {
                    var photoBean = JSON.parse(receivedData);
                    if (photoBean.status == 100) {
                        me.camearImg = photoBean.imgStr;
                        me.doFaceRecognition()
                    }else{
                        alert('照片抓取失败,'+photoBean.msg);
                    }
                })
            },
            takePhoto(callback) {
                window.takePhoto_callback =  function(json) {
                    callback(json)
                }
                window.external.TakePhoto_Camera("takePhoto_callback");
            },
            doFaceRecognition() {
                var me = this;
                me.$http.post('/licenses/query',
                {
                    "cardNo": me.user.idCard,
                    "equipmentId":  window.equipmentID,
                    "name": me.user.name,      
                    "image": "data:image/jpeg;base64,"+me.user.img,
                    "photo":"data:image/jpeg;base64,"+me.camearImg,

                    // "cardNo": 500200199306308860,
                    // "equipmentId": "TESTBBBBBBB1",
                    // "name": "黄家驹",
                    // "image": "data:image/jpeg;base64,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",
                    
                    // "photo": "data:image/jpeg;base64,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"
                }
                ).then(response => {
                    window.clearTimeout(me.tt1)
                    window.clearTimeout(me.tt2)
                    window.clearTimeout(me.tt3)
                    window.clearTimeout(me.tt4)
                    window.clearTimeout(me.tt5)
                    window.external.soundPlayer_stop();
                    me.$emit('do-something');
                    me.showFaceInfo = '';

                    me.printerId = response.data.printerId;
                    // me.company = response.data.licenseInfoList;
                    // 这里改成 个体和企业两种营业执照
                    if(response.data.individualLicenseInfos){
                        me.individualLicenseInfos = response.data.individualLicenseInfos;
                    } else {
                        me.individualLicenseInfos = [];
                    }
                    me.individualLicenseInfosLenght = me.individualLicenseInfos.length;
                    if(response.data.nationalLicenseInfos){
                        me.nationalLicenseInfos = response.data.nationalLicenseInfos;
                    } else {
                        me.nationalLicenseInfos = [];
                    }
                    
                    setTimeout(function(){
                        me.reading = true;
                        window.external.Close_Camera("closeCamera_callback");
                        me.showFaceInfo = '';
                        window.soundPlayer11();
                    },0)
                    
                }, response => {
                    window.clearTimeout(me.tt1)
                    window.clearTimeout(me.tt2)
                    window.clearTimeout(me.tt3)
                    window.clearTimeout(me.tt4)
                    window.clearTimeout(me.tt5)
                    window.external.soundPlayer_stop();
                    me.$emit('do-something');
                    me.showFaceInfo = '';
                    // window.hideLoding()
                    if(response.response.data && response.response.data.msg){
                       alert(response.response.data.msg) 
                    }else {
                        window.errorAlertInfo(response.response.stauts)
                    }
                    if(me.repeatNum>=2){
                        window.soundPlayer10();
                        setTimeout(function(){
                            me.$router.push('/')
                        },2000)
                        return
                    }
                    setTimeout(function(){
                        me.failed =true;
                        me.repeatNum = me.repeatNum + 1;
                        window.soundPlayer10();
                    },0)
                }) 
                // 播放左转，右转
                me.tt4 = setTimeout(function(){
                    window.soundPlayer8();
                },500)
                me.tt5 = setTimeout(function(){
                    window.soundPlayer7();
                },4500)
            },
            Face_recognition(data, callback) {
                window.Face_recognition_callback =  function(json) {
                    callback(json)
                }
                window.external.Face_Math(data, "Face_recognition_callback");
            }
        }
    }
</script>

<style>
    #printLicense-two .print-license-content-wrap {
        height: 730px;
    }
    #printLicense-two .plcw-left {
        float: left;
        height: 100%;
        width: 50%;
    }
    #printLicense-two .plcw-right {
        float: right;
        height: 100%;
        width: 50%;
    }
    #printLicense-two .plcwbs-staus {
        color: #99bef5;
        text-align: center;
        font-size: 24px;
    }
    #printLicense-two .plcw-wrap {
        width: 640px;
        margin-left: 80px;
        position: relative;
    }
    #printLicense-two .plcwl-box {
        width: 470px;
        height: 554px;
        margin-left: 172px;
        margin-top: 30px;
        border: 1px solid #00a4ff;
        border-radius: 5px;
       background-color: #093c8d;

    }
    #printLicense-two .plcw-box-pic {
       width: 265px;
       height: 379px;
       border: 1px solid #00a4ff;
       border-radius: 5px;
       margin-left: 253px;
       background-color: #093c8d;
       margin: auto;
       margin-top: 18px;
    }
    #printLicense-two .plcw-box-pic-staus {
        font-size: 34px;
        color: #fdf800;
        text-align: center;
        margin: 5px 0 0;
    }
    #printLicense-two .plcw-box-title {
        font-size: 24px;
        color: #9dbdec;
        text-align: center;
        margin: 14px 0;
    }
    #printLicense-two .plcw-box-img {
        margin: 0 auto;
        display: block;
    }
    #printLicense-two .plcwbs-txt {
        font-size: 24px;
        color: #a3bfe4;
        width: 100%;
        text-align: left;
        margin-left: 40px;
        margin-bottom: 14px;
    }
    #printLicense-two .plcwbs-txt:after {
        content: '';
        display: block;
        clear: both;
    }
    #printLicense-two .plcwbs-txt-name {
        width: 146px;
        display: inline-block;
        float: left;
    }
    #printLicense-two .plcwbs-txt-value {
        width: 320px;
        display: inline-block;
        float: left;
    }
    #printLicense-two .plcw-box-content,#printLicense-two .plcw-box-content-fail {
        margin: 0;
        color: #9dbdec;
        text-align: left;
        font-size: 24px;
        margin-left: 74px;
        transform: scale(0.85);
        -webkit-transform: scale(0.85);
    }
    #printLicense-two .plcw-box-success p{
        text-align: center;
        color: #a3bfe4;
        font-size: 30px;
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>