<template>
  <div class="article-item">
    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image class="imgyi" :src="article.cover.images[0]" />
      </template>

      <template #label>
        <div class="imgSan" v-if="article.cover.type === 3">
          <van-image
            class="img"
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <div class="pinlun">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.imgyi {
  width: 200px;
  height: 200px;
}
.imgSan {
  display: flex;
  // justify-items: space-between;
  // flex-direction: ;
  justify-content: space-between;
  .img {
    width: 200px;
    height: 200px;
  }
}
.pinlun {
  span {
    margin-right: 20px;
  }
}
</style>
