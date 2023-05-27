<script setup lang="ts">
// 配置element-plus国际化
// @ts-ignore  忽略ts对该文件的检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { ElConfigProvider } from 'element-plus';
import { onMounted } from 'vue';
import { reqLogin } from '@/api/user';

onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '111111',
  });
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped lang="scss">
h1 {
  color: $color;
}
</style>
