<script setup lang="ts">
// 配置element-plus国际化
// @ts-ignore  忽略ts对该文件的检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElConfigProvider } from 'element-plus';
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
