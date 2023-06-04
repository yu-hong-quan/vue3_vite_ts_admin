<template>
  <div class="tabbar_right">
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-button
        size="default"
        icon="Refresh"
        circle
        @click="updateRefsh"
      ></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-button
        size="default"
        icon="FullScreen"
        circle
        @click="fullScreen"
      ></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="设置" placement="bottom">
      <el-button size="default" icon="Setting" circle></el-button>
    </el-tooltip>
    <img :src="userStore.avatar" alt="头像" class="avuseImg" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
defineOptions({
  name: 'Setting',
});
let userStore = useUserStore();
let layOutSettingStore = useLayOutSettingStore();
let $router = useRouter();
let $route = useRoute();
// 点击刷新事件
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh;
};

// 点击全屏缩放事件
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// 退出登录
const logout = async () => {
  let result = await userStore.userLogOut();
  if (result === 'ok') {
    $router.push({ path: '/login', query: { redirect: $route.path } });
  }
};
</script>

<style lang="scss" scoped>
.tabbar_right {
  display: flex;
  align-items: center;

  .avuseImg {
    width: 30px;
    height: 30px;
    margin: 0 14px;
    border-radius: 50%;
  }

  :deep(.el-dropdown-link) {
    cursor: pointer;
    color: #333;
    display: flex;
    align-items: center;
  }
}
</style>
