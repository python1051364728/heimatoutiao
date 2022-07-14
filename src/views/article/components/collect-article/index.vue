<template>
  <van-icon
  @click="changeCollected"
  :loading="loading"
    :color="isCollected ? 'red' : ''"
    :name="isCollected ? 'star' : 'star-o'"
  />
</template>

<script>
import {addCollect,deleteCollect} from '@/api/article'
export default {
  name: "collectArticle",
  model: {
    prop: "isCollected",
    event: "changeCollected",
  },
  props: {
    isCollected: {
      type: Boolean,
    },
    artId: {
      type:[String,Number]
    }
  },
  data() {
    return {
      loading:false
    }
  },
  methods: {
    async changeCollected() {
      this.loading = true
      if (this.isCollected) {
        // 收藏就取消收藏
       await deleteCollect(this.artId)
      } else {
        // 未收藏就收藏
        await addCollect(this.artId)
      }

      this.$emit('changeCollected', !this.isCollected)
      this.$toast(this.isCollected ? '取消收藏成功' : '收藏成功')
      this.loading = false
    }
  }
};
</script>

<style scoped lang="less"></style>
