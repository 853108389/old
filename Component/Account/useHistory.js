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
  ToastAndroid,
} from 'react-native';
import DataCell from './../Account/dataCell';
import { historyList, asyncGetUser } from '../common/fetch'
const { width, height } = Dimensions.get('window');
import moment from 'moment';
export default class UseHistory extends Component {
  static defaultProps = {
  }; //

  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      // hisArr: [{
      //   site: "南京邮电大学",
      //   username: "",
      //   date: "2018-3-10 18:30:22",
      //   fileName: "",
      // }, {
      //   site: "南京邮电大学",
      //   username: "",
      //   date: "2018-3-11 12:11:28",
      //   fileName: "",
      // }, {
      //   site: "南京邮电大学",
      //   username: "",
      //   date: "2018-3-11 12:11:28",
      //   fileName: "",
      // }],
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
        //fileName
        // alert(JSON.stringify(this.state.hisArr))
      }).catch((err) => {
        ToastAndroid.show('加载失败', ToastAndroid.SHORT);
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

  // _renderData = () => {
  //   let cellArr = [];
  //   this.state.hisArr.forEach((hisObj, i) => {
  //     cellArr.push(<View style={styles.rowBlock} key={i}>
  //       <Text style={{ fontSize: 18 }}>{moment(hisObj.date).format('YYYY-MM-DD HH:mm:ss')}</Text>
  //       <Text style={{ fontSize: 18 }} numberOfLines={1}>{hisObj.site}</Text>
  //     </View>)
  //   })
  //   return cellArr;
  // }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Title title='历史记录' leftView={true} navigator={this.props.navigator}></Title>
          <View style={{ flex: 0.3, minHeight: height - 80, borderColor: "red", borderWidth: 1 }}>
            {this._renderData()}
          </View>
          <View style={{ marginVertical: 10 }}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowBlock: { paddingVertical: 10, borderBottomWidth: 1, borderColor: "black" },
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
});

AppRegistry.registerComponent('MyApp', () => MyApp);
