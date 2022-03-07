<template>
  <div class="content">
    <div v-if="type == 0" class="positioning_instructions flex_col">
      <span class="title"> 若打卡签到定位不正确，请按以下步骤检查： </span>
      <span class="list">
        1、尝试移动/WIFI网络切换，或重启手机再试，检查微信或易班版本是否最新，尝试升级版本；
      </span>
      <span class="list">
        2、检查手机是否开启了GPS定位功能；部分安卓手机自带模糊定位功能，检查该功能是否启用；
      </span>
      <span class="list">
        3、检查手机自带的【设置】，权限里是否有允许微信或易班访问手机地址；
      </span>
      <span class="list">
        4、打开微信当前位置或尝试发送一条当前位置信息查看是否定位准确，若不准确请先按以上方法修正定位或者联系微信客服解决；
      </span>
      <span class="list">
        5、若以上方法都无法解决或出现其他特殊情况，请截图（录视l频）并详细与相关辅导员教师说明等待处理。
      </span>
      <div @click="goBack" class="goback">返回</div>
    </div>
    <div v-if="type == 1" class="punch_in_rules flex_col">
      <span class="title"> 打卡时间： </span>
      <span class="list">
        周日、一、二、三、四，默认打卡时间：21:00-22:00，节假日除外。
      </span>
      <span class="title"> 异常打卡： </span>
      <span class="list">
        异常打卡为特殊情况打卡，打卡需说明缘由，结果将会同步给班主任、辅导员、学生处等相关教师。
      </span>
      <span class="title"> 打卡预警： </span>
      <span class="list">
        夜不归宿将会记入学生违规信息，多次夜不归宿将会受到学校处分，请按时打卡。
      </span>
      <div @click="goBack" class="goback">返回</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0, //0:定位说明 ; 1:打卡规则
    };
  },
  created() {
    this.type = this.$route.query.type;
  },
  mounted() {
    console.log(this.type);
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  font-size: 18px;
}
.positioning_instructions {
  margin: 0px 15px;
  .title {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .list {
    margin-top: 25px;
  }
}
.goback {
  margin: 30px auto 0px;
  padding: 12px 130px;
  font-size: 20px;
  color: #fff;
  background-color: #018afb;
  border-radius: 10px;
}
.punch_in_rules {
  margin: 0px 15px;
  .title {
    margin-top: 50px;
    font-size: 20px;
    font-weight: bold;
  }
  .list {
    margin-top: 5px;
  }
}
</style>