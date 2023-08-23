<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form_box">
        <el-form-item label="角色搜索">
          <el-input placeholder="请输入关键字搜索" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            :disabled="keyword ? false : true"
          >
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="Plus" @click="addRole">
        添加角色
      </el-button>
      <el-table
        border
        :data="allRole"
        v-loading="listLoadding"
        style="margin: 10px 0"
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="60"
        ></el-table-column>
        <el-table-column
          label="ID"
          align="center"
          prop="id"
          width="100"
        ></el-table-column>
        <el-table-column
          label="角色名称"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="260" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="ediltRole(row)"
            >
              编辑角色
            </el-button>
            <el-popconfirm
              title="您确定要删除该角色吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="removeUser(row)"
              :width="220"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  style="margin-top: 5px"
                >
                  删除用户
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes, total,"
        :total="total"
        @current-change="getHasRole"
        @size-change="sizeChange"
      />
    </el-card>

    <el-dialog
      v-model="dialogFormVisible"
      :title="roleParams.id ? '更新角色' : '添加角色'"
      width="50%"
    >
      <el-form :model="roleParams" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入角色名称"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
import {
  reqAllRoleList,
  reqAddRoleOrUpdateRole,
  reqRemoveRole,
} from '@/api/acl/role/index';
import type {
  Records,
  RoleResponseData,
  ReadonlyRoleData,
} from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';

let settingStore = useLayOutSettingStore();
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let keyword = ref<string>('');
let total = ref<number>(0);
let listLoadding = ref<boolean>(true);
let allRole = ref<Records>([]);
let dialogFormVisible = ref<boolean>(false);
let form = ref<any>(null);
let roleParams = reactive<ReadonlyRoleData>({
  roleName: '',
});
const ValidityRoleName = (rule: any, value: string, callBack: any) => {
  console.log(rule);

  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('角色名称至少两位'));
  }
};
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: ValidityRoleName }],
};

const getHasRole = async (pager = 1) => {
  listLoadding.value = true;
  pageNo.value = pager;
  let result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  );
  if (result.code === 200) {
    listLoadding.value = false;
    allRole.value = result.data.records;
    total.value = result.data.total;
  }
};

const sizeChange = () => {
  getHasRole();
};

const search = () => {
  getHasRole();
  keyword.value = '';
};

const reset = () => {
  settingStore.refsh = !settingStore.refsh;
};

const addRole = () => {
  dialogFormVisible.value = true;
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  });
  nextTick(() => {
    form.value.clearValidate('roleName');
  });
};

const ediltRole = (row: ReadonlyRoleData) => {
  Object.assign(roleParams, row);
  dialogFormVisible.value = true;
  nextTick(() => {
    form.value.clearValidate('roleName');
  });
};

const save = async () => {
  await form.value.validate();
  let result: any = await reqAddRoleOrUpdateRole(roleParams);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    });
    dialogFormVisible.value = false;
    getHasRole(roleParams.id ? pageNo.value : 1);
  }
};

const removeUser = async (row: ReadonlyRoleData) => {
  let result: any = await reqRemoveRole(row.id as number);
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasRole(pageNo.value);
  } else {
    ElMessage({ type: 'error', message: '删除失败' });
  }
};

const setRole = (row: ReadonlyRoleData) => {
  console.log(row);
};

onMounted(() => {
  getHasRole();
});

defineOptions({
  name: 'role',
});
</script>

<style lang="scss" scoped>
.form_box {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
