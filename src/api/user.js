import axios from "@/utils/request";
// 获取登录接口
export const login = (data) =>
  axios({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });

// 获取验证码接口
export const getCode = (mobile) =>
  axios({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "GET",
  });

// // 需求:获取用户资料//
// my/index.vue封装请求的方法，created钩子内部进行调用//接口>>需要权限
// headers: { Authorization: 'Bearer token '}

// 获取用户个人信息
export const getUserInfo = () =>
  axios({
    url: "/v1_0/user",
    method: "GET",
  });

/**
 * 添加关注
 */
 export const addFollow = userId => {
  return axios({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取当前登录用户的个人资料
 */
 export const getUserProfile = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新用户资料
 */
 export const updateUserProfile = data => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
