<script setup lang="ts">
// 配置element-plus国际化
// @ts-ignore  忽略ts对该文件的检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElConfigProvider } from 'element-plus';
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div class="home">
      <SvgIcon name="add" inlineStyle="width:20px;height: 20px;"></SvgIcon>
      <h1>12312</h1>
    </div>
  </el-config-provider>
</template>

<style scoped lang="scss">
h1 {
  color: $color;
}
</style>


