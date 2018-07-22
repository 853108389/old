/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    WebView,
    ToastAndroid,
} from 'react-native';
const { width, height } = Dimensions.get('window');

import Title from '../commonView/title'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';


export default class ToolFunc extends Component {
    static defaultProps = {

    }; //


    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            temperature: 0, //温度
            lowPressure: 0, //压力
            highPressure: 0,//
            pos: "暂无", //定位
            rate: 0, //心率
            ws: null,
            flag: true,
            timer: null,
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if (this.state.ws != null) {
            clearTimeout(this.state.timer)
            this.state.ws.close();
        }
    }

    _socketInit = () => {
        var ws = new WebSocket(config.yitai.ws);
        this.setState({
            ws: ws,
            flag: true,
        }, () => {
            ws.onopen = () => {
                ToastAndroid.show('建立连接成功', ToastAndroid.SHORT);
                // 打开一个连接
                var timer = setInterval(() => {
                    if (this.state.flag) {
                        ws.send('request'); // 发送一个消息
                    }
                }, 500)
                this.setState({
                    timer: timer,
                })
            };
        })

        ws.onmessage = (e) => {
            // 接收到了一个消息
            console.log(e.data);
            let data = JSON.parse(e.data)
            this.setState({
                temperature: data.temperature.toFixed(5), //温度
                lowPressure: data.lowPressure.toFixed(4),//压力
                highPressure: data.highPressure.toFixed(4),//
                pos: data.pos, //定位
                rate: data.rate.toFixed(5), //心率
            })
        };
        ws.onerror = (e) => {
            // 发生了一个错误
            console.log(e.message);
        };
        ws.onclose = (e) => {
            // 连接被关闭了
            console.log(e.code, e.reason);
        };
        // {"rate":107.685415204321,"temperature":1.97553076646276,"highPressure":37.3343133137337,"lowPressure":143.666493728446,"pos":85.2565080721457}

    }

    render() {
        // setTimeout(() => {
        //     this.setState({
        //         tiwen: 39,
        //         xueyaDi: 75,
        //         xueyaGao: 120,
        //         xinlv: 60,
        //     });
        // }, 5000);
        let imageArr = this.state.imageArr;
        return (
            <View style={styles.container}>
                <Title title="功能互联" leftView={true} navigator={this.props.navigator}></Title>
                <ScrollView>
                    {/* <View style={{ alignItems: "center", justifyContent: "center", width: width, height: 200 }}>
                    </View> */}
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.block}>
                            <View style={styles.initBlock}>
                                <Icon name='ios-thermometer-outline'
                                    color={"orange"}
                                    size={80}
                                    style={styles.iconStyle}
                                />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: "black" }}>体温</Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.temperature}°</Text>
                            </View>
                        </View>
                        <View style={styles.block}>
                            <View style={styles.initBlock}>
                                <Icon name='ios-water'
                                    color={"#ee0033"}
                                    size={80}
                                    style={styles.iconStyle}
                                />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: "black" }}>血压</Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.lowPressure}/{this.state.highPressure}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.block}>
                            <View style={styles.initBlock}>
                                <Icon name='ios-pulse'
                                    size={80}
                                    color={"#99ffcc"}
                                    style={styles.iconStyle}
                                />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: "black" }}>心率</Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.rate}次/分</Text>
                            </View>
                        </View>
                        <View style={styles.block}>
                            <View style={styles.initBlock}>
                                <Icon name='md-pin'
                                    size={80}
                                    color={"#33cccc"}
                                    style={styles.iconStyle}
                                />
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20, color: "black" }}>定位</Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>{this.state.pos}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { this._socketInit() }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>启动检测</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View >
        );
    }

}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ee735d',
        marginTop: 25,
        marginRight: 10,
        marginLeft: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ee735d'
    },
    initBlock: { alignItems: "center", justifyContent: "center", marginTop: 25 },
    iconStyle: {
        width: width / 4,
        borderRadius: width / 8,
        textAlign: 'center',
    },
    block: { width: width / 2, height: width / 2, borderColor: "#ccc", borderWidth: 1 },
    leftImgStyle: {
        marginRight: 6,
        borderRadius: 12,
        backgroundColor: '#eee',
        width: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    topImgContainer: {
        width: width,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleView: {
        marginTop: 10,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: 'white',
    },

});

