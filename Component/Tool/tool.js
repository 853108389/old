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

import Title from '../oldAdapter/oldTitle'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';
import CommonButtonBox from '../oldAdapter/oldButtonBox'
import ToolFunc from '../Tool/tool_func'
import ToolKnow from '../Tool/tool_know'
export default class Team extends Component {
    static defaultProps = {

    }; //


    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            imageArr: [],
        };
    }

    render() {
        let imageArr = this.state.imageArr;
        let buttonArr1 = [{
            iconName: "ios-person-add-outline",
            iconTitle: "功能互联",
        }, {
            iconName: "ios-list-box-outline",
            iconTitle: "健康知识",
        }];

        return (
            <View style={styles.container}>
                <Title title="功能"></Title>
                <ScrollView>
                    <CommonButtonBox buttonArr={buttonArr1} type={0} clickButtonCallBack={(buttonObj, type) => { this._clickButtonCallBack(buttonObj, type) }}></CommonButtonBox>
                </ScrollView>
            </View >
        );
    }

    _clickButtonCallBack = (buttonObj, type) => {
        if (buttonObj.iconTitle == "功能互联") {
            this._pushFunc();
        }
        if (buttonObj.iconTitle == "健康知识") {
            this._pushKnow();
        }
    }
    
    _pushKnow = () => {
        //解构 与 模式匹配
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'toolKnow',
                component: ToolKnow,
                params: {

                }
            })
        } else {
            alert('跳转失败')
        }
    }

    _pushFunc = () => {
        //解构 与 模式匹配
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'toolFunc',
                component: ToolFunc,
                params: {

                }
            })
        } else {
            alert('跳转失败')
        }
    }

    componentDidMount() {
        this._fetchScrollData();
    }

    _fetchScrollData() {
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

