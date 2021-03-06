/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class OldTabBar extends Component {
    static propTypes = {

        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合

        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标

    };  // 注意这里有分号


    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({ value }) {
    }


    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? "#ee735c" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={styles.tab} key={i}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.tabItem}>
                        <Icon
                            name={this.props.tabIconNames[i]} // 图标
                            size={45}
                            color={color} />
                        <Text style={{ color: color,fontSize:18 }}>
                            {this.props.tabNames[i]}
                        </Text>
                    </View>
                    {/* <Text style={{color:'red',fontSize:50,alignSelf:'center'}}>·</Text> */}
                </View>
            </TouchableOpacity >
        );
    }


}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 80,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },

});

