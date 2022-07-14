<template>
  <div>
    <!-- 搜索历史操作 -->
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeletStatus">
          <van-tag @click="deleteAll" class="btn" type="danger"
            >全部删除</van-tag
          >
          <van-tag @click="isDeletStatus = false" class="btn" type="success"
            >完成</van-tag
          >
        </template>
        <van-icon @click="isDeletStatus = true" v-else name="delete"></van-icon>
      </template>
    </van-cell>

    <!-- 搜索历史列表 -->
    <van-cell
      v-for="(item, index) in searchHistorys"
      :key="index"
      :title="item"
      @click="clickHistoryItem(item, index)"
    >
      <template v-if="isDeletStatus" #default>
        <van-icon name="close"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistorys: Array,
  },
  data() {
    return {
      isDeletStatus: false,
    };
  },
  methods: {
    deleteAll() {
      this.$emit("deleteAll");
    },
    clickHistoryItem(item, index) {
      if (this.isDeletStatus) {
        this.searchHistorys.splice(index, 1);
      } else {
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
