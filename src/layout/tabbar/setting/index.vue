<template>
  <div class="tabbar_right">
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-button size="default" icon="Refresh" circle @click="updateRefsh"></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-button size="default" icon="FullScreen" circle @click="fullScreen"></el-button>
    </el-tooltip>
    <el-tooltip effect="dark" content="设置" placement="bottom">
      <el-button size="default" icon="Setting" circle @click="setting"></el-button>
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

    <el-drawer v-model="settingDrawer">
      <template #header>
        <h4>系统设置</h4>
      </template>
      <template #default>
        <el-form label-width="100" size="large">
          <el-form-item label="主题颜色">
            <el-color-picker v-model="color" size="large" show-alpha :predefine="predefineColors" />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch v-model="darkModeValue" size="large" inline-prompt active-icon="MoonNight" inactive-icon="Sunny"
              @change="handleDark" />
          </el-form-item>
        </el-form>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Setting',
});
import { ref } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
let userStore = useUserStore();
let layOutSettingStore = useLayOutSettingStore();
let $router = useRouter();
let $route = useRoute();
let settingDrawer = ref<boolean>(false);
let color = ref<string>('rgba(255, 69, 0, 0.68)')
const predefineColors = ref<string[]>([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let darkModeValue = ref<boolean>(false);

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

// 点击设置
const setting = () => {
  settingDrawer.value = true
}

// 暗黑模式切换事件
const handleDark = () => {
  let html = document.documentElement;
  darkModeValue.value ? html.className = 'dark' : html.className = ''
}
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

:deep(.el-drawer) {
  width: 20% !important;
}
</style>
