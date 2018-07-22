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
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Title from '../oldAdapter/oldTitle'
import AccountDetail from './accountDetail_son';
import CommonCellImg from '../oldAdapter/oldCellImg';
import Settings from '../Settings/settings';
import AccountImgUpload from './accountImgUpload';
// import TeamIteamWithUser from '../Team/TeamIteamWithUser';
// import TeamDetail from '../Team/teamDetail';
import config from '../common/config';
import request from '../common/request';
import UseHistory from './useHistory';
import MyHome from './myHome';
import myCom from './myCom';
const { width, height } = Dimensions.get('window');

export default class Account extends Component {

    static defaultProps = {
        user: null,
        teamData: null,
        teamDataSize: 0,
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            user: this.props.user,//数据源user
            logined: false,//是否登入
        };
        //渲染界面
        this._renderTopView = this._renderTopView.bind(this);
        this._renderMiddleView = this._renderMiddleView.bind(this);
        this._renderCommonCellImg = this._renderCommonCellImg.bind(this);
        //跳转
        this._pushSettings = this._pushSettings.bind(this);
        //click
        this._clickCell = this._clickCell.bind(this);
    }


    render() {
        return (
            <View style={styles.container}>
                <Title title='我的'></Title>
                {/*上部分*/}
                {this._renderTopView()}
                <View>
                    {this._renderMiddleView()}
                </View>

            </View>
        );
    }

    componentDidMount() {
    }




    /**--上部分--**/
    _renderTopView() {
        let user = this.state.user;
        return (
            <AccountImgUpload user={user} infoButton={true} clickCallBack={() => { this._pushAccountDetail() }} />
        )
    }


    _renderCommonCellImg(item) {
        return (
            <CommonCellImg
                leftTitle={item.leftTitle}
                rightTitle={item.rightTitle}
                callBackLeftIcon={() => {
                    return (
                        <View >
                            <Icon name={item.iconName}
                                size={20}
                                style={styles.leftImgStyle}
                            />
                        </View>
                    )
                }}
                callBackClickCell={() => {
                    this._clickCell(item.dataKey);
                }}
            />
        )
    }

    _renderMiddleView() {
        let items1 = {
            leftTitle: '我的家人',
            // rightTitle: ((this.state.teamDataSize != "" && typeof (this.state.teamDataSize) != "undefined") ? this.state.teamDataSize : 0) + "个",
            rightTitle: "",
            iconName: 'ios-arrow-down',
            dataKey: "myHome",
        };
        let items2 = {
            leftTitle: '设置',
            rightTitle: '',
            iconName: 'ios-cog',
            dataKey: "settings",
        }
        let items3 = {
            leftTitle: '使用历史',
            rightTitle: "",
            iconName: 'ios-arrow-down',
            dataKey: "useHistory",
        };
        let items4 = {
            leftTitle: '我的社区',
            // rightTitle: ((this.state.teamDataSize != "" && typeof (this.state.teamDataSize) != "undefined") ? this.state.teamDataSize : 0) + "个",
            rightTitle: "",
            iconName: 'ios-arrow-down',
            dataKey: "myCom",
        };
        return (
            <View>
                {this._renderCommonCellImg(items1)}
                <View style={{ marginTop: 10 }}></View>
                {this._renderCommonCellImg(items4)}
                <View style={{ marginTop: 10 }}></View>
                {this._renderCommonCellImg(items3)}
                <View style={{ marginTop: 10 }}></View>
                {this._renderCommonCellImg(items2)}
            </View>
        )

    }

    _clickCell(dataKey) {
        if (dataKey === "settings") {
            this._pushSettings();
        } else if (dataKey === "myHome") {
            this._pushMyHome();
            // return;
        } else if (dataKey === "useHistory") {
            this._pushUseHistory();
            // return;
        } else if (dataKey === "myCom") {
            //我的社区
            this._pushUseCom();
            // return;
        }

    }
    _pushUseCom(){
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'myCom',
                component: myCom,
                params: {
                }
            })
        } else {
            alert('跳转失败')
        }
    }

    _pushMyHome() {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'myHome',
                component: MyHome,
                params: {
                }
            })
        } else {
            alert('跳转失败')
        }
    }

    _pushUseHistory() {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'useHistory',
                component: UseHistory,
                params: {
                }
            })
        } else {
            alert('跳转失败')
        }
    }

    _pushAccountDetail() {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'accountDetail',
                component: AccountDetail,
                params: {
                    user: this.props.user,
                }
            })
        } else {
            alert('跳转失败')
        }
    }

    _pushSettings() {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'settings',
                component: Settings,
                params: {
                    user: this.state.user
                }
            })
        } else {
            alert('跳转失败')
        }
    }





}
const styles = StyleSheet.create({
    //middle图片样式
    leftImgStyle: {
        marginRight: 6,
        borderRadius: 12,
        backgroundColor: '#eee',
        width: 20,
        textAlign: 'center',
    },

    forwardIcon: {
        color: '#999',
        fontSize: 22,
        marginRight: 8,
    },
    topView: {
        height: Platform.OS == 'ios' ? 400 : 160,
        backgroundColor: 'rgba(255,96,0,1.0)'
    },
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },

    centerViewStyle: {
        flexDirection: 'row',
        width: width * 0.72
    },

    topViewStyle: {
        flexDirection: 'row',
        marginTop: Platform.OS == 'ios' ? 280 : 80,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    leftIconStyle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.2)'
    },

    bottomViewStyle: {
        flexDirection: 'row',
        // 绝对定位
        position: 'absolute',
        bottom: 0,
    },

    bottomInnerViewStyle: {
        width: (width / 3) + 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.4)',

        justifyContent: 'center',
        alignItems: 'center',

        borderRightWidth: 1,
        borderRightColor: 'white'
    }
});








