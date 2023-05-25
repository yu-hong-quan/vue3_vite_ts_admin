<template>
  <!-- 使用SVG图标的组合 -->
  <svg :style="inlineStyle">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接收父组件传递过来的参数
defineProps({
  // xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 图标名字
  name: {
    type: String,
    default: '',
  },
  // 图标颜色
  color: {
    type: String,
    default: '#333',
  },
  // 图标样式
  inlineStyle: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
