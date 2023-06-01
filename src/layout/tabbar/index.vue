<template>
    <div class="tabbar">
        <!-- 面包屑栏目 -->
        <Breadcrumb></Breadcrumb>
        <!-- 页面设置栏目 -->
        <Setting></Setting>
    </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
defineOptions({
    name: 'Tabbar',
});
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box;
    background: #fff;
}
</style>