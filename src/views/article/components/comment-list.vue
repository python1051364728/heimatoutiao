<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了,点击重新加载"
    >
      <!-- <van-cell :title="item.content" v-for="item in list" :key="item.id" /> -->
      <commentItem :title="item.content" v-for="(item,index) in list" :key="index" :comment="item"></commentItem>
    </van-list>
    <!-- 评论列表 -->
    
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import commentItem from '@/views/article/components/comment-item.vue'
export default {
  name: "ArticleComment",
  components: {
    commentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false,
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a", //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id,【可能有大数字，所以执行一下toString 方法】
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });
        console.log(res);
        this.list.push(...res.data.data.results);
        this.loading = false;

        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
