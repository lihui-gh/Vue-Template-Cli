<template>
  <el-row class="power">
    <div class="power_title">
      <div style="height: 20px; width: 4px; background: blue; margin-right: 10px" />
      权限分配
    </div>
    <el-scrollbar class="power-form">
      <el-form
        ref="editForm"
        v-loading="formLoading"
        :model="editForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="权限选择">
          <el-tree
            ref="permissionTree"
            :data="permission_routers"
            show-checkbox
            default-expand-all
            node-key="uid"
            highlight-current
            :props="defaultProps"
            @check-change="handleCheckChange"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <div class="dialog-footer">
      <div style="padding-left: 32%;">
        <el-button @click="handleFormClose('editForm')">取 消</el-button>
        <el-button type="primary" :loading="editLoading" @click="handleSubmitForm('editForm')">提 交</el-button>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'Power',
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
      formLoading: true,
      editLoading: false,
      editForm: {
        role_permission: []
      },
      rules: {

      },
      permission_routers: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },

  computed: {

  },
  watch: {
    editData: function() {
      this.editForm = this.editData;
      this.setCheckedKeys(this.editData);
    },
    initLoading: function() {
      this.formLoading = this.initLoading;
    }
  },
  created() {
    this.$api.list('v1/getpermissionall').then(res => {
      this.permission_routers = res.data;
      this.editForm = this.editData;
      this.formLoading = this.initLoading;
    });
  },
  methods: {
    // 提交权限分配
    handleSubmitForm(formName) {
      // 初始化时添加父级节点
      // this.handleCheckChange();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editLoading = true;
          this.$api.edit('v1/bindpermissions', this.editForm.ID, this.editForm.role_permission).then(res => {
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

    // 表单关闭
    handleFormClose(formName) {
      this.editLoading = false;
      this.$refs[formName].resetFields();
      this.$emit('closeEdit', formName);
    },

    // 选中权限
    handleCheckChange(data, checked, indeterminate) {
      const list = this.$refs.permissionTree
        .getCheckedNodes(false, true)
        .map(item => {
          return item.uid;
        });
      this.editForm.role_permission = list;
      console.log(this.editForm.role_permission);
    },

    // 加载已含有权限
    setCheckedKeys(data) {
      if (data.role_permission.length >= 0) {
        this.$refs.permissionTree.setCheckedKeys(data.role_permission.filter(item => item != 'system' && item != 'model'));
      }
    }
  }
};
</script>

<style>
  .power .power-form .el-form-item__label {
    line-height: 25px !important;
  }
</style>

<style lang="scss" scoped>
.power-form {
  margin-top: 60px;
  height: 350px;
  padding-left: 25%;
}
.form-input {
  width: 260px;
}
.power {
  background: #fff;
  .power_title {
    font-size: 20px;
    padding: 30px;
    margin: 20px 0 0 80px;
    display: flex;
    align-items: center;
  }
}
.dialog-footer {
  margin-top: 60px;
  margin-bottom: 80px;;
}
</style>
