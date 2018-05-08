//--------------------------------------------------------------------
var scan_QR_callback;

function ScanQRInfo(callback) {
    scan_QR_callback = callback;
    window.external.StartScanQR("ScanQR_getback");
}

function ScanQR_getback(json) {
    scan_QR_callback(json)
}

function ScanQRStop() {
    window.external.CloseScanQR();
}