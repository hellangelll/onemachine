


var pbCallBack;
var pblCallBack;
var pflCallBack;
//打印图片
function printBitmap(data, callback) {
    pbCallBack = callback;
    window.external.PrintBitmap(data, "printBitmap_callback");

}

function printBitmap_callback(receivedData) {
    pbCallBack(receivedData);
}

//打印图片列表
function printBitmap_list(data, callback) {
    pblCallBack = callback;
    window.external.PrintBitmapList(data, "printBitmap_list_callback");

}

function printBitmap_list_callback(receivedData) {
    pblCallBack(receivedData);
}

//打印文件列表
function printFile_list(data, callback) {
    pflCallBack = callback;
    window.external.PrintFileList(data, "printFile_list_callback");

}

function printFile_list_callback(receivedData) {
    pflCallBack(receivedData);
}

var urlCallBack;
//打印指定网页
function printUrl(data, callback) {
    urlCallBack = callback;
    window.external.PrintWeb(data, "printUrl_callback");

}

function printUrl_callback(receivedData) {
    urlCallBack(receivedData);
}

var urlfileCallBack;
//打印指定网页文件
function printUrlFile(data, callback) {
    urlfileCallBack = callback;
    window.external.NetFilePrint(data, "printUrlFile_callback");

}

function printUrlFile_callback(receivedData) {
    urlfileCallBack(receivedData);
}

var htmlCallBack;
//打印html元素
function printhtml(data, callback) {
    htmlCallBack = callback;
    window.external.Printhtml(data, "printhtml_callback");

}

function printhtml_callback(receivedData) {
    htmlCallBack(receivedData);
}

var urlCallBack2;
//打印指定网页
function printUrl2(data, callback) {
    urlCallBack2 = callback;
    window.external.PrintWeb2(data, "printUrl2_callback");

}

function printUrl2_callback(receivedData) {
    urlCallBack2(receivedData);
}


//打印机唤醒
function PrintWakeup() {
    return window.external.PrintWakeup();
}


//打印机状态获取
function PrintStatus() {
    return window.external.PrintStatus();
}

var print_info_callback;
//打印机信息获取
function PrintInfo(callback) {
    print_info_callback = callback;
    return window.external.PrintInfo("PrintInfo_callback");
}

function PrintInfo_callback(receivedData) {
    print_info_callback(receivedData);
}