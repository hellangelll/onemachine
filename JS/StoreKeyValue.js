/// <summary>
/// 保存键值对
/// </summary>
/// <returns>
/// 0:成功，其他：失败
/// </returns>
function SetKey(key,value){
    return window.external.save_key(key,value);
}

/// <summary>
/// 读取键值
/// </summary>
/// <returns>
/// null：失败，其他：返回的键值
/// </returns>
function GetKey(key){
    return window.external.read_key(key);
}

/// <summary>a
/// 删除
/// </summary>
/// <returns>
/// 0:成功，-1：失败
/// </returns>
function DelKey(key){
    return window.external.delete_key( key);
}

/// <summary>
/// 清空
/// </summary>
/// <returns>
/// 0:成功，-1：失败
/// </returns>
function ClearKey(){
    return window.external.clear_key();
}

/// <summary>
/// 获取键值对数量
/// </summary>
/// <returns>
/// -1：失败，其他：数量
/// </returns>
function GetKeyCount(){
    return window.external.get_keycout();
}

/// <summary>
/// 获取所有的键名
/// </summary>
/// <returns>
/// null：失败，其他：key名称的string数组
/// </returns>
function GetAllKey(){
    return window.external.get_allkey();
}