import axios from "@/utils/request";
// /v1_0/user/channels

// 获取用户频道
export const getUserChannel = () =>
  axios({
    url: "/v1_0/user/channels",
    method: "GET",
  });

// 获取所有的频道
export const getAllChannel = () =>
  axios({
    url: "v1_0/channels",
    method: "GET",
  });

// 批量修改用户频道列表 /v1_0/user/channels
export const getChangeUserChannel = (channels) =>
  axios({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data: {
      channels: [channels],
    },
  });

// 删除用户频道
export const deleteUserChannel = (channelId) => {
  return axios({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};
