export const API = {
    // 认证
    LOGIN:'/api/login',
    PUBLIC_LOGIN:'/api/auth/login/public',
    REFRESH_TOKEN:'/api/auth/token',
    CHANGE_PASSWORD : '/api/auth/changePassword',
    CONFIRM_USER:'/api/confirm',

    // 用户
    USER:'/api/user',
    USERS:'/api/users',
    ADD_USER:'/api/adduser',
    UPDATE_USER:'/api/updateuser',

    // 房间
    ROOMS:'/api/rooms',
    ROOM:'/api/room',
    ADD_ROOM:'/api/addroom',
    UPDATE_ROOM:'/api/updateroom',
    //类别
    CATELOGS:'/api/catelogs',
    CATELOG:'/api/catelog',
    UPDATECATELOG:'/api/updatcatelog',
    ADDCATELOG:'/api/addcatelog',
    TEST:'/api/hello',

    //订单
    SUBSCRIBES:'/api/subscriptions',
    REFRESH_STATUS:'/api/refreshstatus',
    ADD_SUBSCRIBE:'/api/addsubscribe'
};
