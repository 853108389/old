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
} from 'react-native';
const { width, height } = Dimensions.get('window');
import moment from 'moment';
import Title from '../oldAdapter/oldTitle'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { historyList, asyncGetUser } from '../common/fetch'
import Sound from 'react-native-sound';
export default class DataCell extends Component {
    static defaultProps = {
        hisObj: {
            username: "",
            date: "",
            fileName: "",
            site: "",
            lines: 2,
        },
    }; //


    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            on: false,
        };
    }

    _sound = () => {
        let fileName = this.props.hisObj.fileName;
        // alert(fileName)
        const s = new Sound(fileName, null, (e) => {
            if (e) {
                console.log('播放失败');
                return;
            }
            // sound.play((success) => {
            // });
            s.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
                this.setState({
                    on: false,
                })
                s.release()
            });
        });
    }


    //   <View style={styles.rowBlock} key={i}>
    //   <Text style={{ fontSize: 18 }}></Text>
    //   <Text style={{ fontSize: 18, flexWrap: "wrap", width: width / 2 }} numberOfLines={1}>{hisObj.site}</Text>
    // </View>
    _renderData = () => {
        let hisObj = this.props.hisObj;
        return (
            <TouchableOpacity onPress={() => { this._clickCell() }}>
                <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: "black", width: width }} >
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "black" }}>{hisObj.username}</Text>
                            {this._renderIcon()}
                        </View>
                        <Text style={{ fontSize: 16, color: "#999" }}>{moment(hisObj.date).format('YYYY-MM-DD HH:mm:ss')}</Text>
                        <Text style={{ fontSize: 17 }} numberOfLines={this.props.lines}>{hisObj.site}</Text>
                    </View>
                </View>

                {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row", width: width, borderColor: "#eee", borderWidth: 1, paddingTop: 5, paddingBottom: 5 }}>
                        <View style={{ width: width * 0.3, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20 }}>{hisObj.username}</Text>
                        </View>
                        <View style={{ width: width * 0.6, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 20 }}>{moment(hisObj.date).format('MM-DD HH:mm')}</Text>
                        </View>
                        <View style={{ width: width * 0.1, justifyContent: "center", alignItems: "center" }}>
                            {this._renderIcon()}
                        </View>
                    </View>
                </View> */}
            </TouchableOpacity>
        )
    }

    _clickCell = () => {
        this.setState({
            on: true
        })
        this._sound();
    }

    _renderIcon = () => {
        if (!this.state.on) {
            return (
                <Icon
                    name='md-volume-mute'
                    size={33}
                    style={styles.editIcon}
                />
            )
        } else {
            return (
                <Icon
                    name='md-volume-up'
                    size={33}
                    style={styles.editIcon}
                />
            )
        }
    }

    render() {
        return this._renderData();
    }

}

const styles = StyleSheet.create({
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

