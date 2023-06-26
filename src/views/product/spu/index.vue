<template>
  <div>
    <el-card>
      <!-- 三级分类组件 -->
      <Category :scene="scene" />
    </el-card>
    <el-card style="margin-top: 15px">
      <div v-show="scene == 0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id" @click="addSpu">
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0" :border="true" :data="records" v-loading="loading">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU列表"></el-button>
              <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 30, 50]"
          :page-count="pagesCount" :background="true" layout="prev, pager, next, jumper,->, sizes,total "
          :total="totalNum" @size-change="handleSizeChange" @current-change="getHasSpu" />
      </div>
      <!-- 添加SPU | 修改SPU  子组件 -->
      <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <!-- 添加SKU  子组件 -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ref, watch, onMounted } from 'vue';
import { reqHasSpu } from '@/api/product/spu';
import type {
  HasSpuResponseData,
  Records,
  SpuData,
} from '@/api/product/spu/type';
import useCategoryStore from '@/store/modules/category';
let categoryStore = useCategoryStore();
let scene = ref<number>(0);
let pageNo = ref<number>(1);
let limit = ref<number>(5);
let totalNum = ref<number>(0);
let pagesCount = ref<number>(1);
let loading = ref<boolean>(false);
let records = ref<Records>([]);
let spu = ref<any>();

const getHasSpu = async (pager = 1) => {
  loading.value = true;
  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    limit.value,
    categoryStore.c3Id,
  );
  if (result.code === 200) {
    records.value = result.data.records;
    totalNum.value = result.data.total;
    pagesCount.value = result.data.pages;
    loading.value = false;
  } else {
    loading.value = false;
  }
};

const handleSizeChange = () => {
  getHasSpu();
};

const addSpu = () => {
  scene.value = 1;
};

const updateSpu = (row: SpuData) => {
  // 调用子组件暴露出来的方法
  spu.value.initHasSpuData(row);
  scene.value = 1;
};

// 自定义事件：用来接收子组件给父组件传值的需求
const changeScene = (val: number) => {
  console.log(val);
  scene.value = val;
};

onMounted(() => {
  records.value = [];
  if (!categoryStore.c3Id) return false;
  loading.value = true;
  getHasSpu();
});

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return;
    getHasSpu();
  },
);

defineOptions({
  name: 'spu',
});
</script>

<style lang="" scoped></style>
