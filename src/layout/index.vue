<template>
    <div class="layout_container">

        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-scrollbar>
        </div>

        <!-- 顶部导航 -->
        <div class="layout_tabbar">顶部导航</div>

        <!-- 内容展示区 -->
        <div class="layout_main">
            <el-scrollbar class="main_scrollbar">
                <Main></Main>
            </el-scrollbar>
        </div>

    </div>
</template>

<script lang="ts" setup>
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 引入主体内容组件
import Main from './main/index.vue'

// 获取用户相关的仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    background: red;
    position: relative;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;

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
        background: cadetblue;
    }

    .layout_main {
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background: green;
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        box-sizing: border-box;

        .main_scrollbar {
            width: 100%;
            height: calc(100vh - $base-tabbar-height - 40);
        }
    }

    // .layout_main::-webkit-scrollbar {
    //     display: none;
    // }
}
</style>