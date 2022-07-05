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
