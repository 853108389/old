'use strict'
/**
 * 1.配置uri
 * 2.feth 的post请求头
 */
const temp = {
    base2: 'http://139.224.118.25:8080/',
    base1: 'http://10.164.0.153:8080/sos/',

}
const config = {
    yitai: {
        // base: 'http://192.168.253.10:8080/',//颐泰
        base: 'http://139.224.118.25:8080/',//颐泰
        // ws: "ws://192.168.253.10:8080/test/1",
        ws: "ws://139.224.118.25:8080/test/1",
        login: 'login',
        register: 'register',
        updateHis: "updateHis",
        communityList: "community",
        hospitalList: "hospital",
        healthList: "health",
        firstAidList: "first_aid",
        healthDetail: "health_content",
        firstAidDetail: "first_aid_content",
        userInfo: "userInfo",
        updateInfo: "updateInfo",
        getUser: "getUser",
        bindParents: "bindParents",
        getFamily: "getFamily",
        registerComm: "registerComm",
        getCommunity: "getCommunity",
        delCommunity: "unlockComm",
        history: "history",
        unBindParents: "unlockPar",
        confirmPw: "confirmPw",
        editPw: "editPw",
    },
    imgUrl: {//七牛服务器域名
        // base: 'http://geoweb.njupt.edu.cn/',//正式域名
        base: 'http://oxnbmu2mx.bkt.clouddn.com/',//测试域名
        ak: 'DT66l5FkxNivhSD0zJKjXr_WccNtZwS4cppxlIzy',//TODO 服务器获取 记得删除
        sk: 'jb8s3PfQVCRzp_LYG33_QHJ1ozN2krdaH7bNKkTF',//TODO 服务器获取 记得删除
        host: "http://up-z2.qiniu.com",//华南服务器
        bucket: "niangao-sos",//空间
    },
    // messageUrl:{//腾讯云服务域名
    //     sendUrl :"https://yun.tim.qq.com/v5/tlssmssvr/sendsms?",
    //     sdkappid:"1400076449",
    // },
    api: {
        base: 'http://rap.taobao.org/mockjs/7756/',
        list: 'api/list',
        up: 'api/up',
        comments: 'api/comments',
        comment: 'api/comment',
        signup: 'api/user/signup',
        verify: 'api/user/verify',
        signature: 'api/signature',
        update: 'api/user/update',

    },
    map: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        follow: 20,
        timeout: 8000,
        size: 0,
    },
    multiMap: {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        follow: 20,
        timeout: 8000,
        size: 0,
    },
    //api
    uri: {
        base: temp.base2,
        user: temp.base2 + 'user/',
        test: temp.base2 + 'test/',
        team: temp.base2 + 'team/',
        activity: temp.base2 + 'activity/',
        comment: temp.base2 + "comment/",
        image: temp.base2 + "image/",
    },
    user: {
        detail: 'detail.do',
        login: 'login.do',
        logout: 'logout.do',
        userVo: 'userVo.do',
        userTeams: 'userTeams.do',
        update: 'update.do',//更新 CMVO形式
        update2: "update2.do",//更新 bean形式
        allMs: 'allMs.do', //所有消息
        readMs: "readMs.do",//已读消息
        hasNewMs: "hasNewMs.do",//是否有新消息
        addMs: "addMs.do",//添加消息
        delMs: "delMs.do",//删除消息
        hideInfo: "hideInfo.do",//是否隐藏个人信息
        findByStuNo: "findByStuNo.do",//根据学号查找用户
        addFb: "addFb.do",//添加反馈
        editPw: "editPw.do",//修改密码
        confirmPw: "confirmPw.do",//确认密码
    },
    test: {
        test: 'testJson.do',
    },
    team: {
        detail: 'detail.do',
        update: "update.do",//更新社团详细信息Vo
        update2: "update2.do",//更新社团详细信息Bean
        detailVo: 'detailVo.do',
        teamUsers: "teamUsers.do",
        teamDepUsers: "teamDepUsers.do",//某个部门里的所有用户
        teamUserType: "teamUserType.do",//社团用户权限
        activity: 'activity.do',
        all: "allVo.do",
        allOrderBy: "allOrderBy.do",
        key: "key.do",
        conditions: "conditions.do",
        teamDeps: "teamDeps.do",//查询某社团所有部门名字
        updateTeamUser: "updateTeamUser.do",//更新社团用户的级别或部门
        updateDepName: "updateDepName.do",//更新社团部门名称
        addTeamUser: 'addTeamUser.do',//添加部门等 
        delTeamUser: "delTeamUser.do",//删除社团里的用户
        addTeamUser2: "addTeamUser2.do",//逻辑添加 
        add: "add.do",//添加一个新的社团
        add2: "add2.do",//逻辑添加新的社团
    },
    activity: {
        all: 'all.do',
        detailVo: 'detailVo.do',
        comments: "comments.do",
        conditions: "conditions.do",
        add: "add.do",
        mac: "mac.do",
        up: "up.do",//点赞
        isup: "isup.do",//是否点过赞
    },
    comment: {
        add: "add.do",
        conditions: "conditions.do",
    },
    image: {
        mac: "mac.do",
    },
    other: {
        mainScroll: "scroll/mainScroll.do"
    }

}
/**
 * 消息类型
 * 100 用户被社团邀请
 * 101 用户退出社团
 * 102 用户申请社团
 * 
 * 200 社团邀请用户
 * 201 社团踢出用户
 * 202 社团发布活动
 */



module.exports = config