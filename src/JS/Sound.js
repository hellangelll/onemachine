/*--------------------语音播放-----------------------*/
//播放本地wav文件
function sound_play(path) {
    window.external.soundPlayer(path);
}
//停止播放本地wav文件
function sound_play_stop() {
    window.external.soundPlayer_stop();
}
//语音播报字符串
function sound_speak(saystr) {
    window.external.soundSpeak(saystr);
}
//停止语音播报字符串
function sound_speak_stop() {
    window.external.soundSpeak_stop();
}


/*--------------------语音识别-----------------------*/
//初始化语音识别引擎
function lis_Init() {
    var info = window.external.listen_Init();
    if (info == 0) {
        logger('初始化成功');
    } else if (info == '-11') {
        logger('已初始化');
    } else if (info == '-13') {
        logger('初始化失败');
    }
    else {
        logger(info);
    }
}

//关闭语音识别引擎
function lis_Close() {
    var info = window.external.listen_Close();
    if (info == 0) {
        logger('关闭成功');
    } else {
        logger(info);
    }
}

var ls_callback;
//开始语音识别
function lis_Start(time, callback) {
    ls_callback = callback;
    var info = window.external.listen_Start(time, "lis_Start_callback");
    if (info == '-12') {
        logger('正在监听...');
    } else if (info == 0) {
        logger('正在识别...');
    }else {
        logger(info);
    }
}

function lis_Start_callback(receivedData) {
    ls_callback(receivedData);
}

//停止语音识别
function lis_Stop() {
    var info = window.external.listen_Stop();
    if (info != 0) {
        logger(info);
    }
}



