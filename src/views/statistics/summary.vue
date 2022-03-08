<!--我的 -->
<template>
  <div class="content">
    <div class="title flex_between">
      <div class="mouth_week flex_align">
        <span class="chose_time flex_center select_time">周</span>
        <span class="chose_time flex_center">月</span>
      </div>
      <div class="flex_row the_time">
        <i class="iconfont icon-zuojiantou1"></i>
        2022.01
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
    <div class="frequency_box">
      <div class="user_msg flex_center">
        <img class="head_img" src="../../images/head_img.png" alt="" />
        <div class="flex_1 flex_col">
          <span class="user_name">{{ info.name }}</span>
          <span class="user_id">{{ info.id }}</span>
        </div>
        <div class="flex_col flex_center clock_in_month_box">
          <i class="iconfont icon-rili"></i>
          <span class="clock_in_month">打卡月历</span>
        </div>
      </div>

      <van-collapse class="collapse" v-model="activeNames">
        <van-collapse-item title="打卡次数" name="1">
          <div
            class="flex_align"
            v-for="(items, index) in clockInList[0]"
            :key="'clockInList[0]' + clockInList[0]"
          >
            <div class="point"></div>
            {{ items.day }}
          </div>
        </van-collapse-item>
        <van-collapse-item title="晚归次数" name="2">
          <div
            class="flex_align"
            v-for="(items, index) in clockInList[1]"
            :key="'clockInList[1]' + clockInList[1]"
          >
            <div class="point"></div>
            {{ items.day }}
          </div>
        </van-collapse-item>
        <van-collapse-item title="请假次数" name="3">
          <div
            class="flex_align"
            v-for="(items, index) in clockInList[2]"
            :key="'clockInList[2]' + clockInList[2]"
          >
            <div class="point"></div>
            {{ items.day }}
          </div>
        </van-collapse-item>
        <van-collapse-item title="夜不归宿次数" name="4">
          <div
            class="flex_align"
            v-for="(items, index) in clockInList[3]"
            :key="'clockInList[3]' + clockInList[3]"
          >
            <div class="point"></div>
            {{ items.day }}
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      info: {
        name: "于庆伟",
        time: "",
        id: 2019080410,
      },
      clockInList: [
        [
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
        ],
        [
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
        ],
        [
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
        ],
        [
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
          { day: "2022-02-07（星期一）" },
        ],
      ],
    };
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.content {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(244, 244, 244, 1);
  overflow: scroll;
}
.title {
  padding: 15px;
  margin: 15px;
  border-radius: 11px;
  background-color: #fff;
  .mouth_week {
    border: 1px solid #018afb;
    border-radius: 3px;
    .chose_time {
      color: #018afb;
      padding: 5px 15px;
    }
    .select_time {
      color: #fff;
      background-color: #018afb;
    }
  }
  .the_time {
    width: 40%;
    justify-content: space-between;
  }
}
.frequency_box {
  margin: 15px;
  border-radius: 11px;
  background-color: #fff;
  .user_msg {
    .head_img {
      margin: 18px;
      width: 40px;
      height: 40px;
    }
    .user_name {
      margin-bottom: 6px;
      font-size: 16px;
      font-weight: 500;
    }
    .user_id {
      font-size: 12px;
    }
    .clock_in_month_box {
      margin-right: 15px;
    }
    .icon-rili {
      margin-bottom: 6px;
      font-size: 20px;
      color: #018afb;
    }
    .clock_in_month {
      font-size: 12px;
      color: #018afb;
      font-weight: 500;
    }
  }
  .collapse {
    ::v-deep .van-cell {
      font-size: 18px;
    }
    ::v-deep .van-collapse-item__content {
      font-size: 16px;
      color: #000000;
    }
    .point {
      margin-right: 8px;
      width: 11px;
      height: 11px;
      background-color: #8d8d8d;
      border-radius: 50%;
    }
  }
  ::v-deep .van-hairline--top-bottom::after {
    border-width: 0;
  }
  ::v-deep .van-cell::after {
    border-width: 0;
  }
}
</style>