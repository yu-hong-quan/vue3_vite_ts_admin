<template>
  <div>
    <el-card style="height: 80px">
      <!-- 三级分类组件 -->
      <Category :scene="scene" />
    </el-card>
    <el-card style="margin-top: 15px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table
          style="margin: 10px 0"
          :border="true"
          :data="records"
          v-loading="loading"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
                @click="findSkuList(row)"
              ></el-button>
              <el-popconfirm
                title="您是否确认删除?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                width="200"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[5, 10, 30, 50]"
          :page-count="pagesCount"
          :background="true"
          layout="prev, pager, next, jumper,->, sizes,total "
          :total="totalNum"
          @size-change="handleSizeChange"
          @current-change="getHasSpu"
        />
      </div>
      <!-- 添加SPU | 修改SPU  子组件 -->
      <SpuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></SpuForm>
      <!-- 添加SKU  子组件 -->
      <SkuForm
        ref="sku"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></SkuForm>
      <!-- dialog对话框-展示已有的SKU数据列表 -->
      <el-dialog title="SKU列表" v-model="skuDialogShow">
        <el-table
          border
          :height="skuTableHeight"
          :data="skuArr"
          v-loading="skuTableLoading"
        >
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row }">
              <el-image
                style="width: 100px; height: 100px"
                :src="row.skuDefaultImg"
                :alt="row.skuDesc"
                :zoom-rate="1"
                :preview-src-list="[row.skuDefaultImg]"
                :initial-index="4"
                fit="scale-down"
                :preview-teleported="true"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { ElMessage } from 'element-plus';
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import { reqHasSpu, reqSkuInfo, reqRemoveSpu } from '@/api/product/spu';
import type {
  HasSpuResponseData,
  Records,
  SpuData,
  SkuInfoData,
  SkuData,
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
let sku = ref<any>();
let skuTableHeight = computed(() => window.innerHeight - 200);
let skuArr = ref<SkuData[]>([]);
let skuDialogShow = ref<boolean>(false);
let skuTableLoading = ref<boolean>(false);

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
  // 调用子组件的方法，初始化数据
  spu.value.initAddSpu(categoryStore.c3Id);
  // setTimeout的作用是，保证数据已清楚完后再切换子组件显示，否则会出现二次渲染重叠的问题。
  // setTimeout(() => {
  scene.value = 1;
  // }, 200)
};
const updateSpu = (row: SpuData) => {
  // 调用子组件暴露出来的方法
  spu.value.initHasSpuData(row);
  setTimeout(() => {
    scene.value = 1;
  }, 200);
};
// 自定义事件：用来接收子组件给父组件传值的需求
const changeScene = (obj: any) => {
  scene.value = obj.flag;
  if (obj.params == 'update') {
    // 更新，让列表保持在上一次的页数
    getHasSpu(pageNo.value);
  } else if (obj.params == 'add') {
    // 添加，让列表从第一页开始加载
    getHasSpu();
  }
};
const addSku = (row: SpuData) => {
  scene.value = 2;
  // 调用子组件的方法
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
};
const findSkuList = async (row: SpuData) => {
  skuTableLoading.value = true;
  let result: SkuInfoData = await reqSkuInfo(row.id as number);
  if (result.code === 200) {
    skuArr.value = result.data;
    skuDialogShow.value = true;
    skuTableLoading.value = false;
  }
};
const deleteSpu = async (row: SpuData) => {
  loading.value = true;
  let result: any = await reqRemoveSpu(row.id as number);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除SKU成功',
    });
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除SKU失败',
    });
  }
};

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return;
    getHasSpu();
  },
);

onMounted(() => {
  records.value = [];
  if (!categoryStore.c3Id) return false;
  loading.value = true;
  getHasSpu();
});

onBeforeUnmount(() => {
  // 一次性重置属性仓库里的全部state值
  categoryStore.$reset();
});

defineOptions({
  name: 'spu',
});
</script>

<style lang="" scoped></style>
