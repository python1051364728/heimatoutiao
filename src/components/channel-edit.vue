<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="编辑频道"></van-cell>
    <!-- 111我的频道标题 -->
    <van-cell title="我的频道">
      <template #default>
        <van-button
          @click="isEdit = !isEdit"
          round
          type="danger"
          size="mini"
          plain
          class="edit-btn"
        >
          <!-- 编辑 -->
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <!-- 我的频道宫格 -->
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in channel"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index != 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 222编辑频道标题 -->
    <van-cell title="编辑频道"> </van-cell>
    <!-- 编辑频道宫格 -->
    <van-grid direction="horizontal" :gutter="10">
      <van-grid-item
        icon="plus"
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        @click="addChannel(value)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannel,
  getChangeUserChannel,
  deleteUserChannel,
} from "@/api/channels";
import differenceBy from "lodash/differenceBy";
import { mapState } from "vuex";
import { setLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/canstans";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    channel: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      isEdit: false,
      allChannel: [],
    };
  },
  computed: {
    recommendChannels() {
      return differenceBy(this.allChannel, this.channel, "id");
    },
    ...mapState(["user"]),
    // recommendChannels() {
    //   return this.allChannel.filter(item => {
    //     return !this.channel.some(userChannel=>userChannel.id===item.id)
    //   })
    // }
  },
  watch: {},
  created() {
    this.getAllChannelList();
  },
  mounted() {},
  methods: {
    async getAllChannelList() {
      const res = await getAllChannel();
      // console.log(res);
      this.allChannel = res.data.data.channels;
    },
    async addChannel(channel) {
      this.channel.push(channel);
      if (this.user) {
        console.log("2");
        await getChangeUserChannel({
          id: channel.id,
          seq: this.channel.length,
        });
      } else {
        // 未登录，修改后的频道数据存储到本地存储
        setLocal(USERCHANNELKEY, this.channel);
      }
    },
    
    async deleteChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id);
        } else {
          setLocal(USERCHANNELKEY, this.channel);
        }
        this.$toast("删除成功");
      } catch (error) {
        this.$toast("删除失败");
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 处于编辑
        if (index === 0) return this.$notify("总要看点啥吧~");
        if (index <= this.active) {
          this.$emit("changeActive", this.active - 1, true);
        }
        this.channel.splice(index, 1);
        // 删除持久化
        this.deleteChannel(channel);
      } else {
        // 未编辑
        this.$emit("changeActive", index, false);
      }
    },
  },
};
</script>

<style scoped lang="less">
.edit-btn {
  width: 100px;
}

/deep/ .channel-item .van-grid-item__content {
  background-color: #f4f5f6;
}
.channel-item {
  .text {
    font-size: 2px;
    color: #222;
    margin-top: 0;
    &.active {
      color: red;
    }
  }
}
/deep/.van-icon-plus {
  font-size: 25px;
  margin-right: 5px;
}

/deep/.my-channel {
  .van-icon-clear {
    position: absolute;
    font-size: 28px;
    right: -10px;
    top: -10px;
    color: #cacaca;
    z-index: 99999;
  }
}
/deep/.van-grid-item__icon-wrapper {
  position: unset;
}
</style>
