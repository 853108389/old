import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils as AudioUtil } from 'react-native-audio';
import moment from 'moment';
export default class AudioUtils {
    constructor() {
        this.audioPath = "";
    }

    /**
     * 设置录音文件的格式,路径等基本参数
     * @param {} audioPath 
     */

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    /**
     * 检查权限
     */
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
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }


    init(onProgressCallBack, onFinishRecordingCallBack, fileName) {
        return this._checkPermission().then((hasPermission) => {
            if (!hasPermission) return false;

            this.prepareRecordingPath(AudioUtil.MusicDirectoryPath + fileName);
            AudioRecorder.onProgress = (data) => {
                onProgressCallBack(data);
            };

            AudioRecorder.onFinished = (data) => {
                onFinishRecordingCallBack(data);
            };
            return true;
        });
    }


    async pause() {
        try {
            const filePath = await AudioRecorder.pauseRecording();
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async resume() {
        try {
            await AudioRecorder.resumeRecording();
        } catch (error) {
            console.error(error);
        }
    }

    async stop() {
        try {
            const filePath = await AudioRecorder.stopRecording();
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async play() {
        setTimeout(() => {
            var sound = new Sound(audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }

    async record() {

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    getAudioUploadPath() {
        return "file://" + this.audioPath;
    }

    getAudioPath() {
        return this.audioPath;
    }


    _playOnline(path) {
        //'https://languagezenstorage.blob.core.windows.net/media0/xgcUXjHhP8.mp3'
        const s = new Sound(path, null, (e) => {
            x
            if (e) {
                console.log('播放失败');
                return;
            }
            s.play(() => s.release());
        });
    }
}


