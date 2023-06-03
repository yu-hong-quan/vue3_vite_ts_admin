<template>
  <div>
    <img :src="userStore.avatar" alt="" />
    <h1>{{ userStore.userName }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
defineOptions({
  name: 'home',
});

let userStore = useUserStore();
onMounted(() => {});
</script>

<style lang="" scoped></style>
