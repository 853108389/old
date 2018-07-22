import React,{Component} from 'react';
import {StyleSheet,View,Text,Button} from 'react-native';
var Geolocation = require('Geolocation');  //要引用定位连接，否则会提示找不到对象，很多资料都没说到这一点。

export default class Localtion extends Component{
    constructor(props){
        super(props);
        this.state={
            LocalPosition:'',
        }
    };

    GetGeolocation(){
        /*
        说明：getCurrentPosition(fun_success,fun_error,geo_options)
        成功回调函数与失败回调函数的写法， 应该使用箭头函数方式，因为回调结果可以供当前页面的this所调用，否则当前页面使用不了。
        例：getCurrentPosition(function(val){ this.setState....  },function(val){ this.setState....})
        会提示未定义函数或找不到对像，错误位置为this.setState
        */
        Geolocation.getCurrentPosition(val => {
            let ValInfo = "速度：" + val.coords.speed +
                "\n经度：" + val.coords.longitude +
                "\n纬度：" + val.coords.latitude +
                "\n准确度：" + val.coords.accuracy +
                "\n行进方向：" + val.coords.heading +
                "\n海拔：" + val.coords.altitude +
                "\n海拔准确度：" + val.coords.altitudeAccuracy +
                "\n时间戳：" + val.timestamp;
            this.setState({LocalPosition: ValInfo});
        }, val => {
            let ValInfo = '获取坐标失败：' + val;
            this.setState({LocalPosition: ValInfo});
        });
    }

    render(){
        return(
            <View style={Style.container}>
                <Text numberOfLines={10} style={Style.text}>{this.state.LocalPosition}</Text>
                <Button onPress={this.GetGeolocation.bind(this)} title='获取坐标'/>
            </View>
        );
    }
}


const Style=StyleSheet.create({
    container:{flexDirection:'column',justifyContent:'center',margin:5,marginTop:20},
    text:{backgroundColor:'lightgray',justifyContent:'center'},
});