var fvopen_callback;
function open_fv(data, callback) {
    fvopen_callback = callback;
    window.external.FV_Open(data,"fvopen_getback");
}

function fvopen_getback(json) {
    fvopen_callback(json);
}

//**********************
var fvgclose_callback;
function close_fv(data,callback) {
    fvclose_getback = callback;
    window.external.FV_Close(data, "fvclose_getback");
}
function fvclose_getback(json) {
    fvgclose_callback(json);
}

//**********************
var fvgetfeature_callback;
function getfeature_fv(data, callback) {
    fvgetfeature_callback = callback;
    window.external.FV_GetFeature(data, "fvgetfeature_getback");
}

function fvgetfeature_getback(json) {
    fvgetfeature_callback(json);
}


function canel_fv() {
    window.external.FV_Cancel();
}

//**********************
var contrast_callback;
function contrast_fv(data, callback) {
    contrast_callback = callback;
    window.external.FV_Contrast(data, "contrast_getback");
}

function contrast_getback(json) {
    contrast_callback(json);
}