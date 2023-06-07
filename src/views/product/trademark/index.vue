<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>

      <el-table :data="trademarkArr" border style="margin: 10px 0" height="655" v-loading="loading">
        <el-table-column prop="id" label="品牌ID" width="80" align="center" />
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column prop="logoUrl" label="品牌logo">
          <template #="{ row }">
            <el-tooltip effect="dark" content="点击预览图片" placement="right">
              <el-image :preview-src-list="[row.logoUrl]" style="width: 100px; height: 100px" :src="row.logoUrl"
                :zoom-rate="1" :initial-index="4" fit="scale-down" :preview-teleported="true" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="品牌创建时间" />
        <el-table-column prop="updateTime" label="品牌修改时间" />
        <el-table-column prop="date" label="品牌操作">
          <template #="{ row }">
            <el-tooltip effect="dark" content="修改" placement="bottom">
              <el-button type="primary" icon="Edit" @click="updateTrademark(row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="bottom">
              <span style="margin-left:10px;">
                <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                  @confirm="deleteTrademark(row)">
                  <template #reference>
                    <el-button type="primary" icon="Delete"></el-button>
                  </template>
                </el-popconfirm>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 30, 50]" :small="false"
        :page-count="pagesCount" :disabled="false" :background="true" layout="prev, pager, next, jumper,->, sizes,total "
        :total="totalNum" @size-change="handleSizeChange" @current-change="changePageNo" />
    </el-card>
    <el-dialog v-model="dialogFromVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="700px">
      <el-form style="width: 50%;" label-width="100px" ref="ruleFormRef" :model="trademarkParams" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { reqHasTrademark, reqAddOrUpdateTrademark, reqRemoveTrademark } from '@/api/product/trademark';
import { ElMessage, ElLoading } from 'element-plus'
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark
} from '@/api/product/trademark/type';
defineOptions({
  name: 'trademark',
});

// 加载动画状态
let loading = ref<boolean>(true)
// 当前页码
let pageNo = ref<number>(1);
// 每页显示数据个数
let limit = ref<number>(5);
// 总页数
let pagesCount = ref<number>(1);
// 存储已有品牌数据总数
let totalNum = ref<number>(0);
// 存储已有品牌
let trademarkArr = ref<Records>([]);
// 对话框显示/隐藏控制
let dialogFromVisible = ref<boolean>(false);
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
// 图片上传loadding加载状态值
let imgLoading = ref<any>(null);
// form表单对象
const ruleFormRef = ref<FormInstance>();

// 品牌名称自定义校验方法
const validatorTmName = (rule: any, value: string, callBack: any) => {
  console.log(rule);
  if (value.trim().length > 0) {
    callBack()
  } else {
    callBack(new Error('品牌名称不能为空!'))
  }
}

// 品牌logo自定义校验方法
const validatorLogoUrl = (rule: any, value: string, callBack: any) => {
  console.log(rule);
  if (value) {
    callBack()
  } else {
    callBack(new Error('logo不能为空!'))
  }
}

// 校验规则
const rules = reactive<FormRules>({
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [
    { required: true, message: '请选择品牌logo', validator: validatorLogoUrl },
  ]
})



// 获取品牌数据
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value
  );
  if (result.code === 200) {
    let { total, records, pages } = result.data;
    pagesCount.value = pages;
    totalNum.value = total;
    trademarkArr.value = records;
    loading.value = false;
  }
};

// 分页器，页数切换事件
const changePageNo = (pager: number) => {
  loading.value = true;
  getHasTrademark(pager);
};

// 分页器，下拉菜单切换事件
const handleSizeChange = () => {
  loading.value = true;
  getHasTrademark();
};

// 添加品牌
const addTrademark = () => {
  delete trademarkParams.id;
  trademarkParams.logoUrl = '';
  trademarkParams.tmName = '';
  dialogFromVisible.value = true;
  // 写法一：
  // ruleFormRef.value?.clearValidate('logoUrl');
  // ruleFormRef.value?.clearValidate('tmName');
  // 写法二：
  nextTick(() => {
    // 清空校验规则错误提示信息
    ruleFormRef.value?.clearValidate('logoUrl');
    ruleFormRef.value?.clearValidate('tmName');
  })
}

// 修改品牌
const updateTrademark = (row: TradeMark) => {
  // 使用ES6语法合并对象
  // trademarkParams.id = row.id;
  // trademarkParams.logoUrl = row.logoUrl;
  // trademarkParams.tmName = row.tmName;
  Object.assign(trademarkParams, row);
  dialogFromVisible.value = true
}

// 删除品牌
const deleteTrademark = async (row: TradeMark) => {
  console.log(row);
  if (typeof row.id === 'number') {
    let result: any = await reqRemoveTrademark(row.id);
    if (result.code === 200) {
      ElMessage.success(`删除品牌成功`)
      getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
      ElMessage.error(`删除品牌失败`)
    }
  }
}

// 取消按钮事件
const cancel = () => {
  dialogFromVisible.value = false
}

// 确定按钮事件
const confirm = async () => {
  await ruleFormRef.value?.validate();
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code === 200) {
    dialogFromVisible.value = false;
    ElMessage.success(`${trademarkParams.id ? '修改' : '添加'}品牌成功`)
    loading.value = false;
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    ElMessage.error(`${trademarkParams.id ? '修改' : '添加'}品牌失败`)
  }

}

// 上传图片之前触发的拦截函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('文件不能大于2MB，请重新上传!')
      return false
    }
  } else {
    ElMessage.error('请上传jpeg/png/gif格式的文件!')
    return false
  }
  imgLoading = ElLoading.service({
    lock: true,
    text: '图片上传中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log('blob格式文件: ', URL.createObjectURL(uploadFile.raw!));
  if (response.code === 200) {
    imgLoading.close()
    trademarkParams.logoUrl = response.data
    // 清除图片上传的错误提示信息
    ruleFormRef.value?.clearValidate('logoUrl');
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
    imgLoading.close()
  }
}

onMounted(() => {
  getHasTrademark();
});
</script>

<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 170px;
  height: 170px;
  display: block;
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 170px;
  height: 170px;
  text-align: center;
}
</style>

<style lang="scss">
.ei-flow-form .el-card__body {
  z-index: initial !important;
}
</style>
