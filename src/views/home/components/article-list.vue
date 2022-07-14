<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="SuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了，点击重新加载~"
      >
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item/index.vue";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      SuccessText: "更新了10条数据",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 加载数据
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        // console.log(res);
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;

        // 数据已经请求完了
        if (res.data.data.results.length === 0) {
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (error) {
        this.loading = false;
        this.error = true;
      }
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },

    // 下拉刷新请求数据
    async onRefresh() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      // console.log(res);
      this.list = [...res.data.data.results, ...this.list];
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
