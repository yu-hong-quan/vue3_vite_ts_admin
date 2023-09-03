<template>
  <div class="home-box">
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" class="avatar" />
        <div>
          <h3 class="title">{{ getTime() }}{{ userStore.userName }}</h3>
          <p class="desc">《Fameily后台管理运营平台》</p>
        </div>
      </div>
    </el-card>
    <div class="bottom-img">
      <svg-icon name="home" width="600px" height="600px"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/index';
defineOptions({
  name: 'home',
});

let userStore = useUserStore();
onMounted(() => {});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .title {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .desc {
    color: rgb(228, 75, 28);
  }
}

.bottom-img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>
