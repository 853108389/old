/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Title from '../oldAdapter/oldTitle';
import {
    // AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
    PixelRatio,
    ToastAndroid,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { bindCommunity, asyncGetUser } from '../common/fetch'
export default class AddCom extends Component {
    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            name: "",
        };
    }

    _fetchAddUserFam = () => {
        ToastAndroid.show('添加成功', ToastAndroid.SHORT);
    }

    _bindCommunity = () => {
        asyncGetUser().then((user) => {
            return user.id
        }).then((id) => {
            bindCommunity(id, this.state.name).then((data) => {
                if (data == 0) {
                    ToastAndroid.show('添加成功', ToastAndroid.SHORT);
                    this.props.navigator.popToTop() ;
                } else if (data == 1) {
                    ToastAndroid.show('用户已关联', ToastAndroid.SHORT);
                }
            }).catch((err) => {
                ToastAndroid.show('添加失败', ToastAndroid.SHORT);
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Title title='添加社区' leftView={true} navigator={this.props.navigator}></Title>
                <View style={{ marginTop: 15 }}>
                </View>
                <View style={styles.signupBox}>
                    <Text style={styles.title}>添加社区</Text>
                    <TextInput
                        placeholder='社区名称'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        style={styles.inputField}
                        value={this.state.name}
                        keyboardType={"email-address"}
                        onChangeText={(text) => {
                            this.setState({
                                name: text
                            });
                        }}
                    />
                    <TouchableOpacity onPress={() => { this._bindCommunity() }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>添加</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1 / PixelRatio.get()
    },

    leftTextBox: {
        backgroundColor: "#ddd",
        borderBottomWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        padding: 5,
    },

    title: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#555'
    },
    inputField: {
        height: 40,
        padding: 5,
        color: '#666',
        fontSize: 16,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        borderColor: '#ee735d'

    },
    btn: {
        height: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ee735d',
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ee735d'
    },
});

// AppRegistry.registerComponent('MyApp', () => MyApp);
