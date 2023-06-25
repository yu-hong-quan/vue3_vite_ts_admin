<template>
  <el-form label-width="100">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
      <el-button type="primary" size="default" icon="Plus" style="margin-left: 10px">
        添加属性值
      </el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column label="销售属性名" width="120"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { reqAllTradMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu';
import type { Trademark, SpuImg, SaleAttr, HasSaleAttr, SpuData, AllTradeMark, SpuHasImg, SpuAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type';
// 获取父组件的自定义事件方法changeScene
let $emit = defineEmits(['changeScene']);
const cancel = () => {
  // 触发父组件的自定义事件方法，并将需要传递的值：0  进行回传
  $emit('changeScene', 0);
};

let allTradeMarkData = ref<Trademark[]>([])
let imgListData = ref<SpuImg[]>([])
let saleAttrData = ref<SaleAttr[]>([])
let allSaleAttrData = ref<HasSaleAttr[]>([])

const initHasSpuData = async (row: SpuData) => {
  console.log(row);
  // 获取全部品牌数据
  let result1: AllTradeMark = await reqAllTradMark();
  console.log(result1);
  // 获取品牌下的商品图片数据
  let result2: SpuHasImg = await reqSpuImageList((row.id as number));
  console.log(result2);
  // 获取某一个已有的SPU拥有的销售属性
  let result3: SpuAttrResponseData = await reqSpuHasSaleAttr((row.id as number));
  console.log(result3);
  // 获取全部销售属性
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr();
  console.log(result4);

  allTradeMarkData.value = result1.data
  imgListData.value = result2.data
  saleAttrData.value = result3.data
  allSaleAttrData.value = result4.data
}
// 向父组件暴露子组件方法initHasSpuData， 父组件通过ref获取该方法
defineExpose({ initHasSpuData })
</script>

<style lang="scss" scoped></style>
