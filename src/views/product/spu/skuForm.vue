<template>
  <el-form label-width="100">
    <el-form-item label="SKU名称">
      <el-input
        placeholder="请输入SKU名称"
        v-model="skuParams.skuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="请输入价格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="请输入重量(克)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="请输入SKU描述"
        type="textarea"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性" v-loading="attrListLoading">
      <el-form :inline="true" label-width="100">
        <el-form-item
          :label="item.attrName"
          v-for="item in attrArr"
          :key="item.id"
          style="margin-bottom: 5px"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              :value="`${item.id}:${attrValue.id}`"
              :label="attrValue.valueName"
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性" v-loading="saleListLoading">
      <el-form :inline="true" label-width="100">
        <el-form-item
          :label="item.saleAttrName"
          v-for="item in saleArr"
          :key="item.id"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${saleAttrValue.id}`"
              :label="saleAttrValue.saleAttrValueName"
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称" v-loading="imageListLoading">
      <el-table border :data="imageArr" ref="imgTable">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column align="center" label="图片">
          <template #="{ row }">
            <img
              :src="row.imgUrl"
              :alt="row.imgName"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="名称"
          prop="imgName"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template #="{ row }">
            <el-button type="primary" size="small" @click="handleSetImg(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { SpuData, SkuData } from '@/api/product/spu/type';
import { reqAttr } from '@/api/product/attr';
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu';
import { ElMessage } from 'element-plus';
// 自定义事件方法
let $emit = defineEmits(['changeScene']);
let attrArr = ref<any>([]);
let saleArr = ref<any>([]);
let imageArr = ref<any>([]);
let attrListLoading = ref<boolean>(false);
let saleListLoading = ref<boolean>(false);
let imageListLoading = ref<boolean>(false);
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
});
let imgTable = ref<any>();

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
  attrListLoading.value = true;
  saleListLoading.value = true;
  imageListLoading.value = true;
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id as number;
  skuParams.tmId = spu.tmId;
  // 获取平台属性数据
  let result: any = await reqAttr(c1Id, c2Id, spu.category3Id);
  // 获取销售属性数据
  let result2: any = await reqSpuHasSaleAttr(spu.id as number);
  // 获取照片墙数据
  let result3: any = await reqSpuImageList(spu.id as number);
  attrArr.value = result.data;
  attrListLoading.value = false;
  saleArr.value = result2.data;
  saleListLoading.value = false;
  imageArr.value = result3.data;
  imageListLoading.value = false;
};
const handleSetImg = (row: any) => {
  skuParams.skuDefaultImg = row.imgUrl;
  imageArr.value.forEach((item: any) => {
    imgTable.value.toggleRowSelection(item, false);
  });
  imgTable.value.toggleRowSelection(row, true);
};
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' });
};
const save = async () => {
  // 整理平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({
        attrId,
        valueId,
      });
    }
    return prev;
  }, []);
  console.log(skuParams.skuAttrValueList);
  // 整理销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
      }
      return prev;
    },
    [],
  );
  // 发送新增请求
  let result = await reqAddSku(skuParams);
  console.log(result);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    });
    // 通知父组件触发修改
    $emit('changeScene', {
      flag: 0,
      params: '',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    });
  }
};

// 对外暴露方法
defineExpose({
  initSkuData,
});
</script>

<style lang="scss" scoped></style>
