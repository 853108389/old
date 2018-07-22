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
  Dimensions,
  ScrollView,
  Image,
  WebView,
  ToastAndroid,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import moment from 'moment';
import Title from '../oldAdapter/oldTitle'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { historyList, asyncGetUser } from '../common/fetch'
import DataCell from './../Account/dataCell';
export default class HomeSon extends Component {
  static defaultProps = {

  }; //


  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      time: "2018-3-10 18:30:22",
      on: false,
      hisArr: [],
    };
  }

  componentDidMount() {
    asyncGetUser().then((user) => {
      return user.id
    }).then((id) => {
      historyList(id).then((data) => {
        this.setState({
          hisArr: data,
        })
      }).catch((err) => {
        alert(err)
        ToastAndroid.show('请求失败', ToastAndroid.SHORT);
      })
    })
  }

  _renderData = () => {
    let cellArr = [];
    this.state.hisArr.forEach((hisObj, i) => {
      cellArr.push(
        <DataCell hisObj={hisObj} key={i}> </DataCell>
      )
    })
    return cellArr;
  }


  render() {
    let imageArr = this.state.imageArr;
    return (
      <View style={styles.container}>
        <Title title="主页"></Title>
        <ScrollView>
          <View style={{ alignItems: "center", flex: 0.3, width: width, minHeight: height, borderColor: "red", borderWidth: 1 }}>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 25, color: "black" }}>老人求助记录</Text>
            </View>
            {this._renderData()}
          </View>
        </ScrollView>
      </View >
    );
  }

}

const styles = StyleSheet.create({
  leftImgStyle: {
    marginRight: 6,
    borderRadius: 12,
    backgroundColor: '#eee',
    width: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  topImgContainer: {
    width: width,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleView: {
    marginTop: 10,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white',
  },

});

