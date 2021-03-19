<template>
  <el-row>
    <div class="edit-from">
      <el-form
        ref="editForm"
        v-loading="formLoading"
        :model="editForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model.trim="editForm.name"
            class="form-input"
            maxlength="20"
            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="请输入名称"
          />
        </el-form-item>

        <!--<el-form-item label="角色状态" prop="status">-->
        <!--<el-switch-->
        <!--v-model="editForm.status"-->
        <!--active-color="#13ce66"-->
        <!--inactive-color="#ff4949"-->
        <!--active-value='1'-->
        <!--inactive-value='0'>-->
        <!--</el-switch>-->
        <!--</el-form-item>-->

        <el-form-item label="其他备注" prop="desc">
          <el-input
            v-model="editForm.desc"
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
// import { mapGetters } from "vuex";
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
      permission_routers: [],
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    };
  },

  computed: {
    // ...mapGetters(["permission_routers"])
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
    this.editForm = this.editData;
    this.formLoading = this.initLoading;
  },
  methods: {
    // 提交编辑
    handleSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editLoading = true;
          const dataForm = {
            name: this.editForm.name,
            desc: this.editForm.desc
          };
          this.$api
            .edit('v1/editrole', this.editForm.ID, dataForm)
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

    // 参数序列化
    formFormat(form) {
      const dataForm = JSON.parse(JSON.stringify(form));
      return dataForm;
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
