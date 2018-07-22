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

import Title from '../commonView/title'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';

export default class CommonButtonBox extends Component {
    static defaultProps = {
        buttonArr: [],
        type: 0,
        clickButtonCallBack: null,
    }; //
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
        };
        this._clickButton = this._clickButton.bind(this);
    }

    _clickButton(buttonObj, type) {
        if (this.props.clickButtonCallBack != null) {
            this.props.clickButtonCallBack(buttonObj, type)
        }
    }

    renderButton = (buttonArr, type) => {
        return <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10 }}>
            {this.renderBottonBox(buttonArr, type)}
        </View>
    }

    renderBottonBox = (buttonArr, type) => {
        let buttonBox = []
        let buttonCell = [];
        buttonArr.forEach((buttonObj, i) => {
            buttonCell.push(
                <TouchableOpacity key={i} onPress={() => { this._clickButton(buttonObj, type) }}>
                    <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 5 }}>
                        <View style={styles.inBlock}>
                            <Icon name={buttonObj.iconName}
                                size={30}
                            />
                            <Text>{buttonObj.iconTitle}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
            if (buttonCell.length == 4) {
                buttonBox.push(
                    <View key={"a" + i} style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        {buttonCell}
                    </View>
                )
                buttonCell = [];
            }
            if (i == buttonArr.length - 1 && buttonCell.length > 0) {
                let num = 4 - buttonCell.length;
                let tempCell = [];
                while (num > 0) {
                    tempCell.push(<View style={styles.inBlock} key={"b" + num}></View>)
                    num--;
                }
                buttonBox.push(
                    <View key={"a" + i} style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        {buttonCell}
                        {tempCell}
                    </View>
                )
            }
        })
        return buttonBox;
    }

    render() {
        return (
            this.renderButton(this.props.buttonArr, this.props.type)
        );
    }


    componentDidMount() {
        this._fetchScrollData();
    }

    _fetchScrollData() {
    }
}

const styles = StyleSheet.create({
    inBlock: { alignItems: "center", width: 100 },
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

