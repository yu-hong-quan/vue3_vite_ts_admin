<template>
  <!-- 二级路由出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'main',
});
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.2s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
