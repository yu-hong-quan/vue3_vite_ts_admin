<template>
  <div class="permission-box">
    <el-table
      :data="permissionArr"
      border
      v-loading="listLoading"
      row-key="id"
      style="width: 100%"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            v-show="row.level != 4"
            @click="addPermission(row)"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            :disabled="row.level == 1 ? true : false"
            @click="editPermission(row)"
          >
            {{ row.level == 4 ? '编辑功能' : '编辑菜单' }}
          </el-button>
          <el-popconfirm
            :title="
              '您确定要删除该' + (row.level == 4 ? '功能' : '菜单') + '吗?'
            "
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="removePermission(row)"
            :width="220"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                {{ row.level == 4 ? '删除功能' : '删除菜单' }}
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="menuData.id ? '更新' : '添加'"
      width="30%"
    >
      <el-form label-width="70" :model="menuData">
        <el-form-item label="名称：">
          <el-input placeholder="请输入名称" v-model="menuData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值：">
          <el-input
            placeholder="请输入权限值"
            v-model="menuData.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="savePermission">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import {
  reqAllPermission,
  reqAddOrUpdatePermission,
  reqRemovePeremission,
} from '@/api/acl/permission/index';
import type {
  PermissionResponseData,
  PermissionList,
  PermissionParams,
  Permission,
} from '@/api/acl/permission/type';
import { ElMessage } from 'element-plus';

let listLoading = ref<boolean>(false);
let permissionArr = ref<PermissionList>([]);
let dialogVisible = ref<boolean>(false);
let menuData = reactive<PermissionParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
});

onMounted(() => {
  getHasPermission();
});

const getHasPermission = async () => {
  listLoading.value = true;
  let result: PermissionResponseData = await reqAllPermission();
  if (result.code === 200) {
    listLoading.value = false;
    permissionArr.value = result.data;
  }
};

const addPermission = (row: Permission) => {
  console.log(row);

  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  });
  menuData.level = row.level + 1; //+1 代表是给它的子菜单新增
  menuData.pid = row.pid;
  console.log(menuData);

  dialogVisible.value = true;
};
const editPermission = (row: Permission) => {
  Object.assign(menuData, row);
  dialogVisible.value = true;
};

const savePermission = async () => {
  let result: any = await reqAddOrUpdatePermission(menuData);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    });
    dialogVisible.value = false;
    getHasPermission();
  } else {
    ElMessage({
      type: 'error',
      message: menuData.id ? '更新失败' : '添加失败',
    });
    dialogVisible.value = false;
  }
};

const removePermission = async (row: Permission) => {
  let result: any = await reqRemovePeremission(row.id as number);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getHasPermission();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
};

defineOptions({
  name: 'permission',
});
</script>

<style lang="scss" scoped></style>
