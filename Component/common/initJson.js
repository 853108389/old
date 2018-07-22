import {
    AsyncStorage,
} from 'react-native';
import DeviceStorage from "../common/deviceStorage"

/**
 * 初始化本地JSON
 */
export default class InitJson {
    static initJsonData = () => {
        DeviceStorage.get('activityEditInfo').then((value) => {
            if (value == null || value == "undefined" || JSON.stringify(value) == "{}") {
            }
        })
    }

    static cleanJsonData = () => {
        InitJson.initJsonData();
    }

    static reActivityEditInfo = () => {
    }
}
