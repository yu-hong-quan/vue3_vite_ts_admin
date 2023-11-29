<template>
  <div id="screen_box" class="screen_box">
    <div class="layout_top">
      <Decoration5 :duration="2" class="top_bg" :color="['#add5a2', '#cc163a']" />
      <span class="title">O2O云实时数据监控平台</span>
    </div>
    <div class="layout_content">
      <div class="box_content content_left">
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">&nbsp;&nbsp;数据监控大图1&nbsp;&nbsp;</Decoration7>
        </BorderBox1>
        <Decoration1 style="width:200px; height:50px;margin: 20px 0;margin-top: 0;" />
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">&nbsp;&nbsp;数据监控大图2&nbsp;&nbsp;</Decoration7>
        </BorderBox1>
      </div>
      <div class="box_content content_center">
        <BorderBox10 class="content_center_top_box">BorderBox8</BorderBox10>
        <Decoration1 :reverse="true" style="width:200px; height:50px;margin: 10px 0;" />
        <div class="content_center_bottom_box">
          <Decoration8 class="bg_jiao_left" />
          <Decoration8 class="bg_jiao_right" :reverse="true" />
        </div>
      </div>
      <div class="box_content content_right">
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">&nbsp;&nbsp;数据监控大图3&nbsp;&nbsp;</Decoration7>
        </BorderBox1>
        <Decoration1 style="width:200px; height:50px;margin: 20px 0;margin-top: 0;" />
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">&nbsp;&nbsp;数据监控大图4&nbsp;&nbsp;</Decoration7>
        </BorderBox1>
        <Decoration1 style="width:200px; height:50px;margin: 20px 0;margin-top: 0;" />
        <BorderBox1 class="data_box">
          <Decoration7 class="data_box_title_box">&nbsp;&nbsp;数据监控大图5&nbsp;&nbsp;</Decoration7>
        </BorderBox1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from 'vue';
import autofit from 'autofit.js';

import { Decoration5, Decoration7, BorderBox1, Decoration1, BorderBox10, Decoration8 } from '@dataview/datav-vue3';

defineOptions({
  name: 'screen',
});


onMounted(() => {
  nextTick(() => {
    autofit.init({
      dh: 1080,
      dw: 1920,
      el: "#screen_box",
      resize: true
    })
  });
})
</script>

<style lang="scss" scoped>
.screen_box {
  width: 100%;
  height: 100%;
  background: #101f30;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 0;
  box-sizing: border-box;

  .layout_top {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 13px;

    .top_bg {
      width: 900px;
      height: 60px;
    }

    .title {
      position: absolute;
      font-size: 30px;
      top: -10px;
      color: #fff;
    }
  }

  .layout_content {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;

    .box_content {
      height: 100%;
      display: flex;
      flex-direction: column;

    }

    .content_left {
      width: 25%;
      align-items: center;

      .data_box {
        width: 100%;
        height: 340px;
        position: relative;
        display: flex;

        .data_box_title_box {
          width: 250px;
          height: 30px;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 20px;
        }
      }

      .data_box:last-child {
        height: 565px;
      }
    }

    .content_center {
      width: 50%;
      height: auto;
      padding: 0 20px;
      box-sizing: border-box;
      align-items: center;

      .content_center_top_box {
        width: 100%;
        height: 700px;
      }

      .content_center_bottom_box {
        width: 100%;
        height: 200px;
        position: relative;

        .bg_jiao_left {
          width: 300px;
          height: 30px;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .bg_jiao_right {
          width: 300px;
          height: 30px;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }

    .content_right {
      width: 25%;
      align-items: center;

      .data_box {
        width: 100%;
        height: 278px;
        position: relative;
        display: flex;

        .data_box_title_box {
          width: 250px;
          height: 30px;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
