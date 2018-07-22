
import moment from 'moment';
var SHA256 = require("crypto-js/sha256");

export function getUrl(params) {
    let url = "https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=" + params.sdkappid + "&random=" + params.random;
    return url;
}

export function getSig(params) {
    let str = "appkey=" + params.appkey + "&random=" + params.random + "&time=" + params.time + "&mobile=" + params.mobile;
    return SHA256(str).toString();
}

export function getParams(mobile = "", ) {
    let params = {
        random: "7226249334",
        appkey: "32561e6105bdb715f54b35c050aeaffc",
        time: Math.round(new Date().getTime() / 1000),
        mobile: mobile == "" ? "1780500591" : mobile,
        sdkappid: "1400076449",
    }
    let sig = getSig(params);
    let url = getUrl(params);
    params.url = url;
    params.sig = sig;
    return params;
}

export function getData(mobile = "", telArr = null) {
    let params = getParams(mobile);
    let tel = [];
    if (telArr == null) {
        tel = [{
            mobile: mobile == "" ? params.mobile : mobile,
            nationcode: "86"
        }]
    } else {
        telArr.forEach((obj) => {
            tel.push({
                mobile: obj,
                nationcode: "86"
            })
        })
    }
    let data = {
        ext: "",
        extend: "",
        params: [],
        msg: "您的父母发出紧急求救信号，请及时打开app查看",
        sig: params.sig,
        tel: {
            mobile: mobile == "" ? params.mobile : mobile,
            nationcode: "86"
        },
        time: params.time,
        type: 0,
        tpl_id: "96068",
    }

    return data;
}


export function getAddSignParams() {
    let params = this.getParams();
    let params2 = {
        "pic": "",
        "remark": "短信提示",
        "sig": params.sig,
        "text": "[颐泰助医]",
        "time": params.time,
    }
    return params2;
}

