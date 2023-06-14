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
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                title="你确认删除吗?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
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
                v-if="row.flag"
                @blur="toLook(row, $index)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                :ref="(vc: any) => inputArr[$index] = vc"
              ></el-input>
              <div @click="toEdit(row, $index)" style="cursor: pointer" v-else>
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作" width="200">
            <template #="{ $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
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
import {
  watch,
  ref,
  onMounted,
  reactive,
  nextTick,
  onBeforeUnmount,
} from 'vue';
import type {
  AttrResponseData,
  AttrDataObj,
  attrValueType,
} from '@/api/product/attr/type';
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr';
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
let inputArr = ref<any>([]);

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

const updateAttr = (row: AttrDataObj) => {
  // 注：为了解决列表项和编辑项同时操作的是同一个对象，此处采用深拷贝的方式
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  setScene();
};

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};

const deleteAttr = async (attrId: number) => {
  const result = await reqRemoveAttr(attrId);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    attrArr.value = [];
    loading.value = true;
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: result.data,
    });
  }
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

const toEdit = (row: attrValueType, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};

onMounted(() => {
  attrArr.value = [];
  if (!categoryStore.c3Id) return false;
  loading.value = true;
  getAttr();
});

onBeforeUnmount(() => {
  // 一次性重置属性仓库里的全部state值
  categoryStore.$reset();
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
