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

import Title from '../oldAdapter/oldTitle';
import CommonCellImg from '../commonView/CommonCellImg';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';
import KnowDetail from './tool_knowDetail';
import { fetchHealthList, fetchFirstAidList } from '../common/fetch'

export default class ToolKnow extends Component {
    static defaultProps = {
    }; //


    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            selectType: "",
            selectId: "",
            helpArr: [{
                id: "1",
                title: "晕厥"
            }, {
                id: "2",
                title: "中风"
            }, {
                id: "3",
                title: "癫痫急救法"
            }, {
                id: "4",
                title: "心血管意外"
            },],
            lifeArr: [{
                id: "1",
                title: "饮食保健"
            }, {
                id: "2",
                title: "喝得适当"
            }, {
                id: "3",
                title: "冬季老人护心6大禁忌"
            }, {
                id: "4",
                title: "饮食有节"
            },]
        };
    }

    renderDataCell = () => {
        let comArr = this.state.helpArr;
        let cellArr = [];
        comArr.forEach((obj, i) => {
            cellArr.push(<TouchableOpacity key={i} onPress={() => {
                this.setState({
                    selectId: obj.id,
                    selectType: 0,
                }, () => {
                    this._pushKnowDetail(obj.id, obj.title);
                });

            }}>
                <View style={styles.rowBlock}>
                    <Text style={{ fontSize: 20 }}>{obj.title}</Text>
                </View>
            </TouchableOpacity >)
        })
        return cellArr
    }

    renderDataCell2 = () => {
        let comArr = this.state.lifeArr;
        let cellArr = [];
        comArr.forEach((obj, i) => {
            cellArr.push(<TouchableOpacity key={i} onPress={() => {
                this.setState({
                    selectId: obj.id,
                    selectType: 1,
                }, () => {
                    this._pushKnowDetail(obj.id, obj.title);
                });
            }}>
                <View style={styles.rowBlock}>
                    <Text style={{ fontSize: 20 }}>{obj.title}</Text>
                </View>
            </TouchableOpacity >)
        })
        return cellArr
    }

    _pushKnowDetail = (id, title) => {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'knowDetail',
                component: KnowDetail,
                params: {
                    id: this.state.selectId,
                    type: this.state.selectType,
                    title: title,
                }
            })
        } else {
        }
    }

    render() {
        let imageArr = this.state.imageArr;
        return (
            <View style={styles.container}>
                <Title title="健康知识" leftView={true} navigator={this.props.navigator}></Title>
                <ScrollView>
                    <View style={{ alignItems: "center", flex: 0.3, width: width, height: 250, borderColor: "red", borderWidth: 1, marginTop: 15 }}>
                        <View style={{ marginVertical: 10, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 22, color: "black" }}> 急救知识</Text>
                            {this.renderDataCell()}
                        </View>
                    </View>
                    <View style={{ alignItems: "center", flex: 0.3, width: width, height: 250, borderColor: "red", borderWidth: 1, marginTop: 15 }}>
                        <View style={{ marginVertical: 10, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 22, color: "black" }}> 养生知识</Text>
                            {this.renderDataCell2()}
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }


    componentDidMount() {
        //养生
        fetchHealthList().then((data) => {
            this.setState({
                lifeArr: data,
            })
        })
        //急救
        fetchFirstAidList().then((data) => {
            this.setState({
                helpArr: data,
            })
        })
    }
}

const styles = StyleSheet.create({
    rowBlock: { alignItems: "center", marginVertical: 10, borderColor: "#ccc", borderBottomWidth: 1, width: width },

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

