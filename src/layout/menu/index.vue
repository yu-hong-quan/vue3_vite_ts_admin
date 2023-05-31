<template>
  <el-menu background-color="base-menu-background" text-color="white">
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children && !item.meta.hidden">
        <el-menu-item :index="item.path" @click="goRoute">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由且只有一个子路由 -->
      <template
        v-if="
          item.children &&
          item.children.length == 1 &&
          !item.children[0].meta.hidden
        "
      >
        <el-menu-item :index="item.children[0].path" @click="goRoute">
          <template #title>
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      <!-- 有子路由且子路由个数大于一个 -->
      <template
        v-if="item.children && item.children.length > 1 && !item.meta.hidden"
      >
        <el-sub-menu :index="item.path">
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 递归组件本身 -->
          <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
defineOptions({
  name: 'Menu',
});

// 获取父组件传递过来的路由数据
defineProps(['menuList']);

const $router = useRouter();
const goRoute = (vc: any) => {
  $router.push(vc.index);
};
</script>

<style lang="scss" scoped></style>
