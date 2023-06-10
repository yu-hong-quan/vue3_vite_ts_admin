<template>
  <div>
    <el-card>
      <!-- 三级分类组件 -->
      <Category :scene="scene" />
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table
          :data="attrArr"
          v-loading="loading"
          border
          style="margin: 10px 0"
        >
          <el-table-column
            label="序号"
            type="index"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            label="三级分类id"
            width="100"
            prop="categoryId"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性id"
            width="100"
            prop="id"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="200"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <div>
                <el-tag
                  class="tag_item"
                  type="success"
                  v-for="item in row.attrValueList"
                >
                  {{ item.valueName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="100"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                v-if="flag"
                @blur="toLook(row, $index)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
              ></el-input>
              <div @click="toEdit(row)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="200"></el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          :disabled="attrParams.attrValueList.length < 1"
          @click="save"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, reactive } from 'vue';
import type {
  AttrResponseData,
  AttrDataObj,
  attrValueType,
} from '@/api/product/attr/type';
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr';
import useCategoryStore from '@/store/modules/category';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();
let attrArr = ref<AttrDataObj[]>([]);
let loading = ref<boolean>(false);
let scene = ref<number>(0);
let attrParams = reactive<AttrDataObj>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
});
let flag = ref<boolean>(true);

const getAttr = async () => {
  let { c1Id, c2Id, c3Id } = categoryStore;
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code === 200) {
    attrArr.value = result.data;
    loading.value = false;
  }
};

const setScene = () => {
  scene.value = 1;
};

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  });
  setScene();
};

const updateAttr = () => {
  setScene();
};

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  });
};

const deleteAttr = (row: any) => {
  console.log(row);
};

const cancel = () => {
  scene.value = 0;
};

const save = async () => {
  let result = await reqAddOrUpdateAttr(attrParams);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    });
    cancel();
    attrArr.value = [];
    loading.value = true;
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    });
  }
};

const toLook = (row: attrValueType, $index: number) => {
  console.log('失去焦点');
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    });
    return;
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    });
    return;
  }
  row.flag = false;
};

const toEdit = (row: attrValueType) => {
  row.flag = true;
};

onMounted(() => {
  attrArr.value = [];
  if (!categoryStore.c3Id) return false;
  loading.value = true;
  getAttr();
});

watch(
  () => categoryStore.c3Id,
  (newValue) => {
    attrArr.value = [];
    if (!newValue) return false;
    loading.value = true;
    getAttr();
  },
);

defineOptions({
  name: 'attr',
});
</script>

<style lang="scss" scoped>
.tag_item {
  margin: 5px;
}
</style>
