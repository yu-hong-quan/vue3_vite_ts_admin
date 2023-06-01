<template>
  <!-- 二级路由出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';

defineOptions({
  name: 'Contaner',
});

let layOutSettingStore = useLayOutSettingStore();
let flag = ref(true);

// 监听仓库内部数据是否发生变化
watch(() => layOutSettingStore.refsh, () => {
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  })
})

</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  // transform: scale(0);
}

.fade-enter-active {
  transition: all .5s;
}

.fade-enter-to {
  opacity: 1;
  // transform: scale(1);
}
</style>
