
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    WebView,
    Modal,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { fetchComList, fetchHosList } from '../common/fetch'
import Title from '../oldAdapter/oldTitle'; //标题
import CommonCellImg from '../commonView/CommonCellImg';
import config from '../common/config';
import request from '../common/request';
import { TouchableOpacity } from 'react-native';


export default class Team extends Component {
    static defaultProps = {

    }; //


    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            selectId: "1",
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: true,//是否透明显示
            comArr: [{
                id: "1",
                name: "南京市栖霞区栖霞镇甘家巷社区",
                tel: "5567406",
                pos: "2.8km "
            }, {
                id: "2",
                name: "杉湖路社区",
                tel: "85863692",
                pos: "2.4km"
            }, {
                id: "3",
                name: "文澜院社区",
                tel: "8673801",
                pos: " 804m"
            }],
            hosArr: [{
                id: "1",
                name: "泰康仙林鼓楼医院",
                tel: "025-85358120",
                pos: "2.4km"
            }, {
                id: "2",
                name: "仙林医院(学思路)",
                tel: "025-85863175",
                pos: "3.2km"
            }, {
                id: "3",
                name: "栖霞社区卫生服务中心",
                tel: "025-85762155",
                pos: "3.3km"
            }]
        };
    }

    componentDidMount() {
        fetchComList().then((data) => {
            this.setState({
                comArr: data
            })
        }).catch(err => alert("A" + err))
        fetchHosList().then((data) => {
            this.setState({
                hosArr: data
            })
        })
    }

    renderDataCell = () => {
        let comArr = this.state.comArr;
        let cellArr = [];
        comArr.forEach((obj, i) => {
            cellArr.push(<TouchableOpacity key={i} onPress={() => {
                this.setState({
                    selectId: obj.id,
                    type: 0,
                }, () => {
                    this._openModal();
                });
            }}>
                <View style={styles.rowBlock}>
                    <Text style={{ fontSize: 20 }}>{obj.name}</Text>
                </View>
            </TouchableOpacity >)
        })
        return cellArr
    }

    renderDataCell2 = () => {
        let comArr = this.state.hosArr;
        let cellArr = [];
        comArr.forEach((obj, i) => {
            cellArr.push(<TouchableOpacity key={i} onPress={() => {
                this.setState({
                    selectId: obj.id,
                    type: 1,
                }, () => {
                    this._openModal();
                });
            }}>
                <View style={styles.rowBlock}>
                    <Text style={{ fontSize: 20 }}>{obj.name}</Text>
                </View>
            </TouchableOpacity >)
        })
        return cellArr
    }


    render() {
        let imageArr = this.state.imageArr;
        return (
            <View style={styles.container}>
                <Title title="社区"></Title>
                <ScrollView>
                    <View style={{ alignItems: "center", flex: 0.3, width: width, height: 250, borderColor: "red", borderWidth: 1, marginTop: 15 }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 20, color: "black" }}>社区列表</Text>
                        </View>
                        {this.renderDataCell()}
                    </View>
                    <View style={{ flex: 0.7, height: 250, alignItems: "center", borderColor: "red", borderWidth: 1, marginTop: 15 }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 20, color: "black" }}>医院列表</Text>
                        </View>
                        {this.renderDataCell2()}
                    </View>
                </ScrollView>
                {this.renderModal()}
            </View >
        );
    }


    renderModal = () => {
        return (<Modal
            animationType={this.state.animationType}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                this._closeModal()
            }}
            onShow={() => { }}
        >
            <View style={styles.modalContainer}>
                <View style={{ width: width / 1.5, height: height / 2, borderRadius: 5, backgroundColor: "#ccc", justifyContent: "center", alignItems: "center" }}>
                    {this.renderModalDetail()}
                </View>
            </View>
        </Modal>)
    }

    renderModalDetail = () => {
        let selectId = this.state.selectId;
        let type = this.state.type;
        let comArr = null;
        if (type == 0) {
            comArr = this.state.comArr;
        } else {
            comArr = this.state.hosArr;
        }
        let ret = null;
        ret = <Text style={{ fontSize: 20 }}>暂无数据</Text>
        comArr.forEach((obj, i) => {
            if (obj.id == selectId) {
                ret = (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 20 }}>名称:{obj.name}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 20 }}>电话:{obj.tel}</Text>
                        </View>
                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ fontSize: 20 }}>距离:{obj.pos}</Text>
                        </View>
                    </View>
                )
            }
        })
        return ret;
    }

    _closeModal() {
        this.setState({
            modalVisible: false
        })
    }

    _openModal() {
        this.setState({
            modalVisible: true
        })
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        alignItems: "center"
    },
    rowBlock: { alignItems: "center", marginVertical: 10, borderColor: "#ccc", borderBottomWidth: 1, width: width },
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

