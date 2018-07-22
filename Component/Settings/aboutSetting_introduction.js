/**
TODO
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Title from "../commonView/title"
export default class Introduction extends Component {

    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Title title='功能介绍' leftView={true} navigator={this.props.navigator}></Title>
                <ScrollView>
                    <View style={styles.infoBox}>
                        <View style={styles.block}>
                            <Text style={{ color: "green" }}>测试版V1.0.0</Text>
                            <Text>本产品主要用于解决现有的老人问题</Text>
                            <Text>已实现功能:</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    finish: { color: "#006633" },
    title: { color: "black", fontSize: 16 },
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        width: width,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    infoBox: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: "center",
    }
});








