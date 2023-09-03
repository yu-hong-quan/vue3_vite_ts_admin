<template>
  <div>
    <el-card style="height: 80px">
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
              @click="setPermisstion(row)"
            >
              分配权限
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
                  删除角色
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

    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          :data="menuArr"
          show-checkbox
          node-key="id"
          :default-checked-keys="selectArr"
          :props="defaultProps"
          :default-expand-all="true"
          v-loading="drawerLoading"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button
            type="primary"
            @click="handlerConfmit"
            :disabled="confmitDisabled"
            :loading="confmitDisabled"
          >
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
import {
  reqAllRoleList,
  reqAddRoleOrUpdateRole,
  reqRemoveRole,
  reqAllPermission,
  reqSetPermission,
} from '@/api/acl/role/index';
import type {
  Records,
  RoleResponseData,
  ReadonlyRoleData,
  MenuResponseData,
  MenuList,
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
let drawer = ref<boolean>(false);
let drawerLoading = ref<boolean>(true);
const defaultProps = {
  children: 'children',
  label: 'name',
};
let menuArr = ref<MenuList>([]);
let selectArr = ref<number[]>([]);
let tree = ref<any>();
let confmitDisabled = ref<boolean>(false);

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

const setPermisstion = async (row: ReadonlyRoleData) => {
  menuArr.value = [];
  drawerLoading.value = true;
  Object.assign(roleParams, row);
  drawer.value = true;
  let result: MenuResponseData = await reqAllPermission(row.id as number);
  if (result.code === 200) {
    menuArr.value = result.data;
    // 递归筛选勾选状态
    selectArr.value = filterSelectArr(menuArr.value, []);
  }
  drawerLoading.value = false;
};

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });
  return initArr;
};

const handlerConfmit = async () => {
  const roleId = roleParams.id;
  confmitDisabled.value = true;
  // 若节点可用被选中 (show-checkbox 为 true), 它将返回当前选中节点 key 的数组
  let arr = tree.value.getCheckedKeys();
  // 如果节点可用被选中 (show-checkbox 为 true), 它将返回当前半选中的节点组成的数组
  let arrB = tree.value.getHalfCheckedKeys();

  let permissionId = arr.concat(arrB);
  console.log(permissionId);

  let result: any = await reqSetPermission(roleId as number, permissionId);
  console.log(result);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '权限分配成功',
    });
    drawer.value = false;
    confmitDisabled.value = false;
    reset();
  } else {
    ElMessage({
      type: 'error',
      message: '权限分配失败',
    });
    confmitDisabled.value = false;
  }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
