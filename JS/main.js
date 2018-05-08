window.logger =  function(msg) {
    document.getElementById("logger").innerHTML =  msg;
}

window.send_command =  function(func_name, data, callback) {
    window[func_name](data, callback);
}

//保存数据到窗体
window.save_info =  function(info) {
    window.external.save_str(info);
}
//读取保存的数据
window.read_info =  function() {
    m_info = window.external.open_str();
    return m_info;
}
//清除保存的数据
window.clear_info =  function() {
    window.external.clear_str();
}

//关闭RAIO
window.RAIO_close =  function() {
    window.external.exit();
}

var hwcallback;
    //开始手写输入
window.handwrite =  function(data, callback) {
    hwcallback = callback;
    window.external.StartWrite(data, "handwrite_callback");
}

//开始手写输入回调
window.handwrite_callback =  function(receivedData) {
    hwcallback(receivedData);
}

//停止手写输入
window.handwriteStop =  function() {
    window.external.closewritekb();
}

//手写输入接口
window.openhandwrite =  function(eleID) {

    if (typeof eleID == "string") {
        var data = document.getElementById(eleID).value;
    } else {
        return;
    }
    if (data == '') {
        data = '';
    }
    send_command(
        "handwrite",
        data,
        window.(receivedData) {
            if (receivedData == undefined) {
                receivedData = '';
            }
            document.getElementById(eleID).value = receivedData;
        }
    );
}

var imecallback;
    //开始手写输入
window.imewrite =  function(data, callback) {
    imecallback = callback;
    window.external.StartIME(data, "imewrite_callback");
}

//开始手写输入回调
window.imewrite_callback =  function(receivedData) {
    imecallback(receivedData);
}

//停止输入
window.imewriteStop =  function() {
    window.external.CloseIME();
}


var imenum_callback;
//开始数字输入
window.ime_number =  function(data, callback) {
    imenum_callback = callback;
    window.external.Start_num_IME(data, "ime_number_callback");
}

//开始数字输入回调
window.ime_number_callback =  function(receivedData) {
    imenum_callback(receivedData);
}

//停止数字输入
window.ime_number_stop =  function() {
    window.external.Close_num_IME();
}


//获取电脑信息
window.get_info =  function() {
    return window.external.GetPcInfo();
}

//清除浏览器缓存
window.clear_cache =  function() {
    return window.external.clear_cache();
}