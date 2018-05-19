
var ocr_callback;

function use_OCR(data, callback) {
    ocr_callback = callback;
    window.external.Use_OCR(data,"use_OCR_callback");
}

function use_OCR_callback(json) {
    ocr_callback(json)
}