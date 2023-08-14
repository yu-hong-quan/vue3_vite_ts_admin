<template>
  <div class="user_page">
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入搜索用户名" v-model="username" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="searchUser">
            搜索
          </el-button>
          <el-button type="primary" size="default" @click="resetFind">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 15px">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button type="danger" size="default" :disabled="selectArr.length < 1 ? true : false"
        @click="deleteSelectUser">批量删除</el-button>
      <el-table border :data="userData" v-loading="dataLoding" @selection-change="selectChange" style="margin: 10px 0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column label="用户名" prop="username" align="center"></el-table-column>
        <el-table-column label="用户昵称" prop="name" align="center"></el-table-column>
        <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240" fixed="right">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="User">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit" @click="ediltUser(row)">
              编辑用户
            </el-button>
            <el-popconfirm title="您确定要删除该用户吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="removeUser(row)"
              :width="220">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" style="margin-top: 5px">
                  删除用户
                </el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 50]"
        :background="true" layout="prev, pager, next, jumper,->,sizes, total," :total="total" @current-change="getHasUser"
        @size-change="handleSelectPage" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="userParams.id ? '修改用户' : '编辑用户'" width="30%" :before-close="cancel">
      <el-form label-width="100" :rules="rules" ref="formRef" :model="userParams">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请输入昵称" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="saveConmit(formRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting';
import { ref, onMounted, reactive, nextTick } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { UserResponseData, Records, User, RestUser } from '@/api/acl/user/type';
import { reqUserInfo, reqAddOrUpdateUser, reqRemoveUser, reqRemoveAllUser } from '@/api/acl/user/index';
import { ElMessage } from 'element-plus';
let settingStore = useLayOutSettingStore();
let username = ref<string>('');
let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let dataLoding = ref<boolean>(false);
let userData = ref<Records>([]);
let dialogVisible = ref<boolean>(false);
let userParams = reactive<RestUser>({
  username: '',
  name: '',
  password: '',
});
let formRef = ref<FormInstance>();
let selectArr = ref<User[]>([]);

const validatorUsername = (rule: any, value: string, callback: any) => {
  console.log(rule, value);
  if (value && value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error('用户名至少为5位'));
  }
};
const validatorName = (rule: any, value: string, callback: any) => {
  console.log(rule);
  if (value && value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error('用户昵称至少为5位'));
  }
};
const validatorPassword = (rule: any, value: string, callback: any) => {
  console.log(rule);
  if (value && value.trim().length >= 6) {
    callback();
  } else {
    callback(new Error('密码至少为6位'));
  }
};
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名至少为5位',
      validator: validatorUsername,
    },
  ],
  name: [
    {
      required: true,
      trigger: 'blur',
      message: '用户昵称至少为5位',
      validator: validatorName,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码至少为6位',
      validator: validatorPassword,
    },
  ],
});

const getHasUser = async (pager = 1) => {
  dataLoding.value = true;
  pageNo.value = pager;
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    username.value
  );
  if (result.code === 200) {
    total.value = result.data.total;
    userData.value = result.data.records;
    dataLoding.value = false;
  } else {
    dataLoding.value = false;
  }
};

const handleSelectPage = () => {
  getHasUser();
};

const searchUser = () => {
  getHasUser();
}

const resetFind = () => {
  settingStore.refsh = !settingStore.refsh;
};

const addUser = () => {
  dialogVisible.value = true;
  // 清空表单数据
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
  });
  nextTick(() => {
    formRef.value?.clearValidate('username');
    formRef.value?.clearValidate('name');
    formRef.value?.clearValidate('password');
  });
};

const ediltUser = (row: User) => {
  console.log(row);
  dialogVisible.value = true;
  userParams.username = row.username;
  userParams.name = row.name;
  userParams.id = row.id;
};

const cancel = () => {
  dialogVisible.value = false;
};

const saveConmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      submitForm()
    } else {
      console.log('error submit!', fields)
    }
  })
};

const submitForm = async () => {
  let result: any = await reqAddOrUpdateUser(userParams);
  if (result.code === 200) {
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    });
    getHasUser(userParams.id ? pageNo.value : 1);
    // 防止修改的是当前登录的账号，登录账号用户信息数据没有及时变更问题。 处理方式：自动刷新浏览器
    if (userParams.id) {
      window.location.reload();
    }
  } else {
    dialogVisible.value = false;
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    });
  }
}

const removeUser = async (row: RestUser) => {
  console.log(row);
  let result = await reqRemoveUser((row.id as number));
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getHasUser(userData.value.length > 0 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
}

const selectChange = (value: any) => {
  selectArr.value = value;
}

const deleteSelectUser = async () => {
  let idsList: any = selectArr.value.map(item => {
    return item.id;
  })
  console.log(idsList);
  let result: any = await reqRemoveAllUser(idsList);
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    });
    getHasUser(userData.value.length > 0 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除失败',
    });
  }
}



onMounted(() => {
  getHasUser();
});

defineOptions({
  name: 'user',
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer_footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
