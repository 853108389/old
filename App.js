import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  BackHandler,
  ToastAndroid,
  AsyncStorage,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Navigator } from "react-native-deprecated-custom-components";
import Login from './login';
const { width, height } = Dimensions.get('window');
import Main from './Component/Main/Main'
import MainSon from './Component/Main/Main_son'
// import InitJson from './Component/common/initJson'
// import MyStorage from './Component/common/myStorage';
// import SplashScreen from 'react-native-splash-screen'
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logined: false,
      user: null,
      name: '',
    };

    this._asyncGetAppStatus = this._asyncGetAppStatus.bind(this);

  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentDidMount() {
    // SplashScreen.hide();
    // InitJson.initJsonData();
    // let storage = MyStorage.init();
    // global.storage = storage;
    this._asyncGetAppStatus();
  }

  _asyncGetAppStatus() {
    let name;
    AsyncStorage.getItem('user')
      .then((data) => {
        let user;
        let newState = {};
        if (data) {
          user = JSON.parse(data);
        }
        if (user) {
          if (user.userType == 0) {
            //老人
            name = 'main'
          } else {
            //子女
            name = 'mainSon'
          }
          newState.logined = true;
          newState.user = user;

        } else {
          //没登入
          newState.logined = false;
          name = 'login'
        }
        this.setState({
          ...newState,
          name: name,
        });
        // alert(this.state.name)
      })
      .catch((err) => {
        // alert(err);
      });
  }


  render() {
    let name = this.state.name;
    if (name == '') {
      return <View style={styles.container}><Text>...</Text></View>
    }
    if (name === 'main') {
      return (
        <Navigator
          style={{ width: width, height: width }}
          ref="navigator"
          initialRoute={{ name: 'main', component: Main }}
          //配置场景
          configureScene=
          {
            (route) => {
              return ({
                ...Navigator.SceneConfigs.PushFromRight,
                gestures: null
              });
            }
          }
          renderScene={
            (route, navigator) => {
              let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
            }
          } />
      );
    } else if (name === 'mainSon') {
      return (
        <Navigator
          style={{ width: width, height: width }}
          ref="navigator"
          initialRoute={{ name: 'mainSon', component: MainSon }}
          //配置场景
          configureScene=
          {
            (route) => {
              return ({
                ...Navigator.SceneConfigs.PushFromRight,
                gestures: null
              });
            }
          }
          renderScene={
            (route, navigator) => {
              let Component = route.component;
              return <Component  {...route.params} navigator={navigator} />
            }
          } />
      );
    } else if (name === 'login') {
      return (
        <Navigator
          style={{ width: width, height: width }}
          ref="navigator"
          initialRoute={{ name: 'login', component: Login }}
          //配置场景
          configureScene=
          {
            (route) => {
              return ({
                ...Navigator.SceneConfigs.PushFromRight,
                gestures: null
              });
            }
          }
          renderScene={
            (route, navigator) => {
              let Component = route.component;
              return <Component  {...route.params} navigator={navigator} />
            }
          } />
      );
    }
  }

  onBackAndroid = () => {
    const navigator = this.refs.navigator;
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 1) {
      navigator.pop();
      return true;//接管默认行为
    } else {
      //到了主页了
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
    // return false;//默认行为
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

