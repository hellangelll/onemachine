﻿var idcard_callback;window.idReaderReadInfo =  function(data, callback) {    idcard_callback = callback;    try {        window.external.Read_IDCard(data, "IDCard_getback");    }    catch (err) {        window.external.Read_IDCard("IDCard_getback");    }}window.IDCard_getback =  function(json) {    idcard_callback(json)}var stop_callback;window.stopRead =  function(data, callback) {    stop_callback = callback;    window.external.Close_IDCard("stopRead_getback");}window.stopRead_getback =  function(json) {    stop_callback(json)}