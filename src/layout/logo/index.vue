<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p class="title">{{ setting.title }}</p>
  </div>
</template>

<script lang="ts" setup>
import setting from '@/setting';
defineOptions({
  name: 'Logo',
});
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin-left: 17px;
  }

  .title {
    color: $base-menu-title-color;
    font-size: $base-menu-title-fontSize;
    margin-left: 17px;
    width: 175px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
}
</style>
