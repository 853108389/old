/**
 * 文件上传
 * @param {本地文件路径} uri 
 */
function creatFormInput(uri) {
    let formInput = {};
    formInput.uri = uri;
    if (typeof formInput.type == 'undefined')
        // formInput.type = 'application/octet-stream';
        formInput.type = 'multipart/form-data';
    if (typeof formInput.name == 'undefined') {
        var filePath = uri.split("/");
        if (filePath.length > 0)
            formInput.name = filePath[filePath.length - 1];
        else
            formInput.name = "";
    }
    return formInput;
}

/**
 * 构建文件上传表单
 * @param {params{data:{key:value},uri:""}} params 
 */
export function creatFormData(params) {
    // alert(params.uri)
    let formdata = new FormData();
    let formInput = creatFormInput(params.uri);
    let data = params.data;
    for (let key of Object.keys(data)) {
        let value = data[key];
        formdata.append(key, value);
    }
    formdata.append("file", { uri: formInput.uri, type: formInput.type, name: formInput.name });
    return formdata;
}