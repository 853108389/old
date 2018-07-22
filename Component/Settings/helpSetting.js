/**
TODO
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import CommonCell from "../commonView/CommonCell";
import AutoExpandingTextInput from '../commonView/AutoExpandingTextInput'
import CommonCellImg from '../commonView/CommonCellImg';
import Title from '../commonView/title';
import Icon from 'react-native-vector-icons/Ionicons';
export default class HelpSetting extends Component {

    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            content: '',//TextInput的值
            data: [
                {
                    "id": 1,
                    "lable": "如何使用",
                    "dataKey": "question1",
                    "dataValue":
                    ""
                },
                {
                    "id": 2,
                    "lable": "如何绑定亲人",
                    "dataKey": "question2",
                    "dataValue":
                    ""
                },
                {
                    "id": 3,
                    "lable": "如何修改信息",
                    "dataKey": "question3",
                    "dataValue":
                    ""
                },
            ],
        };
        this._renderInfoCell = this._renderInfoCell.bind(this)
        this._renderQtBlock = this._renderQtBlock.bind(this)
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Title title='帮助与反馈' leftView={true} navigator={this.props.navigator}></Title>
                {this._renderQtBlock()}
            </ScrollView>
        );
    }

    _renderQtBlock() {
        return (
            <View style={styles.block}>
                <CommonCellImg leftTitle='常见问题' rightTitle='' callBackLeftIcon={() => {
                    return (
                        <View >
                            <Icon name='ios-information'
                                size={20}
                                style={styles.leftImgStyle}
                            />
                        </View>
                    )
                }} />
                {this._renderInfoCell()}
            </View>
        )
    }



    //渲染公共info组件
    _renderInfoCell() {
        let data = this.state.data;
        let cellView = [];
        for (let i = 0; i < data.length; i++) {
            let dataObj = data[i]
            let lable = dataObj.lable //左标题 数据lable
            let dataValue = dataObj.dataValue; //右标题 数据值
            let dataKey = dataObj.dataKey; //右标题 数据值
            let title = lable;//标题
            var cell = <CommonCell key={i}  title={lable} rightTitle={dataValue} rightIcon={true}
                callBackClickCell={() => {

                }}>
            </CommonCell>;
            cellView.push(cell)
        }
        return cellView;
    }

}
const styles = StyleSheet.create({
    block:{
        marginBottom:10,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textInputBox: {
        marginTop: 5,
        backgroundColor: "#eee",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    leftImgStyle: {
        marginRight: 6,
        borderRadius: 12,
        backgroundColor: '#eee',
        width: 20,
        textAlign: 'center',
    },
});








