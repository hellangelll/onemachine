



var PenSigner_callback;
function Use_PenSigner(callback) {//打开手写板
    PenSigner_callback = callback;
    window.external.pensigner_use("Use_PenSigner_callback");
}
function Use_PenSigner_callback(receivedData) {
    PenSigner_callback(receivedData);
}

//清空手写板内容
function Clean_PenSigner() {
    window.external.pensigner_clean();
}

//关闭手写板
function Close_PenSigner() {
    window.external.pensigner_close();
}

var opendraw_callback;
//开始签名
function open_draw(data, callback) {
    opendraw_callback = callback;
    window.external.draw_open(data, "open_draw_callback");
}

function open_draw_callback(receivedData) {
    opendraw_callback(receivedData);
}

var cleardraw_callback;
//清理签名
function clear_draw(data,callback) {
    cleardraw_callback = callback;
    window.external.draw_clear(data, "clear_draw_callback");
}

function clear_draw_callback(receivdData) {
    cleardraw_callback(receivdData);
}

var finishdraw_callback;
//完成签名
function finish_draw(data, callback) {
    finishdraw_callback = callback;
    window.external.draw_finish(data, "finish_draw_callback");
}

function finish_draw_callback(receivdData) {
    finishdraw_callback(receivdData);
}