/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    // AppRegistry,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Linking,
} from 'react-native';
import call from 'react-native-phone-call'
import Communications from 'react-native-communications';
import request from '../common/request';
import moment from 'moment';
var SHA256 = require("crypto-js/sha256");
const { width, height } = Dimensions.get('window');
export default class TestTel extends Component {
    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
        };
    }


    getUrl = (params) => {
        let url = "https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=" + params.sdkappid + "&random=" + params.random;
        return url;
    }

    getSig = (params) => {
        let str = "appkey=" + params.appkey + "&random=" + params.random + "&time=" + params.time + "&mobile=" + params.mobile;
        console.log(str);
        console.log(SHA256(str).toString());
        return SHA256(str).toString();
    }

    getParams = () => {
        let params = {
            random: "7226249334",
            appkey: "32561e6105bdb715f54b35c050aeaffc",
            time: Math.round(new Date().getTime() / 1000),
            mobile: "17805005900",
            sdkappid: "1400076449",
        }
        let sig = this.getSig(params);
        let url = this.getUrl(params);
        params.url = url;
        params.sig = sig;
        return params;
    }

    getData = () => {
        let params = this.getParams();
        let data = {
            ext: "",
            extend: "",
            params: [],
            msg: "您的父母发出紧急求救信号，请及时打开app查看",
            sig: params.sig,
            tel: {
                mobile: params.mobile,
                nationcode: "86"
            },
            time: params.time,
            type: 0,
            tpl_id: "96068",
        }

        return data;
    }


    getAddSignParams = () => {
        let params = this.getParams();
        let params2 = {
            "pic": "",
            "remark": "短信提示",
            "sig": params.sig,
            "text": "[颐泰助医]",
            "time": params.time,
        }
        console.log("p2", params2)
        return params2;
    }

    test = () => {
        // this.getData();
        let url = "https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=1400076449&random=7226249334";
        let params = this.getData();
        request.post(url, params).then((data) => {
            alert(JSON.stringify(data))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.test() }}>
                    <View style={styles.holder}>
                        <Text style={styles.text}>Send a text/iMessage</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.add() }}>
                    <View style={styles.holder}>
                        <Text style={styles.text}>add</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

// AppRegistry.registerComponent('MyApp', () => MyApp);
