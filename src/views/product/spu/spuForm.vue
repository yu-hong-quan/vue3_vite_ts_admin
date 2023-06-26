<template>
  <el-form label-width="100">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="SpuParams.tmId">
        <el-option :label="item.tmName" v-for="item in allTradeMarkData" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" autosize placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload v-model:file-list="imgListData" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :before-upload="handleUpload" :on-success="handleAvatarSuccess">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:50%;height:50%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select v-model="saleAttrIdAndValueName" clearable
        :placeholder="unSelectSaleAttr.length ? `还可选择${unSelectSaleAttr.length}个属性` : '暂无可选择的属性'">
        <el-option :label="item.name" v-for="item in unSelectSaleAttr" :key="item.id"
          :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button type="primary" size="default" icon="Plus" :disabled="!saleAttrIdAndValueName" @click="addSaleAttr"
        style="margin-left: 10px">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttrData">
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column label="销售属性名" prop="saleAttrName" width="120"></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag v-for="tag in row.spuSaleAttrValueList" :key="tag.id" class="mx-1" closable
              @close="row.spuSaleAttrValueList.splice($index, 1)">
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input v-if="row.flag" v-model="row.saleAttrValue" @blur="toLook(row)" placeholder="请输入属性值" size="small"
              style="width:150px; margin-left: 5px;"></el-input>
            <el-button v-else type="success" size="small" icon="Plus" @click="toEdit(row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #="{ $index }">
            <el-button type="danger" size="small" icon="Delete" @click="saleAttrData.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElMessage, ElLoading } from 'element-plus';
import {
  reqAllTradMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu';
import type {
  Trademark,
  SpuImg,
  SaleAttr,
  SaleAttrValue,
  HasSaleAttr,
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SpuAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type';
import type { UploadProps } from 'element-plus';
// 获取父组件的自定义事件方法changeScene
let $emit = defineEmits(['changeScene']);
const cancel = () => {
  // 触发父组件的自定义事件方法，并将需要传递的值：0  进行回传
  $emit('changeScene', 0);
};

let allTradeMarkData = ref<Trademark[]>([]);
let imgListData = ref<SpuImg[]>([]);
let saleAttrData = ref<SaleAttr[]>([]);
let allSaleAttrData = ref<HasSaleAttr[]>([]);
let SpuParams = ref<SpuData>({
  category3Id: "",
  description: "",
  spuName: "",
  tmId: 0,
  spuImageList: [],
  spuSaleAttrList: []
})
let dialogVisible = ref<boolean>(false);
let dialogImageUrl = ref<string>('');
let imgLoading = ref<any>(null);
// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttrData.value.filter(item => {
    return saleAttrData.value.every(item1 => {
      return item.name != item1.saleAttrName;
    })
  })
  return unSelectArr;
})
let saleAttrIdAndValueName = ref<string>('')

const initHasSpuData = async (row: SpuData) => {
  SpuParams.value = row;

  // 获取全部品牌数据
  let result1: AllTradeMark = await reqAllTradMark();
  // 获取品牌下的商品图片数据
  let result2: SpuHasImg = await reqSpuImageList(row.id as number);
  // 获取某一个已有的SPU拥有的销售属性
  let result3: SpuAttrResponseData = await reqSpuHasSaleAttr(row.id as number);
  // 获取全部销售属性
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr();

  allTradeMarkData.value = result1.data;
  imgListData.value = result2.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  });
  saleAttrData.value = result3.data;
  allSaleAttrData.value = result4.data;
};
// 向父组件暴露子组件方法initHasSpuData， 父组件通过ref获取该方法
defineExpose({ initHasSpuData });

const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true;
  dialogImageUrl.value = file.url;
}

const handleUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif' || file.type == 'image/jpg') {
    if ((file.size / 1024 / 1024) < 3) {
      imgLoading = ElLoading.service({
        lock: true,
        text: '图片上传中',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小务必在3MB以内'
      })
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件类型需为png/jpeg/gif/jpg类型'
    })
    return false;
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  console.log('blob格式文件: ', URL.createObjectURL(uploadFile.raw!));
  if (response.code === 200) {
    imgLoading.close();
    ElMessage.success('上传成功');
  } else {
    ElMessage.error('上传失败');
    imgLoading.close();
  }
};

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  saleAttrData.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
}

const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: (saleAttrValue as string),
  }

  if (saleAttrValue?.trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return false;
  }

  let repeat = row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName == saleAttrValue;
  })

  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    })
    return false;
  }

  row.spuSaleAttrValueList.push(newSaleAttrValue);
  row.flag = false;
}
</script>

<style lang="scss" scoped>
.mx-1 {
  margin: 5px;
}
</style>
