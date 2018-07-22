/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Title from '../oldAdapter/oldTitle';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { fetchFirstAidDetail, fetchHealthDetail } from '../common/fetch'
export default class KnowDetail extends Component {
    static defaultProps = {
        id: "",
        selectType: "",
        title: "",
    }; //

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            article: {
                id: this.props.id,
                type: this.props.type,
                title: this.props.title,
                content: "文字",
            },
            content: "",
        };
    }
    componentDidMount() {
 
        this.getContent();
    }


    getContent = () => {
     
        if (this.props.selectType == "1") {
            //养生
            fetchHealthDetail(this.props.id).then((data) => {
                let arr = data.content.split("#");
                let content = arr.reduce((c1, c2) => "\t"+c1 + "\n\t" + c2);
                this.setState({
                    content: content,
                })
            })
        } else {
            fetchFirstAidDetail(this.props.id).then((data) => {
                let arr = data.content.split("#");
                let content = arr.reduce((c1, c2) => "\t"+c1 + "\n\t" + c2);
                this.setState({
                    content: content,
                })
            })
        }
    }

    render() {
        let arc = this.state.article;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Title title={arc.title} leftView={true} navigator={this.props.navigator}></Title>
                    <View style={{ minHeight: height - 100, borderRadius: 10, borderWidth: 1, borderBottomColor: "#eee", flex: 1, marginTop: 5, marginHorizontal: 5 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                            <Text style={{ fontSize: 35, color: "black", }}>{arc.title}</Text>
                            <View style={{ position: "absolute", right: 20, bottom: 0 }}>
                                <View style={{ backgroundColor: "rgba(255,0,0,0.2)", borderRadius: 5, padding: 2, }}>
                                    <Text style={{ fontSize: 15 }}>{arc.type == 1 ? "养生知识" : "急救知识"}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ textAlign: "left", fontSize: 25 }}>
                                {this.state.content}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 30 }}>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('MyApp', () => MyApp);
