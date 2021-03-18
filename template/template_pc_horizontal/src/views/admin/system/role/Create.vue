<template>
  <el-row>
    <el-row class="add-from">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model.trim="addForm.name"
            class="form-input"
            maxlength="20"
            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="请输入名称"
          />
        </el-form-item>

        <!--<el-form-item label="角色状态" prop="status">-->
        <!--<el-switch-->
        <!--v-model="addForm.status"-->
        <!--active-color="#13ce66"-->
        <!--inactive-color="#ff4949"-->
        <!--active-value='1'-->
        <!--inactive-value='0'>-->
        <!--</el-switch>-->
        <!--</el-form-item>-->

        <el-form-item label="其他备注" prop="desc">
          <el-input
            v-model="addForm.desc"
            class="form-input"
            type="textarea"
            :rows="2"
            maxlength="200"
            placeholder="请输入备注信息"
          />
        </el-form-item>
      </el-form>
    </el-row>

    <el-row class="dialog-footer">
      <span style="float: right">
        <el-button @click="handleFormClose('addForm')">取 消</el-button>
        <el-button type="primary" :loading="addLoading" @click="handleSubmitForm('addForm')">提 交</el-button>
      </span>
    </el-row>
  </el-row>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  name: 'Create',
  props: {},
  data() {
    return {
      addLoading: false,
      addForm: {
        name: '',
        status: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { max: 20, message: '名称长度最多20个字符', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            message: '不允许输入空格等特殊符号',
            trigger: 'blur'
          }
        ],
        desc: [
          { max: 200, message: '描述信息不能超过200个字符', trigger: 'blur' }
        ]
        // status: [
        //     { required: true, message: '请选择角色状态', trigger: 'change' }
        // ],
      },
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },
  computed: {
    // ...mapGetters(["permission_routers"])
  },
  watch: {},
  created() {

  },
  methods: {
    // 提交创建
    handleSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addLoading = true;
          const dataForm = this.formFormat(this.addForm);
          this.$api.create('v1/createrole', dataForm).then(res => {
            this.handleFormClose(formName);
            this.$message.success({
              showClose: true,
              message: res.errmsg,
              duration: 2000
            });
            this.$emit('submitCreate', true);
          });
        }
      });
    },

    // 参数序列化
    formFormat(form) {
      const dataForm = JSON.parse(JSON.stringify(form));
      dataForm.role_permission = JSON.stringify(form.role_permission);
      return dataForm;
    },

    // 表单关闭
    handleFormClose(formName) {
      this.addLoading = false;
      this.$refs[formName].resetFields();
      this.$emit('closeAdd', formName);
    }
  }
};
</script>

<style scoped>
.add-from {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-input {
  width: 260px;
}

.el-icon-lock {
  cursor: pointer;
}
.el-icon-unlock {
  cursor: pointer;
}
</style>
