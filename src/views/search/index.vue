<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <searchResultVue
      :searchText="searchText"
      v-if="isResultShow"
    ></searchResultVue>

    <!-- 搜索联想建议 -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></SearchSuggestion>

    <!-- 搜索历史 -->
    <SearchHistory
      @deleteAll="searchHistorys = []"
      @onSearch="onSearch"
      :searchHistorys="searchHistorys"
      v-else
    ></SearchHistory>
  </div>
</template>

<script>
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchHistory from "./components/search-history.vue";
import searchResultVue from "./components/search-result.vue";
import { getLocal, setLocal } from "@/utils/storage";
import { HISTORYKEY } from "@/canstans";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, searchResultVue },
  props: {},
  data() {
    return {
      isResultShow: false,
      searchText: "",
      searchHistorys: getLocal(HISTORYKEY) || [],
    };
  },
  computed: {},
  watch: {
    // 监听到搜索历史记录变化,把最新的数据存储到本地
    // 获取默认值的时候,从本地存储获取数据
    searchHistorys(value) {
      setLocal(HISTORYKEY, value);
    },
  },
  created() {},
  methods: {
    async onSearch(value) {
      this.searchText = value;
      // 搜索结果页展示
      this.isResultShow = true;
      const index = this.searchHistorys.indexOf(value);
      if (index !== -1) {
        this.searchHistorys.splice(index, 1);
      }
      this.searchHistorys.unshift(value);
    },
    onCancel() {
      console.log("点击了取消");
    },
  },
};
</script>

<style scoped></style>
