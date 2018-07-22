/**
 *失败
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from 'react-native';
import CommonButton from '../commonView/CommonButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './../../login';
const { width, height } = Dimensions.get('window');
export default class RegisterForm extends Component {
    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            type: "0",
            content1: "",
            isOK1: null,
            content2: "",
            isOK2: null,
            content3: "",
            isOK3: null,
            isAble: false,
        };
    }

    _isAble() {
        console.log(this.state.isOK1 + " " + this.state.isOK2 + " " + this.state.isOK3)
        if (this.state.isOK1 && this.state.isOK2 && this.state.isOK3) {
            this.setState({
                isAble: true,
            })
        } else {
            this.setState({
                isAble: false,
            })
        }
    }

    _renderBlock1 = () => {
        let flagCell = null;
        // console.log("isOK1", this.state.isOK1)
        if (this.state.isOK1 !== null) {
            if (this.state.isOK1) {
                flagCell = <Icon name='ios-checkmark-circle-outline' size={36} style={{ color: "green" }} />;
            } else {
                flagCell = <Icon name='ios-close-circle-outline' size={36} style={{ color: "red" }} />;
            }
        }
        return (
            <View style={styles.block}>
                <View style={styles.iconBox}>
                </View>
                <View style={styles.textInputBox}>
                    <TextInput
                        placeholder='请输入旧密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content}
                        onChangeText={(text) => {
                            this.setState({
                                content1: text
                            }, () => {
                                if (this.state.content1 == "") {
                                    this.setState({
                                        isOK1: null
                                    }, () => {
                                        this._isAble();
                                    });
                                    return;
                                }
                            });
                        }}
                        onBlur={() => {
                            this._fetchConfirmPw();
                        }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.iconBox}>
                    {flagCell}
                </View>
            </View>
        )
    }

    _renderBlock2 = () => {
        let flagCell = null;
        if (this.state.isOK2 !== null) {
            if (this.state.isOK2) {
                flagCell = <Icon name='ios-checkmark-circle-outline' size={36} style={{ color: "green" }} />;
            } else {
                flagCell = <Icon name='ios-close-circle-outline' size={36} style={{ color: "red" }} />;
            }
        }
        return (
            <View style={[styles.block, { marginTop: 10 }]}>
                <View style={styles.iconBox}>
                </View>
                <View style={styles.textInputBox}>
                    <TextInput
                        placeholder='请输入新密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content}
                        onChangeText={(text) => {
                            this.setState({
                                content2: text
                            }, () => {
                                if (this.state.content2 == "") {
                                    this.setState({
                                        isOK2: null
                                    }, () => {
                                        this._isAble();
                                    });
                                    return;
                                }
                                //两次新密码相同
                                if (this.state.content3 === this.state.content2) {
                                    this.setState({
                                        isOK3: true
                                    }, () => {
                                        this._isAble();
                                    });
                                } else {
                                    this.setState({
                                        isOK3: null
                                    }, () => {
                                        this._isAble();
                                    });
                                }
                            });
                        }}
                        onBlur={() => {
                            if (this.state.content2 == "") {
                                this.setState({
                                    isOK2: null
                                }, () => {
                                    this._isAble();
                                });
                            } else {
                                //两次新密码相同
                                if (this.state.content3 === this.state.content2) {
                                    this.setState({
                                        isOK3: true,
                                        isOK2: true,
                                    }, () => {
                                        this._isAble();
                                    });
                                } else {
                                    this.setState({
                                        isOK2: true,
                                        isOK3: null,
                                    }, () => {
                                        this._isAble();
                                    })
                                }

                            }
                        }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.iconBox}>
                    {flagCell}
                </View>
            </View>
        )
    }

    _renderBlock3 = () => {
        let flagCell = null;
        if (this.state.isOK3 !== null) {
            if (this.state.isOK3) {
                flagCell = <Icon name='ios-checkmark-circle-outline' size={36} style={{ color: "green" }} />;
            } else {
                flagCell = <Icon name='ios-close-circle-outline' size={36} style={{ color: "red" }} />;
            }
        }
        return (
            <View style={[styles.block, { marginTop: 10 }]}>
                <View style={styles.iconBox}>
                </View>
                <View style={styles.textInputBox}>
                    <TextInput
                        placeholder='确认密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content}
                        onChangeText={(text) => {
                            this.setState({
                                content3: text
                            }, () => {
                                if (this.state.content3 == "") {
                                    this.setState({
                                        isOK3: null
                                    }, () => {
                                        this._isAble();
                                    });
                                    return;
                                }
                                if (this.state.content3 === this.state.content2) {
                                    //两次新密码相同
                                    if (this.state.content3 != "" && this.state.content2 != "") {
                                        this.setState({
                                            isOK3: true
                                        }, () => {
                                            this._isAble();
                                        });
                                    } else {
                                        this.setState({
                                            isOK3: false
                                        }, () => {
                                            this._isAble();
                                        });
                                    }
                                } else {
                                    this.setState({
                                        isOK3: null
                                    }, () => {
                                        this._isAble();
                                    });
                                }
                            });
                        }}
                        onBlur={() => {
                            if (this.state.content3 == "") {
                                this.setState({
                                    isOK3: null
                                }, () => {
                                    this._isAble();
                                });
                            } else {
                                if (this.state.content3 === this.state.content2) {
                                    //两次新密码相同
                                    if (this.state.content3 != "" && this.state.content2 != "") {
                                        this.setState({
                                            isOK3: true
                                        }, () => {
                                            this._isAble();
                                        });
                                    } else {
                                        this.setState({
                                            isOK3: false
                                        }, () => {
                                            this._isAble();
                                        });
                                    }
                                } else {
                                    this.setState({
                                        isOK3: false
                                    }, () => {
                                        this._isAble();
                                    });
                                }
                            }
                        }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.iconBox}>
                    {flagCell}
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={styles.initModalContainer}>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 80 }}>
                        <Icon name='ios-cafe-outline' size={80} style={{ color: "green" }} />
                    </View>
                    {this._renderBlock1()}
                    {this._renderBlock2()}
                    {this._renderBlock3()}
                    <View style={styles.confirmBox}>
                        <TouchableOpacity disabled={!this.state.isAble} onPress={() => { this._fetchEditPw() }}>
                            <View style={this.state.isAble ? styles.btn : styles.btn2}>
                                <Text style={this.state.isAble ? styles.btnText : styles.btnText2}>修改密码</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
    _pushLogin() {
        //解构 与 模式匹配
        let { navigator } = this.props;
        if (navigator) {
            navigator.resetTo({
                name: 'login',
                component: Login,
                params: {

                }
            })
        } else {
            alert('跳转失败')
        }
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
    btn2: {
        height: 50,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 25,
        marginRight: 10,
        marginLeft: 10,
    },
    btnText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ee735d'
    },
    btnText2: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ccc'
    },
    confirmBox: {
        marginBottom: 10,
        marginTop: 10,
    },
    content: {
        fontSize: 18,
    },
    iconBox: { flex: 0.1, height: 50, justifyContent: "center", alignItems: "center" },
    textInputBox: { flex: 0.8, borderColor: "#666", borderWidth: 1, height: 50, justifyContent: "center", borderRadius: 3 },
    textBox: { flex: 0.08, justifyContent: "center", alignItems: "center" },
    block: { flexDirection: "row", alignItems: "center" },
    initModalContainer: { flex: 1, marginHorizontal: 10, justifyContent: "center" },
    modalContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


