/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    AsyncStorage,
    View,
    Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigator } from "react-native-deprecated-custom-components";
import DfyTabBar from '../commonView/DfyTabBar';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import config from '../common/config';
import request from '../common/request';
import Login from '../../login'
import Home from '../Home/home'
import Tool from "../Tool/tool"
import Community from '../Community/Community'
import Account from '../Account/account_son'
import HomeSon from './../Home/home_son';

export default class MainSon extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['首页', '工具', '我的'],
            tabIconNames: ['ios-home', 'ios-recording', 'ios-contact'],
            logined: false,
            //TODO: 假user
            user: {
                userBackimg: null,
                userNickname: "颐泰公司2",
                userAvatar: null,
            },
        };

        this._asyncGetAppStatus = this._asyncGetAppStatus.bind(this);
    }

    _asyncGetAppStatus() {
        AsyncStorage.getItem('user')
            .then(
            (data) => {
                let user;
                let newState = {};
                if (data) {
                    user = JSON.parse(data);
                }
                if (user && user.userAccesstoken) {
                    newState.logined = true;
                    newState.user = user;
                } else {
                    newState.logined = false;
                }
                this.setState(newState);
            })
            .catch((err) => {
                alert(err);
            });
    }

    componentDidMount() {
        this._asyncGetAppStatus();
    }


    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;

        if (!this.state.logined) {
            // alert('没登入')
            // return <Login afterLogin={this._afterLogin}/>
        }

        return (
            <View style={{ flex: 1, height: height, width: width, }}>
                <ScrollableTabView
                    renderTabBar={() => <DfyTabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
                    tabBarPosition='bottom'
                    locked={false}
                    initialPage={0}
                    prerenderingSiblingsNumber={1}
                    scrollWithoutAnimation={true}
                    onChangeTab={(obj) => {
                    }}
                >
                    <HomeSon tabLabel="home" navigator={this.props.navigator} user={this.state.user}></HomeSon>
                    <Tool tabLabel="tool" navigator={this.props.navigator}></Tool>
                    <Account tabLabel="account" navigator={this.props.navigator} logout={this._logout} user={this.state.user}></Account>
                    {/* <TestJson tabLabel="test" user={this.state.user}></TestJson> */}
                    {/* <TeamMemberBe tabLabel="test2" user={this.state.user}></TeamMemberBe> */}
                    {/* <TestUploadModel tabLabel="test" user={this.state.user}></TestUploadModel> */}
                    {/* <TestFileUpload tabLabel="test"  user={this.state.user}></TestFileUpload> */}
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

