<template>
  <div class="content">
    <baidu-map
      class="map_box"
      :zoom="zoom"
      :center="center"
      @ready="handler"
      ak="qkbK7mOzwHOzc2ku9m42FMMyrPzhD68x"
    >
    </baidu-map>
    <div @click="reChockIn" class="reposition_box flex_align">
      <i class="iconfont icon-dingwei-1"></i>
      重新定位
    </div>
    <div v-show="abnormalChockIn" class="card_box">
      <div class="title flex_between">
        <img class="head_img" src="../images/head_img.png" alt="" />
        <div class="flex_1">
          <div class="flex_col">
            <span class="user_name">{{ info.name }}</span>
            <div class="flex_row">
              <span class="clock_in_time">打卡</span>
              <div class="view_rules flex_center" @click="goPromptText(0)">
                (查看规则)
              </div>
            </div>
          </div>
        </div>
        <div class="flex_col flex_center">
          <i class="iconfont icon-tongji"></i>
          <span class="clock_in_time">统计</span>
        </div>
      </div>
      <div class="current_location_box">
        <div class="flex_align">
          <span class="current_location">当前位置</span>
          <span
            class="current_location_blue current_location_small"
            @click="goPromptText(1)"
            >(定位说明)</span
          >
        </div>
        <span class="current_location_small">{{ currentLocation }}</span>
      </div>
      <div v-show="info.nightOutNum > 0" class="night_out_num flex_center">
        <span> 你已违反学校规定，</span
        ><span class="err_red">夜不归宿{{ info.nightOutNum }}次</span>
      </div>
      <div
        @click="clickIn"
        class="clock_in_btn flex_col flex_center"
        :class="{
          btn_grey: info.type == 1,
          btn_green: info.type == 2,
          btn_yellow: info.type == 3,
        }"
      >
        <span>{{ info.clockInTxet }}</span>
        <span class="now_time">{{ nowTime }}</span>
      </div>
      <div class="clock_status flex_center">
        <i
          class="iconfont"
          :class="{
            'icon-dui': info.clockStatusType == 1,
            'icon-gantanhao-yuankuang': info.clockStatusType == 2,
            'icon-shijian': info.clockStatusType == 3,
          }"
        ></i
        >{{ info.clockStatus }}
      </div>
    </div>
    <div v-show="!abnormalChockIn" class="card_box">
      <div class="current_location_box">
        <div class="flex_align">
          <span class="current_location">当前位置</span>
          <span class="current_location_blue current_location_small"
            >(定位说明)</span
          >
        </div>
        <span class="current_location_small">{{ currentLocation }}</span>
        <div class="flex_between uploader_picture">
          <span class="current_location">拍照</span>
          <van-field name="uploader">
            <template #input>
              <van-uploader v-model="uploader" :max-count="1" />
            </template>
          </van-field>
        </div>
        <span class="current_location">备注（必填）</span>
        <van-field
          class="leaving_message"
          v-model="leavingMessage"
          rows="1"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
      <div class="abnormal_chock_in">
        <span class="abnormal_chock_in_time">{{ nowTime }}</span
        >异常打卡
      </div>
    </div>
  </div>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  data() {
    return {
      center: { lng: 116.331398, lat: 39.897445 },
      zoom: 10, //必须写上,自己因为忘记写一直无法自动定位
      datetime: null, //时间定时器
      nowTime: "10:12:22", //当前签到时间
      gc: {}, //地理解析
      pt: "", // 我的签到位置
      Range: 500, //签到范围
      info: {
        name: "于庆伟",
        type: 0, //  按钮颜色控制   1:灰色;2:绿色;3:黄色;
        nightOutNum: 1, //夜不归宿次数
        clockInTxet: "打卡",
        clockStatusType: 1, //按钮下提示icon   1:勾;2:感叹号;3:时钟;
        clockStatus: "已进入打卡范围",
      },
      isOverRange: false, //是否超出签到范围
      currentLocation: "", //地址描述
      uploader: [], //上传异常打卡图片
      leavingMessage: "", //留言
      abnormalChockIn: true,
    };
  },
  components: {
    BaiduMap,
  },
  created() {},
  mounted() {
    this.datetime = setInterval(() => {
      this.setNowTimes();
    }, 1000);
  },
  methods: {
    handler({ BMap, map }) {
      let that = this;
      var point = new BMap.Point(116.331398, 39.897445); //创建定坐标

      map.centerAndZoom(point, 16); //// 初始化地图,设置中心点坐标和地图级别
      var geolocation = new BMap.Geolocation();
      this.gc = new BMap.Geocoder(); //创建地理编码器、
      var pointAttendance;
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(
        function (r) {
          if (r.accuracy == null) {
            alert("请您打开浏览器定位权限");
          }
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            map.panTo(r.point);
            console.log("您的位置：" + r.point.lng + "," + r.point.lat);
            point = new BMap.Point(r.point.lng, r.point.lat); // 获取自己的签到位置
            // 创建地理编码实例, 并配置参数获取乡镇级数据
            var myGeo = new BMap.Geocoder({ extensions_town: true });
            // 根据坐标得到地址描述
            myGeo.getLocation(
              new BMap.Point(r.point.lng, r.point.lat),
              function (result) {
                if (result) {
                  that.currentLocation =
                    result.addressComponents.province +
                    result.addressComponents.city +
                    result.addressComponents.district +
                    result.addressComponents.street +
                    result.addressComponents.streetNumber;
                } else {
                  alert("获取地址失败");
                }
              }
            );
            // 创建图标对象
            var myIcon = new BMap.Icon(
              "http://qn.zheskill.xyz/mark.png",
              new BMap.Size(24, 30),
              {
                anchor: new BMap.Size(16, 25),
              }
            );
            // 创建标注对象并添加到地图
            var marker = new BMap.Marker(point, { icon: myIcon });
            map.addOverlay(marker);

            // var circle = new BMap.Circle(
            //   new BMap.Point(that.center.lng, that.center.lat),
            //   500,
            //   {
            //     // 考勤地点范围
            //     strokeColor: "blue",
            //     strokeWeight: 2,
            //     strokeOpacity: 0.5,
            //   }
            // );
            // map.addOverlay(circle);
          } else {
            alert("failed" + this.getStatus());
          }
        },
        { enableHighAccuracy: true }
      );
    },
    // 重新定位
    reChockIn() {
      location.reload();
    },
    // 获取时间
    setNowTimes() {
      // 获取系统时间
      var d = new Date();
      this.nowTime =
        (d.getHours() >= 10 ? +d.getHours() : "0" + d.getHours()) +
        ":" +
        (d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes()) +
        ":" +
        (d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds());
      // 按钮状态判断开始
      var startTime = "16:00:00"; //当日签到开始时间
      var endTime = "18:00:00"; //当日签到结束时间
      if (this.nowTime <= startTime) {
        this.info.type = 1;
        this.info.clockInTxet = "打卡";

        this.info.clockStatusType = 3;
        this.info.clockStatus = "未到打卡时间暂时无法签到";
      } else if (this.nowTime >= startTime && this.nowTime <= endTime) {
        if (!this.isOverRange) {
          this.info.type = 2;
          this.info.clockInTxet = "异常打卡";
          this.info.clockStatusType = 2;
          this.info.clockStatus = "超出打卡范围";
        } else {
          this.info.type = 0;
          this.info.clockInTxet = "打卡";
        }
      } else {
        this.info.type = 3;
        this.info.clockInTxet = "晚归打卡";
      }
    },
    clickIn() {
      if (this.info.type == 1) {
        this.$toast("时间尚早，签到还未开始！");
      } else if (this.info.type == 2) {
        // this.$toast("异常签到成功，");
        this.abnormalChockIn = false;
      } else {
      }
    },
    goPromptText(type) {
      this.$router.push({
        path: "/promptText?type=" + type, //0:定位说明 ; 1:打卡规则
      });
    },
  },
  // 销毁页面之后清空定时器
  beforeDestroy() {
    if (this.datetime) {
      clearInterval(this.datetime);
    }
  },
};
</script>
<style lang="less" scoped>
.content {
}
.map_box {
  width: 100%;
  height: 40vh;
}
.reposition_box {
  position: absolute;
  left: 4vw;
  top: 30vh;
  padding: 5px 10px;
  font-size: 12px;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
  .icon-dingwei-1 {
    font-size: 18px;
    margin-right: 3px;
  }
}
.card_box {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 65vh;
  background-color: #fff;
  border-radius: 25px 25px 0 0;
}
// 用户信息栏
.title {
  margin: 20px;
  .head_img {
    margin-right: 13px;
    width: 40px;
    height: 40px;
  }
  .user_name {
    margin-right: 10px;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 500;
  }

  .clock_in_time {
    font-size: 12px;
    color: #8d8d8d;
  }
  .view_rules {
    color: #018afb;
    font-size: 11px;
  }
  .icon-tongji {
    font-size: 20px;
    margin-bottom: 4px;
  }
}
// 用户位置栏
.current_location_box {
  margin: 20px;
  padding: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);

  .current_location {
    margin-right: 6px;
    font-weight: 500;
  }
  .current_location_small {
    font-size: 12px;
  }
  .current_location_blue {
    color: #018afb;
  }
  .uploader_picture {
    margin: 20px 0;
    border-top: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
  }
  .van-cell {
    width: auto;
    // 改变选择框大小
    ::v-deep .van-uploader__upload {
      width: 50px;
      height: 50px;
      margin: 0;
      border-radius: 13px;
      background-color: #fff;
      border: 1px solid #c9c9c9;
    }
    // 改变相机icon颜色变黑
    ::v-deep .van-icon-photograph:before {
      color: #000;
    }
    // 改变上传图片框大小
    ::v-deep .van-uploader__preview-image {
      width: 50px;
      height: 50px;
      border-radius: 13px;
    }
    // 改变上传的图片margin问题
    ::v-deep .van-uploader__preview {
      margin: 0;
    }
    // 改变删除图片按钮样式
    ::v-deep .van-uploader__preview-delete {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -5px;
      right: -5px;
      border-radius: 50%;
    }
    // 改变删除图片查查icon位置
    ::v-deep .van-uploader__preview-delete-icon {
      top: 0px;
      right: -1px;
    }
  }
  .leaving_message {
    padding: 10px 0 0 0;
  }
}
// 夜不归宿警告
.night_out_num {
  font-size: 14px;
  margin-bottom: 20px;
  .err_red {
    color: #e20404;
  }
}
//签到按钮
.clock_in_btn {
  margin: auto;
  width: 146px;
  height: 146px;
  border-radius: 50%;
  font-size: 23px;
  color: #fff;
  background: linear-gradient(180deg, #00a7fb 0%, #0289fc 100%);
  box-shadow: 0px 5px 15px rgba(1, 149, 251, 0.3);
  .now_time {
    margin-top: 6px;
    font-size: 15px;
  }
}
.btn_grey {
  background: linear-gradient(180deg, #dddddd 0%, #aaaaaa 100%);
  box-shadow: 0px 5px 15px rgba(91, 91, 91, 0.3);
}
.btn_green {
  background: linear-gradient(180deg, #00d697 0%, #00c186 100%);
  box-shadow: 0px 5px 15px rgba(91, 91, 91, 0.3);
}
.btn_yellow {
  background: linear-gradient(180deg, #feba49 0%, #f59c11 100%);
  box-shadow: 0px 5px 15px #f6d49c;
}
.clock_status {
  margin-top: 30px;
  font-size: 14px;
  color: #9a9a9a;
  .icon-dui,
  .icon-gantanhao-yuankuang,
  .icon-shijian {
    margin-right: 4px;
    color: #03b957;
  }
  .icon-shijian {
    color: #9a9a9a;
  }
}
.abnormal_chock_in {
  margin: 80px 35px 0;
  border-radius: 10px;
  font-size: 18px;
  padding: 10px 0;
  color: #ffffff;
  background-color: #00bd83;
  text-align: center;
  .abnormal_chock_in_time {
    margin-right: 10px;
  }
}
/* 去掉百度地图logo--begin */
::v-deep .BMap_cpyCtrl {
  display: none;
}
::v-deep .anchorBL {
  display: none;
}
/* 去掉百度地图logo--end */
</style>