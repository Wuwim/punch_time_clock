<!--我的 -->
<template>
  <div class="content">
    <div class="summary">
      <div class="flex_between">
        <span class="month font_bold">二月汇总</span>
        <i class="iconfont icon-jiantou" @click="goSummary"></i>
      </div>
      <div class="flex_between count_box">
        <div class="flex_col flex_center">
          <span class="num font_bold">9</span>
          <span class="num_text">打卡次数</span>
        </div>
        <div class="flex_col flex_center">
          <span class="num font_bold">9</span>
          <span class="num_text">晚归次数</span>
        </div>
        <div class="flex_col flex_center">
          <span class="num font_bold">9</span>
          <span class="num_text">请假次数</span>
        </div>
      </div>
    </div>
    <div class="calendar">
      <div class="title flex_align">
        <span class="title_text">每日记录</span>
        <span class="title_month">(二月)</span>
      </div>
      <van-calendar
        :show-confirm="false"
        @confirm="onConfirm"
        :default-date="defaultDate"
        :min-date="minDate"
        :max-date="maxDate"
        :poppable="false"
        :show-title="false"
        :show-subtitle="false"
        :show-mark="false"
        first-day-of-week="1"
        row-height="40"
      />
      <div class="notes flex_center">
        <div class="spot color_blue"></div>
        <span class="text">正常</span>
        <div class="spot color_green"></div>
        <span class="text">异常</span>
        <div class="spot color_yellow"></div>
        <span class="text">晚归</span>
        <div class="spot color_purple"></div>
        <span class="text">夜不归宿</span>
      </div>
      <div class="clock_in_detail flex_row">
        <div class="spot"></div>
        <div class="detail_box">
          <div class="time_type flex_align">
            <span>已打卡 12:57</span>
            <span class="text_border">正常</span>
          </div>
          <div class="address">
            <i class="iconfont icon-dibiao"></i>
            浙江省宁波市镇海区庄市街道联兴家园很长很长很长很长很长长很长很长很长
          </div>
          <div class="address">
            <i class="iconfont icon-leftfont-02"></i>
            医院看病
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "date",
  data() {
    return {
      date: "",
      show: false,
      minDate: new Date(),
      maxDate: new Date(),
      defaultDate: new Date(),
      // dutyList: [],
      cont: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      nowDay: new Date().getDate(),
    };
  },
  created() {
    this.setMinMaxDay();
  },
  methods: {
    goSummary() {
      this.$router.push({
        path: "/statistics/summary",
      });
    },
    formatDate(date) {
      let months = date.getMonth() + 1;
      let days = date.getDate();
      if (months < 10) {
        if (days < 10) {
          return `${date.getFullYear()}.${"0" + months}.${"0" + days}`;
        } else {
          return `${date.getFullYear()}.${"0" + months}.${days}`;
        }
      } else {
        if (days < 10) {
          w;
          return `${date.getFullYear()}.${months}.${"0" + days}`;
        } else {
          return `${date.getFullYear()}.${months}.${days}`;
        }
      }
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
      //此处的putData是在父组件中监听的事件名称，即v-on：后面的名字，data就是需要往父组件传递的数据。
      // $emit("事件名称","传递参数1","传递的参数2"....)
      this.$emit("putData", this.date);
    },
    showPopup() {
      this.show = true;
    },
    // 设置显示月份可选择的天数区间
    setMinMaxDay() {
      let minYear = new Date(2021, 5, 15).getFullYear();
      let minMonth = new Date(2021, 5, 15).getMonth();
      let maxYear = new Date().getFullYear();
      let maxMonth = new Date().getMonth() + 1;
      let nowYear = this.defaultDate.getFullYear();
      let nowMonth = this.defaultDate.getMonth() + 1;
      if (maxYear == nowYear && nowMonth == maxMonth) {
        var firstDay = new Date(this.defaultDate);
        firstDay.setDate(1);
        this.minDate = new Date(nowYear, nowMonth - 1, firstDay.getDate());
        var endDate = new Date(this.defaultDate);
        endDate.setDate(new Date().getDate());
        this.maxDate = new Date(nowYear, nowMonth - 1, endDate.getDate());
      } else if (nowYear == minYear) {
        if (nowMonth == minMonth) {
          var firstDay = new Date(2021, 5, 15);
          firstDay.setDate(15);
          this.minDate = new Date(nowYear, nowMonth - 1, firstDay.getDate());
          var endDate = new Date(this.defaultDate);
          endDate.setMonth(this.defaultDate.getMonth() + 1);
          endDate.setDate(0);
          this.maxDate = new Date(nowYear, nowMonth - 1, endDate.getDate());
        } else {
          var firstDay = new Date(this.defaultDate);
          firstDay.setDate(1);
          this.minDate = new Date(
            this.year,
            this.month + this.cont,
            firstDay.getDate()
          );
          var endDate = new Date(this.defaultDate);
          endDate.setMonth(this.defaultDate.getMonth() + 1);
          endDate.setDate(0);
          this.maxDate = new Date(
            this.year,
            this.month + this.cont,
            endDate.getDate()
          );
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: rgba(244, 244, 244, 1);
}
/* .van-calendar__header-title {
		display: none;
	}
 */
.summary {
  margin: 15px;
  padding: 18px;
  background-color: #fff;
  border-radius: 11px;
  .month {
    font-size: 18px;
  }
  .count_box {
    margin-top: 20px;
    .num {
      font-size: 26px;
    }
    .num_text {
      margin-top: 4px;
      font-size: 13px;
      color: #9a9a9a;
    }
  }
  .font_bold {
    font-weight: bold;
  }
}
.calendar {
  margin: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 11px;
  .title {
    margin-bottom: 18px;
    .title_text {
      font-size: 18px;
      font-weight: bold;
      margin-right: 6px;
    }
    .title_month {
      font-size: 14px;
      color: #9a9a9a;
    }
  }
  ::v-deep .van-calendar__selected-day {
    border-radius: 50%;
    background-color: #018afb;
  }
  ::v-deep .van-calendar__header {
    box-shadow: none;
  }
  ::v-deep .van-calendar__month-title {
    display: none;
  }
  .notes {
    margin: 0px auto 20px;
    padding-top: 12px;
    border-top: 1px solid #c9c9c9;
    font-size: 13px;
    color: #8d8d8d;
    .spot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .color_blue {
      background-color: #018afb;
    }
    .color_green {
      background-color: #00bd83;
    }
    .color_yellow {
      background-color: #f69f17;
    }
    .color_purple {
      background-color: #6e2bc6;
    }
    .text {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .clock_in_detail {
    font-size: 13px;
    color: #8d8d8d;
    .spot {
      margin-top: 6px;
      margin-right: 20px;
      width: 11px;
      height: 11px;
      background-color: #8d8d8d;
      border-radius: 50%;
    }
    .detail_box {
      flex: 1;
    }
    .time_type {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      .text_border {
        font-size: 11px;
        margin-left: 8px;
        border: 1px solid #018afb;
        color: #018afb;
      }
    }
    .address {
      margin-bottom: 10px;
      word-break: break-all;
    }
  }
}
</style>