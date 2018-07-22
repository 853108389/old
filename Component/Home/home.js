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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
var Geolocation = require('Geolocation');  //引用定位连接
import Title from '../oldAdapter/oldTitle'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';
import { fetchParents, fetchAddMessage, asyncGetUser } from '../common/fetch'

import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import fetchQiniuUpload from '../common/uploadUtils'
import { getData, getParams } from '../common/messageUtils'
export default class Home extends Component {
  static defaultProps = {

  }; //


  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      content: "一键呼叫",
      flag: false,
      time: "",
      username: "颐泰公司",
      site: "南京邮电大学",
      on: false,
      telArr: [], //电话号
      //以下是录音功能
      currentTime: 0.0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath: AudioUtils.MusicDirectoryPath + '/test.aac',
      hasPermission: undefined,
    };
  }


  _renderData = () => {
    if (this.state.flag) {
      return (
        <View>
          <View style={{ flexDirection: "row", width: width }}>
            <View style={styles.leftStyle}>
              <Text style={{ fontSize: 20 }}>时间:</Text>
            </View>
            <View style={{ width: width * 0.8 }}>
              <Text style={{ fontSize: 20 }}>{this.state.time}</Text>
            </View>
            <TouchableOpacity style={{ position: "absolute", right: width * 0.07 }} onPress={() => { this._play() }}>
              <View >
                {this._renderIcon()}
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", width: width }}>
            <View style={styles.leftStyle}>
              <Text style={{ fontSize: 20 }}>角色:</Text>
            </View>
            <View style={{ width: width * 0.8 }}>
              <Text style={{ fontSize: 20 }}>{this.state.username}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", width: width }}>
            <View style={styles.leftStyle}>
              <Text style={{ fontSize: 20 }}>定位:</Text>
            </View>
            <View style={{ width: width * 0.8 }}>
              <Text style={{ fontSize: 20 }}>{this.state.site}</Text>
            </View>
          </View>
        </View>
      )
    } else {
      return null;
    }
  }

  _renderIcon = () => {
    if (!this.state.on) {
      return (
        <Icon
          name='md-volume-mute'
          size={30}
          style={styles.editIcon}
        />
      )
    } else {
      return (
        <Icon
          name='md-volume-up'
          size={30}
          style={styles.editIcon}
        />
      )
    }
  }

  render() {
    let imageArr = this.state.imageArr;
    return (
      <View style={styles.container}>
        <Title title="主页"></Title>
        <ScrollView>
          <View style={{ alignItems: "center", flex: 0.3, width: width, height: 150, borderColor: "red", borderWidth: 1, marginTop: 15 }}>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 20 }}> 呼叫记录</Text>
            </View>
            {this._renderData()}
          </View>
          <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
            <TouchableOpacity
              onPressIn={() => { this._pressIn() }}
              onPressOut={() => { this._pressOut() }}>
              <View style={{ justifyContent: "center", alignItems: "center", width: width * 0.8, height: width * 0.8, borderRadius: width * 0.8 / 2, backgroundColor: '#ffcc33', borderColor: "#ffff00" }}>
                <Text style={{ fontSize: 50 }}>{this.state.content}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View >
    );
  }
  _pressIn = () => {
    this.setState({
      content: "语音中..",
    })
    this._record();
  }

  _pressOut = () => {
    this._stop();
    if (this.state.currentTime < 1) {
      ToastAndroid.show('呼叫时间过短', ToastAndroid.SHORT);
      this.setState({
        content: "一键呼叫",

      })
      return;
    }
    this._postMessage();//发短信
    Geolocation.getCurrentPosition(val => {
      this.setState({
        longitude: val.coords.longitude, //经度
        latitude: val.coords.latitude,//纬度
        content: "一键呼叫",
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      }, () => {
        this.setState({
          flag: true
        });
        fetchQiniuUpload("file://" + this.state.audioPath).then((data) => {
          // alert(data);
          this._fetchAddMessage(this.state.longitude, this.state.latitude, data)
        }).catch((err) => {
          console.log(err)
          // alert(JSON.stringify(err))
        })
      })
    }, val => {
      ToastAndroid.show('获取坐标失败,查看是否打开gps定位', ToastAndroid.SHORT);
    });
  }
  //发短信
  _postMessage = () => {
    // this.getData();
    // "https://yun.tim.qq.com/v5/tlssmssvr/sendsms?sdkappid=1400076449&random=7226249334";
    let url = getParams().url;
    let params = getData(this.state.telArr[0]);
    console.log(params)
    request.post(url, params).then((data) => {
      // alert(JSON.stringify(data))
    })
  }

  _fetchAddMessage = (longitude, latitude, fileName) => {
    asyncGetUser().then((user) => {
      let params = {
        longitude: longitude,
        latitude: latitude,
        userId: user.id,
        fileName: fileName,
      }
      return params;
    }).then((params) => {
      // alert(JSON.stringify(params))
      fetchAddMessage(params).then((data) => {
        // alert(JSON.stringify(data))
        this.setState({
          // site: data.site,
          username: data.username,
          // fileName: data.fileName,
        })
      }).catch(err => alert(err))
    })
    // fetchAddMessage
  }

  //================================================================================
  //集成录音功能
  //================================================================================
  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    //=============
    asyncGetUser().then((user) => {
      console.log("111", user)
      return user.id
    }).then((id) => {
      fetchParents(id).then((data) => {
        let telArr = [];
        data.forEach((obj, i) => {
          telArr.push(obj.mobile_Num);
        })
        this.setState({
          telArr: telArr,
        })
      }).catch((err) => {
        // ToastAndroid.show('查找失败', ToastAndroid.SHORT);
      })
    })
    //========================
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) return;

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  // async _pause() {
  //   if (!this.state.recording) {
  //     console.warn('Can\'t pause, not recording!');
  //     return;
  //   }

  //   try {
  //     const filePath = await AudioRecorder.pauseRecording();
  //     this.setState({ paused: true });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async _resume() {
  //   if (!this.state.paused) {
  //     console.warn('Can\'t resume, not paused!');
  //     return;
  //   }

  //   try {
  //     await AudioRecorder.resumeRecording();
  //     this.setState({ paused: false });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, paused: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }
    this.setState({
      on: true,
    })
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            this.setState({
              on: false,
            })
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true, paused: false });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }


  _sound() {
    const s = new Sound('https://languagezenstorage.blob.core.windows.net/media0/xgcUXjHhP8.mp3', null, (e) => {
      if (e) {
        console.log('播放失败');
        return;
      }
      s.play(() => s.release());
    });
  }

}

const styles = StyleSheet.create({
  leftStyle: { width: width * 0.2, justifyContent: "center", alignItems: "center" },
  rowBlock: { paddingVertical: 10, justifyContent: "space-around", flexDirection: "row", width: width, borderBottomWidth: 1, borderColor: "black" },
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

