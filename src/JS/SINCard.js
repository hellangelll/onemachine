var sin_read_callback;

function Read_SINcard(data, callback) {
    sin_read_callback = callback;
    window.external.SIN_read(data,"Read_SIN_callback");
}

function Read_SIN_callback(json) {
    sin_read_callback(json)
}