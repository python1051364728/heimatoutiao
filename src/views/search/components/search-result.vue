<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, //
        q: this.searchText,
      });
      // console.log(res);
      this.list = [...this.list, ...res.data.data.results];
      this.loading = false;

      if (res.data.data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
