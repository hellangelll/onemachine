<template>
    <div id="printLicense-one">
        <img style="margin-top:6px; margin-left:2px;height:160px;display: inline-block;" src="@/assets/printLicense_nav_1.jpg" alt="">
        <div class="print-license-content-wrap">
            <div class="plcw-left">
                <img class="img" style="position:relative;top:40px;left:80px;" src="@/assets/id_card_bg.png" alt="">
            </div>
            <div class="plcw-right">
                <div v-if="!reading" class="plcw-box">
                    <p class="plcw-box-title">身份证读取中</p>
                    <img class="plcw-box-img" src="@/assets/sfz.png">
                </div>
                <div v-else class="plcw-box-success">
                    <p class="plcwbs-staus">扫描成功！{{text}}</p>
                    <img style="width:264px;height:264px;margin: 0 auto 35px;display:block;border-radius: 5px;" :src="'data:image/jpeg;base64,'+user.img">
                    <div class="plcwbs-txt">
                        <span class="plcwbs-txt-name">姓名：</span>
                        <span class="plcwbs-txt-value">{{user.name}}</span>
                    </div>
                    <div class="plcwbs-txt">
                        <span class="plcwbs-txt-name">身份证号码：</span>
                        <span class="plcwbs-txt-value">{{user.idCard}}</span>
                    </div>
                    <img class="img" style="position:relative;top:30px;left:40px;" @click="goto('/printLicense/two')" src="@/assets/btn_next.png" alt="">
                </div>
            </div>
        </div>
    </div>
 
</template>

<script>
    export default {
        data() {
            return {
                interval_key: '',
                reading: false,
                user: {
                    name: '',
                    idCard: '',
                    img: ''
                },
                text:''
            }
        },
        beforeDestroy: function(){
            clearInterval(this.interval_key);
        },
        mounted: function(){
            var me = this;
            window.localStorage['one-user'] = '';
            var interval_num = 0;
            clearInterval(me.interval_key);
            me.interval_key = setInterval(function(){
                if(interval_num>=12){
                    clearInterval(me.interval_key);
                    return;
                }
                interval_num = interval_num +1;
                // 识别身份证
                me.idReaderReadInfo(
                    "nothing",
                    function (receivedData) {
                        if(interval_num == 1){
                            setTimeout(function(){
                              window.soundPlayer3();
                            },300)
                        }
                        var idInfo = JSON.parse(receivedData);
                        if (idInfo.status == 100) {
                            me.user.img = idInfo.idImg;
                            me.user.name = idInfo.name;
                            me.user.idCard = idInfo.idCardNo;
                            me.reading = true;
                            clearInterval(me.interval_key);
                            window.localStorage['one-user'] = JSON.stringify(me.user);
                            setTimeout(function(){
                              window.soundPlayer4();
                            },300)
                        } else  {
                            if(interval_num%4 == 0){
                                setTimeout(function(){
                                  window.soundPlayer5();
                                },300)
                            }
                        }
                });
            },4000)

            // me.user.img = '';
            // me.user.name = '';
            // me.user.idCard = '';
            // me.reading = true;
            // window.localStorage['one-user'] = JSON.stringify(me.user);
            // setTimeout(function(){
            //   window.soundPlayer4();
            // },300)

            // setTimeout(function(){
            //   window.soundPlayer2();
            // },1200)

        },
        methods: {
            goto (par) {
              this.$router.push({ path: par })
            },
            idReaderReadInfo (data, callback) {
                window.IDCard_getback =  function(json) {
                    callback(json)
                }
                try {
                    window.external.Read_IDCard(data, "IDCard_getback");
                }
                catch (err) {
                    window.external.Read_IDCard("IDCard_getback");
                }
            }
        }
    }
</script>

<style scope>
    #printLicense-one .print-license-content-wrap {
        height: 730px;
    }
    #printLicense-one .plcw-left {
        float: left;
        height: 100%;
        width: 50%;
    }
    #printLicense-one .plcw-right {
        float: right;
        height: 100%;
        width: 50%;
    }
    #printLicense-one .plcw-box {
       width: 358px;
       height: 358px;
       border: 1px solid #00a4ff;
       border-radius: 5px;
       margin-left: 228px;
       margin-top: 30px;
       background-color: #093c8d;
    }
    #printLicense-one .plcw-box-success {
        width: 470px;
        margin-left: 172px;
       margin-top: 30px;
    }
    #printLicense-one .plcw-box-title {
        font-size: 30px;
        color: #f4f80d;
        text-align: center;
    }
    #printLicense-one .plcwbs-staus {
        color: #f4f80d;
        text-align: center;
        font-size: 30px;
    }
    #printLicense-one .plcw-box-img {
        margin: 0 auto;
        display: block;
        margin-top: 45px;
    }
    #printLicense-one .plcwbs-txt {
        font-size: 24px;
        color: #a3bfe4;
        width: 100%;
        text-align: left;
        margin-left: 40px;
        margin-bottom: 14px;
    }
    #printLicense-one .plcwbs-txt:after {
        content: '';
        display: block;
        clear: both;
    }
    #printLicense-one .plcwbs-txt-name {
        width: 146px;
        display: inline-block;
        float: left;
    }
    #printLicense-one .plcwbs-txt-value {
        width: 320px;
        display: inline-block;
        float: left;
    }

</style>