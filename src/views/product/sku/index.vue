<template>
  <el-card>
    <el-table
      :data="skuArr"
      :height="skuTableHeight"
      v-loading="skuLoading"
      width="500px"
      border
      style="margin-bottom: 10px"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="名称"
        align="center"
        width="300"
        show-overflow-toolip
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        align="center"
        min-width="500"
        show-overflow-toolip
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" align="center" width="150">
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
      <el-table-column
        label="重量(克)"
        align="center"
        width="150"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        align="center"
        width="150"
        prop="price"
      ></el-table-column>
      <el-table-column label="当前状态" align="center" width="150">
        <template #="{ row }">
          <el-link :underline="false" :type="row.isSale ? 'success' : 'danger'">
            {{ row.isSale ? '上架中' : '已下架' }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="205" fixed="right">
        <template #="{ row }">
          <el-button
            :type="row.isSale ? 'warning' : 'success'"
            size="small"
            :icon="row.isSale ? 'bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button type="info" size="small" icon="InfoFilled"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes, total,"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasSku"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { reqSkuList, reqSaleSku, reqCanleSale } from '@/api/product/sku/index';
import type { SkuResponseData, SkuData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
let skuLoading = ref<boolean>(false);
let skuTableHeight = computed(() => window.innerHeight - 200);

const getHasSku = async (pager = 1) => {
  skuLoading.value = true;
  pageNo.value = pager;
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value);
  if (result.code === 200) {
    total.value = result.data.total;
    skuArr.value = result.data.records;
    skuLoading.value = false;
  }
};

const updateSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    // 下架
    let result = await reqCanleSale(row.id as number);
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      });
      getHasSku(pageNo.value);
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败',
      });
    }
  } else {
    // 上架
    let result = await reqSaleSku(row.id as number);
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      });
      getHasSku(pageNo.value);
    } else {
      ElMessage({
        type: 'error',
        message: '上架失败',
      });
    }
  }
};

const updateSku = () => {
  ElMessage({
    type: 'warning',
    message: '正在加班加点开发中...',
  });
};

const handleSizeChange = () => {
  getHasSku();
};

onMounted(() => {
  getHasSku();
});

defineOptions({
  name: 'sku',
});
</script>

<style lang="scss" scoped></style>
