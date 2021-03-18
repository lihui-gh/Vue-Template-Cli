<template>
  <el-row>
    <div class="edit-from">
      <el-form
        ref="editForm"
        :model="editForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="editForm.username"
            class="form-input"
            :disabled="true"
            maxlength="20"
            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item style="text-align: left" label="用户状态" prop="status">
          <el-switch
            v-model="editForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>

        <el-form-item label="所属角色" prop="roles">
          <el-select
            v-model="editForm.Roles"
            multiple
            class="form-input"
            placeholder="请选择角色"
            @visible-change="handleRoleOptions"
          >
            <el-option v-for="(role, index) in roleOptions" :key="index" :label="role.name" :value="role.ID" />
          </el-select>
        </el-form-item>

        <el-form-item label="昵称" prop="name">
          <el-input v-model="editForm.name" class="form-input" placeholder="请输入用户昵称" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="editForm.phone"
            class="form-input"
            type="tel"
            placeholder="请输入境内手机号码: 123-6666-6666"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model.trim="editForm.email"
            class="form-input"
            maxlength="100"
            type="email"
            placeholder="请输入电子邮箱地址"
          />
        </el-form-item>

        <el-form-item label="其他备注" prop="describe">
          <el-input
            v-model="editForm.describe"
            class="form-input"
            type="textarea"
            :rows="2"
            maxlength="200"
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
    </div>

    <div class="dialog-footer">
      <span style="float: right">
        <el-button @click="handleFormClose('editForm')">取 消</el-button>
        <el-button type="primary" :loading="editLoading" @click="handleSubmitForm('editForm')">提 交</el-button>
      </span>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'Edit',
  // props: ['editData', 'initLoading'],
  props: {
    editData: {
      type: Object,
      default: () => {}
    },
    initLoading: Boolean
  },
  data() {
    return {
      formLoading: false,
      editLoading: false,
      editForm: {
        username: '',
        name: '',
        phone: '',
        email: '',
        describe: '',
        status: '1',
        Roles: []
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { max: 20, message: '用户名长度最多20个字符', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: '不允许输入空格等特殊符号',
            trigger: 'blur'
          }
        ],
        name: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { max: 30, message: '用户姓名长度最多30个字符', trigger: 'blur' }
        ],
        phone: [
          {
            required: true,
            message: '请输入正确的手机号码',
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: '请输入正确的电子邮箱地址',
            trigger: 'blur'
          },
          { max: 100, message: '用邮箱地址长度最多100个字符', trigger: 'blur' }
        ],
        describe: [
          { max: 200, message: '描述信息不能超过200个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择角色状态', trigger: 'change' }
        ],
        Roles: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }
        ]
      },
      roleOptions: []
    };
  },
  watch: {
    editData: function() {
      this.editForm = this.editData;
    },
    initLoading: function() {
      this.formLoading = this.initLoading;
    }
  },

  created() {
    this.$api.list('v1/getrolelist', { pageSize: 1000 }).then(res => {
      this.roleOptions = res.data.rows;
      this.formLoading = this.initLoading;
    });
  },
  methods: {
    // 获取角色
    handleRoleOptions(val) {
      if (val) {
        const params = {
          pageSize: 1000
        };
        this.$api.list('v1/getrolelist', params).then(res => {
          this.roleOptions = res.data.rows;
        });
      }
    },

    // 提交编辑
    handleSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editLoading = true;
          this.$api
            .edit('v1/edituser', this.editForm.ID, this.editForm)
            .then(res => {
              this.handleFormClose(formName);
              this.$message.success({
                showClose: true,
                message: res.errmsg,
                duration: 2000
              });
              this.$emit('submitEdit', this.editData.type);
            });
        }
      });
    },

    // 关闭添加
    handleCloseAdd() {
      this.handleFormClose('editForm');
    },

    // 表单关闭
    handleFormClose(formName) {
      this.editLoading = false;
      this.$refs[formName].resetFields();
      this.$emit('closeEdit', formName);
    }
  }
};
</script>

<style scoped>
.edit-from {
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-input {
  width: 260px;
}
</style>
