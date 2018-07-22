import Qiniu, { Auth, ImgOps, Conf, Rs, Rpc } from 'react-native-qiniu';
import moment from 'moment';

/**
 * 获得公钥 密钥
 */

function getConifg() {
    let config = {
        // base: 'http://geoweb.njupt.edu.cn/',//正式域名
        base: 'http://oxnbmu2mx.bkt.clouddn.com/',//测试域名
        ak: 'DT66l5FkxNivhSD0zJKjXr_WccNtZwS4cppxlIzy',//TODO 服务器获取 记得删除
        sk: 'jb8s3PfQVCRzp_LYG33_QHJ1ozN2krdaH7bNKkTF',//TODO 服务器获取 记得删除
        host: "http://up-z2.qiniu.com",//华南服务器
        bucket: "niangao-sos",//空间
    };
    return config;
}

function getMacParams() {
    let config = getConifg();
    let macParams = {
        AK: config.ak,
        SK: config.sk,
    }
    return macParams
}
function getPolicy(key) {
    let config = getConifg();
    let policy = {
        scope: config.bucket + ":" + key,
        returnBody:
            {
                key: "$(key)",
                hash: "$(etag)",
            },
    }
    return policy;
}

function getParams(uri, key) {
    let params = {
        uri: uri,
        key: key,
    }
    return params;
}

function fetchQiniuUploadDetail(uri, oncallbackUpDate) {
    let time = moment().format('YYYYMMDDHHmm');
    let key = "audio" + "_" + time;
    let params = getParams(uri, key);
    let policy = getPolicy(key)
    return Rpc.uploadFile(params, policy, ((perc, oloaded, total, key) => {
        if (oncallbackUpDate == null) {
            return;
        }
        oncallbackUpDate(perc, oloaded, total, key)
    })).then((data) => {
        return key;
    })
}
/**
 * 本地图片地址,
 * 更新回调游戏
 */
export default function fetchQiniuUpload(uri, oncallbackUpDateCallBack = null) {
    let macParams = getMacParams();
    return fetchQiniuUploadDetail(uri, oncallbackUpDateCallBack);
}