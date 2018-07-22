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
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import AddFam from './addFam';
import AddCom from './addCom';
const { width, height } = Dimensions.get('window');
import { fetchParents, asyncGetUser, unBindParents } from '../common/fetch'
export default class UseHistory extends Component {
  static defaultProps = {
  }; //

  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      familyArr: []
    };
  }

  _confirmDelete = (pId) => {
    Alert.alert('温馨提醒', '你确定要解除绑定吗吗?', [
      { text: '取消' },
      {
        text: '确定', onPress: () => {
          asyncGetUser().then((user) => {
            return user.id
          }).then((id) => {
            unBindParents(id,pId).then((data) => {
              this.setState({
                familyArr: [],
              })
              ToastAndroid.show('解除成功', ToastAndroid.SHORT);
              this.fetchData();
            }).catch((err) => {
              ToastAndroid.show('解除失败', ToastAndroid.SHORT);
            })
          })

        }
      }
    ])
  }


  _pushAddFam() {
    let { navigator } = this.props;
    if (navigator) {
      navigator.push({
        name: 'addFam',
        component: AddFam,
        params: {
        }
      })
    } else {
      alert('跳转失败')
    }
  }

  fetchData=()=>{
    asyncGetUser().then((user) => {
      return user.id
    }).then((id) => {
      fetchParents(id).then((data) => {
        this.setState({
          familyArr: data,
        })
      }).catch((err) => {
        // ToastAndroid.show('添加失败', ToastAndroid.SHORT);
      })
    })
  }
  componentDidMount() {
    this.fetchData();
  }

  _renderDataCell = () => {
    let familyArr = this.state.familyArr;
    let cellArr = [];
    familyArr.forEach((user, i) => {
      cellArr.push(
        <TouchableOpacity key={i} delayLongPress={1000} onLongPress={() => { this._confirmDelete(user.id) }}>
          <View style={{ justifyContent: "center", alignItems: "center", height: 200, borderColor: "orange", borderWidth: 1, marginTop: 10 }}>
            <View key={i} style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ flexDirection: "row", }}>
                <View style={styles.left}>
                  <Text style={{ fontSize: 20, }}>姓名</Text>
                </View>
                <View style={styles.right}>
                  <Text style={{ fontSize: 20, }}>{user.username}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 15 }}>
                <View style={styles.left}>
                  <Text style={{ fontSize: 20, }}>电话</Text>
                </View>
                <View style={styles.right}>
                  <Text style={{ fontSize: 20, }}>{user.mobile_Num}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>)
    })
    return cellArr;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Title title='我的家人' leftView={true} navigator={this.props.navigator}></Title>
          {this._renderDataCell()}
          <TouchableOpacity onPress={() => { this._pushAddFam() }}>
            <View style={{ justifyContent: "center", alignItems: "center", height: 200, borderColor: "orange", borderWidth: 1, marginTop: 10 }}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Icon name={"ios-add-circle-outline"}
                  size={80}
                  style={styles.leftImgStyle}
                />
              </View>
            </View>
          </TouchableOpacity>
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

