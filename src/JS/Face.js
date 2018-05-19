

var facemathcallback;
//开始手写输入
function Face_recognition(data, callback) {
    facemathcallback = callback;
    window.external.Face_Math(data, "Face_recognition_callback");
}

//开始手写输入回调
function Face_recognition_callback(receivedData) {
    facemathcallback(receivedData);
}