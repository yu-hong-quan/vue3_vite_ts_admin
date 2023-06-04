<template>
  <div class="tabbar_left">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="缩放/展开菜单"
      placement="bottom"
    >
      <el-icon size="23" @click="changeIcon">
        <component
          :is="layOutSettingStore.fold ? 'Expand' : 'Fold'"
        ></component>
      </el-icon>
    </el-tooltip>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="{ path: item.path }"
        v-show="item.meta.title"
      >
        <el-icon style="margin: 0 5px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';
defineOptions({
  name: 'Breadcrumb',
});

let layOutSettingStore = useLayOutSettingStore();

const $route = useRoute();

const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold;
};
</script>

<style lang="scss" scoped>
.tabbar_left {
  display: flex;
  align-items: center;

  .el-icon {
    margin-right: 12px;
    cursor: pointer;
  }

  .el-breadcrumb {
    font-size: 15px;

    :deep(.el-breadcrumb__inner) {
      display: flex;
      align-items: center;
    }
  }
}
</style>
