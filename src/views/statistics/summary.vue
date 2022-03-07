<!--我的 -->
<template>
  <div class="content">
    <div class="title flex_between">
      <div class="mouth_week flex_align">
        <span class="chose_time flex_center">周</span>
        <span class="chose_time flex_center">月</span>
      </div>
      <div class="flex_align">
        <i class="iconfont icon-zuojiantou1"></i>
        2022.02
        <i class="iconfont icon-jiantou"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "date",
  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background-color: rgba(244, 244, 244, 1);
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
  }
}
</style>