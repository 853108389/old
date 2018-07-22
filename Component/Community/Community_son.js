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

import Title from '../commonView/title'; //标题//标题
import CommonCellImg from '../commonView/CommonCellImg';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';


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
        return (
            <View style={styles.container}>
                <Title title="社区"></Title>
                <ScrollView>
                    <View style={{ alignItems: "center", flex: 0.3, width: width, height: 250, borderColor: "red", borderWidth: 1, marginTop: 15 }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 15 }}>社区列表</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.7, height: 250, alignItems: "center", borderColor: "red", borderWidth: 1,marginTop: 15 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 15 }}>医院列表</Text>
                     </View>
                    </View>
                </ScrollView>
            </View >
        );
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

