import axios from "@/utils/request";

export const getArticles = (params) =>
  axios({
    url: "/v1_0/articles",
    params,
  });

// 获取频道的文章列表
export const getArticleById = articleId => {
  return axios({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}


/**
 * 收藏文章
 */
 export const addCollect = target => {
  return axios({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

/**
 * 点赞
 */
 export const addLike = articleId => {
  return axios({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLike = articleId => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}
