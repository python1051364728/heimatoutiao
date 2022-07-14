<template>
  <div class="home-container">
    <van-nav-bar fixed title="标题">
      <template #title>
        <van-button icon="search" class="search-btn" size="small" round to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs animated swipeable class="channel-tabs" v-model="active">
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <!-- 汉堡 -->
      <template #nav-right
        >标签 1
        <div @click="isShow01 = true">
          <TouTiaoIcon class="hamburger-btn" icon="gengduo"></TouTiaoIcon>
        </div>
      </template>
    </van-tabs>

    <!-- 弹出层结构 -->
    <van-popup
      close-icon-position="top-left"
      closeable
      style="height: 90%"
      position="bottom"
      v-model="isShow01"
    >
      <channelEdit
        @changeActive="onMyChannelClick"
        :active="active"
        :channel="channel"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import TouTiaoIcon from "@/components/TouTiaoIcon.vue";
import { getUserChannel } from "@/api/channels";
import ArticleList from "@/views/home/components/article-list.vue";
import channelEdit from "@/components/channel-edit.vue";
import { getLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/canstans";
export default {
  name: "HomePage",
  components: { TouTiaoIcon, ArticleList, channelEdit },
  props: {},
  data() {
    return {
      isShow01: false,
      active: 0,
      channel: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannelList();
  },
  mounted() {},
  methods: {
    async getUserChannelList() {
      // const res = await getUserChannel();
      // // console.log(res);
      // this.channel = res.data.data.channels;

      // 判断是否登录,本地存储是否有数据
      try {
        const token = this.$store.state.user?.token;
        let channels = getLocal(USERCHANNELKEY);
        if (token || !channels) {
          const res = await getUserChannel();
          channels = res.data.data.channels;
        }
        this.channel = channels;
      } catch (error) {
        // console.log(error);
        this.$toast("获取频道数据失败");
      }
    },
    onMyChannelClick(index, status) {
      this.active = index;
      this.isShow01 = status;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    width: 80%;
    .search-btn {
      width: 100%;
      background-color: #5babfb;
    }
  }
}

/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}

/deep/ .hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  /deep/ i.toutiao {
    font-size: 33px;
    color: red;
  }
}
.van-button--default {
  border: #5babfb;
}
</style>
