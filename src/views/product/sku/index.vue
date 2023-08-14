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
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            title="您确定要删除该条数据吗?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteSku(row)"
            :width="220"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row class="detail_row">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row class="detail_row">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row class="detail_row">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}￥</el-col>
        </el-row>
        <el-row class="detail_row">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin-right: 5px; margin-bottom: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="detail_row">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin-right: 5px; margin-bottom: 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="detail_row">
          <el-col :span="6">商品图片</el-col>
        </el-row>
        <el-row class="detail_row">
          <el-col :span="24">
            <el-carousel
              :interval="4000"
              indicator-position="outside"
              type="card"
              height="130px"
              v-loading="drawerLoading"
            >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <el-image :src="item.imgUrl" fit="cover" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import {
  reqSkuList,
  reqSaleSku,
  reqCanleSale,
  reqSkuInfo,
  reqDeleteSku,
} from '@/api/product/sku/index';
import type {
  SkuResponseData,
  SkuData,
  SkuInfoResponse,
  RestSkuInfo,
} from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
let skuArr = ref<SkuData[]>([]);
let skuLoading = ref<boolean>(false);
let skuTableHeight = computed(() => window.innerHeight - 200);
let drawer = ref<boolean>(false);
let skuInfo = ref<RestSkuInfo>({});
let drawerLoading = ref<boolean>(false);

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

const handleSizeChange = () => {
  getHasSku();
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

const findSku = async (row: SkuData) => {
  let result: SkuInfoResponse = await reqSkuInfo(row.id as number);
  drawer.value = true;
  drawerLoading.value = true;
  if (result.code === 200) {
    skuInfo.value = result.data;
    drawerLoading.value = false;
  } else {
    ElMessage({
      type: 'error',
      message: '数据查询异常，无法查看',
    });
    drawerLoading.value = false;
  }
};

const deleteSku = async (row: SkuData) => {
  console.log(row);

  let result: any = await reqDeleteSku(row.id as number);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};

onMounted(() => {
  getHasSku();
});

defineOptions({
  name: 'sku',
});
</script>

<style lang="scss" scoped>
.detail_row {
  margin-bottom: 12px;
}

.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
