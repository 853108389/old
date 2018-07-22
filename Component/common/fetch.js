import config from '../common/config';
import request from '../common/request';
import DeviceStorage from '../common/deviceStorage';
import { creatFormData } from './fetchUtils'

/**
 * 用户呼叫历史
 * @param {} userId 
 */
function historyList(userId) {
    let url = config.yitai.base + config.yitai.history + "/" + userId;
    return request.post(url, {})
}
/**
 * 注册
 * @param {} tel 
 * @param {*} password 
 * @param {*} userType 
 */
function fetchRegister(tel, password, userType) {
    //更新自己的服务器
    let url = config.yitai.base + config.yitai.register;
    return request.post(url, {
        mobile_Num: tel,
        password: password,
        userType: userType,
    })
}
/**
 * 
 *一键呼叫发送信息
 */
function fetchAddMessage(params) {
    let url = config.yitai.base + config.yitai.updateHis;
    return request.post(url, params)

}
/**
 * 绑定社区
 * @param {} userId 
 * @param {*} comName 
 */
function bindCommunity(userId, comName) {
    let url = config.yitai.base + config.yitai.registerComm + "/" + userId;
    return request.post(url, { name: comName })
}

/**
 * 解除社区绑定
 * @param {用户id} userId 
 */
function delCommunity(userId) {
    let url = config.yitai.base + config.yitai.delCommunity + "/" + userId;
    return request.post(url, {})
}

/**
 * 查找当前用户的社区
 */
function fetchCommunity(userId) {
    let url = config.yitai.base + config.yitai.getCommunity + "/" + userId;
    return request.post(url, {})
}
/**
 * 查找当前用户的家人
 * @param {当前用户id} userId 
 */
function fetchParents(userId) {
    let url = config.yitai.base + config.yitai.getFamily + "/" + userId;
    return request.post(url, {})
}

/**
 * 解除用户绑定
 * @param {用户id} userId 
 */
function unBindParents(userId, parentId) {
    let url = config.yitai.base + config.yitai.unBindParents + "/" + userId + "/" + parentId;
    return request.post(url, {})
}
/**
 * 确认用户名密码
 * @param {} userId 
 * @param {*} password 
 */
function fetchConfirmPw(userId, password) {
    let url = config.yitai.base + config.yitai.confirmPw + "/" + userId;
    return request.post(url, { password: password })
}

/**
 * 修改密码
 * @param {*} userId 
 * @param {*} password 
 */
function fetchEditPw(userId, oldPw, newPw) {
    let url = config.yitai.base + config.yitai.editPw + "/" + userId;
    return request.post(url, { oldPw: oldPw, password: newPw })
}

/**
 * 绑定用户信息
 * @param {当前用户id} userId 
 * @param {被绑定的用户信息} user 
 */
function bindParents(userId, findUserId) {
    let url = config.yitai.base + config.yitai.bindParents + "/" + userId + "/" + findUserId;
    return request.post(url, {})
}

/**
 * 查找用户信息
 * @param {用户id} userId 
 */
function fetchUserByNameAndTel(userName, mobile_Num) {
    let url = config.yitai.base + config.yitai.getUser;
    return request.post(url, { userName: userName, mobile_Num: mobile_Num })
}
/**
/**
 * 查找用户详细信息
 * @param {用户id} userId 
 */
function fetchUserInfo(userId) {
    let url = config.yitai.base + config.yitai.userInfo + "/" + userId;
    return request.post(url, {})
}
/**
 * 更新用户信息
 * @param {用户} user 
 */
function updateUserInfo(userId, user) {
    let url = config.yitai.base + config.yitai.updateInfo + "/" + userId;
    return request.post(url, user)
}
/**
 * 社区列表
 */
function fetchComList() {
    let url = config.yitai.base + config.yitai.communityList;
    return request.post(url, {})
}

function fetchHosList() {
    let url = config.yitai.base + config.yitai.hospitalList;
    return request.post(url, {})
}
/**
 * 养生列表
 */
function fetchHealthList() {
    let url = config.yitai.base + config.yitai.healthList;
    return request.post(url, {})
}
/**
 * 急救列表
 */
function fetchFirstAidList() {
    let url = config.yitai.base + config.yitai.firstAidList;
    return request.post(url, {})
}
/**
 * 养生详细
 * @param {*} id 
 */
function fetchHealthDetail(id) {
    let url = config.yitai.base + config.yitai.healthDetail + "/" + id;
    return request.post(url, {})
}
/**
 * 急救详细
 * @param {*} id 
 */
function fetchFirstAidDetail(id) {
    let url = config.yitai.base + config.yitai.firstAidDetail + "/" + id;
    return request.post(url, {})
}
/**
 * 获取本地用户信息
 */
function asyncGetUser() {
    return DeviceStorage.get("user")
}
export {
    fetchRegister, fetchAddMessage, asyncGetUser, fetchComList,
    fetchHosList, fetchHealthList, fetchFirstAidList, fetchHealthDetail,
    fetchFirstAidDetail, fetchUserInfo, updateUserInfo, bindParents,
    fetchUserByNameAndTel, fetchCommunity, fetchParents, bindCommunity, historyList,
    delCommunity, unBindParents, fetchEditPw, fetchConfirmPw
}
