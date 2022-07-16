<template>
  <div class="comment-reply">
    <van-nav-bar title="回复" @click-left="$emit('close')">
      <template #left>
        <van-icon color="white" name="cross"></van-icon>
      </template>
    </van-nav-bar>

    <commentItem :comment="currentComment"></commentItem>
    <commentList
      type="c"
      :list="list"
      :source="currentComment.com_id"
    ></commentList>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <commentPost
        @post-success="postSuccess"
        type="c"
        :target="currentComment.com_id"
      ></commentPost>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import commentPost from "./comment-post.vue";
import commentList from "./comment-list.vue";
import commentItem from "./comment-item.vue";
export default {
  name: "CommentReply",
  components: { commentItem, commentList, commentPost },
  props: {
    currentComment: {
      type: Object,
    },
  },
  data() {
    return {
      isPostShow: false,
      list: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postSuccess(comment) {
      this.list.unshift(comment)
      this.isPostShow = false;
      this.currentComment.reply_count++;
    },
  },
};
</script>
<style scoped lang="less">
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
