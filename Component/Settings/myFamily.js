/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Title from '../commonView/title';
import SearchModal from '../commonView/searchModal';
import Icon from 'react-native-vector-icons/Ionicons';
export default class MyApp extends Component {
    static defaultProps = {
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
        };
    }
    _setModalProps = () => {
        let a = this.refs.searchModal;
        a._setModalVisible(true);
    }
    render() {
        return (
            <View >
                <Title title='我的家人' leftView={true} navigator={this.props.navigator} rightSearchView={true} rightClick={() => { this._setModalProps() }}></Title>
                <View>
                    {/* <Text>已添加的</Text> */}
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Icon name='ios-add'
                        size={25}
                    />
                </View>
                <SearchModal searchField="activity_name" title='搜索' ref='searchModal' searchInfoCallBack={(searchInfo, key, lable) => { this._pushCommonSearchList(searchInfo, key, lable) }}></SearchModal>
            </View>
        );
    }

    _pushCommonSearchList = (searchInfo, key, lable) => {
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'commonSearchList',
                component: CommonSearchList,
                params: {
                    content: lable,
                    dataKey: key,
                    value: searchInfo,
                    searchField: "activity_name",
                    dataUrl: config.uri.activity + config.activity.conditions,
                    searchType: "activity",
                }
            })
        } else {
            alert("searchInfo err")
        }
    }

}

const styles = StyleSheet.create({
});

