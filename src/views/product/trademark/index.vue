<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus">添加品牌</el-button>

    <el-table :data="trademarkArr" border style="margin: 10px 0" height="655">
      <el-table-column prop="id" label="品牌ID" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo">
        <template #="{ row }">
          <el-tooltip effect="dark" content="点击预览图片" placement="right">
            <el-image
              :preview-src-list="[row.logoUrl]"
              style="width: 100px; height: 100px"
              :src="row.logoUrl"
              :zoom-rate="1"
              :initial-index="4"
              fit="scale-down"
              :preview-teleported="true"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="品牌创建时间" />
      <el-table-column prop="updateTime" label="品牌修改时间" />
      <el-table-column prop="date" label="品牌操作">
        <template #="{ row }">
          <el-tooltip effect="dark" content="修改" placement="bottom">
            <el-button type="primary" icon="Edit"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="bottom">
            <el-button type="primary" icon="Delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[5, 10, 30, 50]"
      :small="false"
      :page-count="9"
      :disabled="false"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes,total "
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="changePageNo"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark';
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type';
defineOptions({
  name: 'trademark',
});

// 当前页码
let pageNo = ref<number>(1);
// 每页显示数据个数
let limit = ref<number>(5);
// 存储已有品牌数据总数
let totalNum = ref<number>(0);
// 存储已有品牌
let trademarkArr = ref<Records>([]);

// 获取品牌数据
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  );
  if (result.code === 200) {
    let { total, records } = result.data;
    totalNum.value = total;
    trademarkArr.value = records;
  }
};

// 分页器，页数切换事件
const changePageNo = (pager: number) => {
  getHasTrademark(pager);
};

// 分页器，下拉菜单切换事件
const handleSizeChange = () => {
  getHasTrademark();
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.ei-flow-form .el-card__body {
  z-index: initial !important;
}
</style>
