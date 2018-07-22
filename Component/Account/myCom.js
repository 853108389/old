/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Title from './../oldAdapter/oldTitle';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import AddFam from './addFam';
import AddCom from './addCom';
import { fetchCommunity, asyncGetUser, delCommunity } from '../common/fetch'
import { ToastAndroid } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class UseHistory extends Component {
  static defaultProps = {
  }; //

  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      comObj: {
        name: "",
        tel: "",
      },
    };
  }

  fetchData = () => {
    asyncGetUser().then((user) => {
      return user.id
    }).then((id) => {
      fetchCommunity(id).then((data) => {
        if (data == 1) {
          return;
        }
        this.setState({
          comObj: data,
        })
      }).catch((err) => {
      })
    })
  }

  componentDidMount() {
    this.fetchData();
  }


  _confirmDelete = () => {
    Alert.alert('温馨提醒', '你确定要解除绑定吗吗?', [
      { text: '取消' },
      {
        text: '确定', onPress: () => {
          asyncGetUser().then((user) => {
            return user.id
          }).then((id) => {
            delCommunity(id).then((data) => {
              if (data == 1) {
                let comObj = {
                  name: "",
                  tel: "",
                };
                this.setState({
                  comObj: comObj,
                }, () => {
                  ToastAndroid.show('解除成功', ToastAndroid.SHORT);
                })
                this.fetchData();
                return;
              } else {
                ToastAndroid.show('解除失败', ToastAndroid.SHORT);
              }
            }).catch((err) => {
            })
          })
        }
      }
    ])
  }

  _pushAddCom() {
    let { navigator } = this.props;
    if (navigator) {
      navigator.push({
        name: 'AddCom',
        component: AddCom,
        params: {
        }
      })
    } else {
      alert('跳转失败')
    }
  }

  _renderView = () => {
    let cell = null;
    if (this.state.comObj.name == "") {
      cell = <TouchableOpacity onPress={() => { this._pushAddCom() }}>
        <View style={{ justifyContent: "center", alignItems: "center", height: 200, borderColor: "orange", borderWidth: 1, marginTop: 10 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Icon name={"ios-add-circle-outline"}
              size={80}
              style={styles.leftImgStyle}
            />
          </View>
        </View>
      </TouchableOpacity>
    } else {
      cell = <TouchableOpacity delayLongPress={1000} onLongPress={() => { this._confirmDelete() }}>
        <View style={{ justifyContent: "center", alignItems: "center", height: 200, borderColor: "orange", borderWidth: 1, marginTop: 10 }}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", }}>
              <View style={styles.left}>
                <Text style={{ fontSize: 20, }}>社区</Text>
              </View>
              <View style={styles.right}>
                <Text style={{ fontSize: 20, }}>{this.state.comObj.name}</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <View style={styles.left}>
                <Text style={{ fontSize: 20, }}>电话</Text>
              </View>
              <View style={styles.right}>
                <Text style={{ fontSize: 20, }}>{this.state.comObj.tel}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    }
    return cell;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Title title='我的社区' leftView={true} navigator={this.props.navigator}></Title>
          {this._renderView()}
          <View style={{ marginVertical: 10 }}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  right: { width: width * 0.6, justifyContent: "center", alignItems: "center" },
  left: { width: width * 0.4, justifyContent: "center", alignItems: "center" },
  rowBlock: { paddingVertical: 10, justifyContent: "space-around", flexDirection: "row", width: width, borderBottomWidth: 1, borderColor: "black" },
  container: {
    flex: 1,
    alignItems: 'center',
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
  leftImgStyle: {
    marginRight: 6,
    borderRadius: 12,
    width: 80,
    textAlign: 'center',
  },
});


