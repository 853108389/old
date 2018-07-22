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
import { fetchUserByNameAndTel, bindParents, asyncGetUser } from '../common/fetch'
export default class AddFam extends Component {
    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            username: "",
            tel: "",
            user: {
                userNickname: "",
                tel: "",
                type: 0,
                id: "",
            }
        };
    }

    _fetchAddUserFam = () => {
        asyncGetUser().then((user) => {
            return user.id
        }).then((id) => {
            bindParents(id, this.state.user.id).then((data) => {
                if (data == 0) {
                    ToastAndroid.show('添加成功', ToastAndroid.SHORT);
                    this.props.navigator.popToTop() ;
                } else if (data == 1) {
                    ToastAndroid.show('同为老人或子女', ToastAndroid.SHORT);
                } else if (data == 2) {
                    ToastAndroid.show('用户已关联', ToastAndroid.SHORT);
                }
            }).catch((err) => {
                ToastAndroid.show('添加失败', ToastAndroid.SHORT);
            })
        })
    }

    _renderSearchList = () => {
        let user = this.state.user;
        if (user == null || user.userNickname == null || user.userNickname == "") {
            return null;
        }
        return <View style={styles.rowStyle}>
            <View style={{}}>
                {/* {avatarCell} */}
                <Text style={{ marginLeft: 5, fontSize: 18, color: "black" }}>用户名:{user.userNickname}</Text>
                <Text style={{ marginLeft: 5, fontSize: 18, color: "black" }}>电话:{user.tel}</Text>
                <Text style={{ marginLeft: 5, fontSize: 18, color: "black" }}>用户类型:{user.type == 1 ? '子女' : '老人'}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => { this._fetchAddUserFam() }}>
                <View style={styles.leftTextBox}>
                    <Text style={{ fontSize: 20 }}>添加</Text>
                </View>
            </TouchableOpacity>
        </View >
    }

    _findUserByNameAndTel = () => {
        fetchUserByNameAndTel(this.state.username, this.state.tel).then((data) => {
            // alert(JSON.stringify(data));
            if (data == 1) {
                ToastAndroid.show('该用户不存在', ToastAndroid.SHORT);
                return;
            } else {
                let user = this.state.user;
                user.userNickname = data.username;
                user.tel = data.mobile_Num;
                user.type = data.userType;
                user.id = data.id;
                this.setState({
                    user: user,
                })
            }
        }).catch((err) => {
            ToastAndroid.show('出了点小问题', ToastAndroid.SHORT);
            // alert("_" + err);
        })

    }
    render() {
        return (
            <View style={styles.container}>
                <Title title='添加家人' leftView={true} navigator={this.props.navigator}></Title>
                <View style={{ marginTop: 15 }}>
                </View>
                <View style={styles.signupBox}>
                    <Text style={styles.title}>添加家人</Text>
                    <TextInput
                        placeholder='用户姓名'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        style={styles.inputField}
                        value={this.state.username}
                        keyboardType={"email-address"}
                        onChangeText={(text) => {
                            this.setState({
                                username: text
                            });
                        }}

                    />
                    <TextInput
                        placeholder='联系电话'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={"email-address"}
                        underlineColorAndroid='transparent'
                        style={styles.inputField}
                        onChangeText={(text) => {
                            this.setState({
                                tel: text
                            });
                        }}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={() => { this._findUserByNameAndTel() }}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>查询</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                    {this._renderSearchList()}
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
        padding: 10,
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
