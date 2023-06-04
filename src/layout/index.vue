<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layOutSettingStore.fold ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="base-menu-background" text-color="white" active-color="base-menu-active-text-color"
          :default-active="$route.path" :collapse="layOutSettingStore.fold ? true : false">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: layOutSettingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>

    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ fold: layOutSettingStore.fold ? true : false }">
      <el-scrollbar class="main_scrollbar">
        <Contaner></Contaner>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue';
// 引入菜单组件
import Menu from './menu/index.vue';
// 引入顶部tabbar组件
import Tabbar from './tabbar/index.vue';
// 引入主体内容组件
import Contaner from './main/index.vue';
// 获取用户相关的仓库
import useUserStore from '@/store/modules/user';
// 获取layout组件相关的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
let userStore = useUserStore();
let layOutSettingStore = useLayOutSettingStore();

const $route = useRoute();

defineOptions({
  name: 'Layout',
});
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-y: hidden;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: #333;
    transition: all 0.5s;

    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height);

      :deep(.el-menu) {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0;
    left: $base-menu-width;
    z-index: 10;
    transition: all 0.5s;
    box-shadow: 0 0 5px #ccc;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.5s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }

    .main_scrollbar {
      width: 100%;
      height: calc(100vh - $base-tabbar-height - 40px);
    }
  }
}
</style>
<style lang="scss">
// .el-popper.is-pure {
//   background: $base-menu-background;
//   border: none;
// }
</style>
