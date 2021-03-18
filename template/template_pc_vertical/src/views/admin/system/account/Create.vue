<template>
  <el-row>
    <div class="add-from">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="addForm.username"
            class="form-input"
            maxlength="20"
            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="addForm.password"
            class="form-input"
            maxlength="20"
            onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
            placeholder="请输入密码"
            :type="pwdType"
          >
            <i
              v-if="pwdType == 'password'"
              slot="suffix"
              class="el-icon-lock"
              @click="changePass()"
            />
            <i v-else slot="suffix" class="el-icon-unlock" @click="changePass()" />
          </el-input>
        </el-form-item>

        <el-form-item style="text-align: left" label="用户状态" prop="status">
          <el-switch
            v-model="addForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>

        <el-form-item label="所属角色" prop="roles">
          <el-select
            v-model="addForm.roles"
            multiple
            class="form-input"
            placeholder="请选择角色"
            @visible-change="handleRoleOptions"
          >
            <el-option v-for="(role, index) in roleOptions" :key="index" :label="role.name" :value="role.ID" />
          </el-select>
        </el-form-item>

        <el-form-item label="昵称" prop="name">
          <el-input v-model="addForm.name" class="form-input" placeholder="请输入用户昵称" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="addForm.phone"
            class="form-input"
            type="tel"
            placeholder="请输入境内手机号码: 123-6666-6666"
          >
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model.trim="addForm.email"
            class="form-input"
            maxlength="100"
            type="email"
            placeholder="请输入电子邮箱地址"
          />
        </el-form-item>

        <el-form-item label="其他备注" prop="describe">
          <el-input
            v-model="addForm.describe"
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
        <el-button @click="handleFormClose('addForm')">取 消</el-button>
        <el-button type="primary" :loading="addLoading" @click="handleSubmitForm('addForm')">提 交</el-button>
      </span>
    </div>
  </el-row>
</template>

<script>
// import CryptoJS from "crypto-js";
export default {
  name: 'Create',

  props: {},
  data() {
    return {
      addLoading: false,
      addForm: {
        username: '',
        status: '1',
        password: '',
        name: '',
        phone: '',
        email: '',
        describe: '',
        roles: ''
      },
      pwdType: 'password',
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
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { max: 20, message: '密码长度最多20个字符', trigger: 'blur' },
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
          { max: 100, message: '邮箱地址长度最多100个字符', trigger: 'blur' }
        ],
        describe: [
          { max: 200, message: '描述信息不能超过200个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择角色状态', trigger: 'change' }
        ],
        roles: [
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
  watch: {},
  created() {},
  methods: {
    // 提交创建
    handleSubmitForm(formName) {
      // const pwd = false;
      // const iv = '1234567890123456';
      // const key = '1234567890654321';
      // const oldPwd = this.addForm.password;

      // if (oldPwd) {
      //   pwd = this.encrypt(oldPwd, key, iv);
      // } else {
      //   pwd = this.encrypt("123456", key, iv);
      // }

      this.$refs[formName].validate(valid => {
        if (valid) {
          // 通过验证
          // if (pwd) {
          // this.addForm.password = pwd;
          console.log(this.addForm);
          this.addLoading = true;
          this.$api
            .create('v1/createuser', this.addForm)
            .then(res => {
              this.handleFormClose(formName);
              this.$message.success({
                showClose: true,
                message: res.errmsg,
                duration: 2000
              });
              this.$emit('submitCreate', true);
            })
            .catch(() => {
              this.addLoading = false;
            });
          // } else {
          //   //加密错误
          //   this.addForm.password = oldPwd;
          //   this.$message({
          //     message: "加密错误",
          //     type: "error"
          //   });
          // }
        }
      });
    },

    // 控制密码显示
    changePass() {
      if (this.pwdType === 'password') this.pwdType = '';
      else this.pwdType = 'password';
    },

    /**
     * 接口数据加密函数
     * @param str string 需加密的json字符串
     * @param key string 加密key(16位)
     * @param iv string 加密向量(16位)
     * @return string 加密密文字符串
     */
    // encrypt(str, key, iv) {
    //   //密钥16位
    //   let keyd = CryptoJS.enc.Utf8.parse(key);
    //   //加密向量16位
    //   let ivd = CryptoJS.enc.Utf8.parse(iv);

    //   let encrypted = CryptoJS.AES.encrypt(str, keyd, {
    //     iv: ivd,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.ZeroPadding
    //   }).toString();
    //   return encrypted;
    // },

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

    // 表单关闭
    handleFormClose(formName) {
      this.addLoading = false;
      this.$refs[formName].resetFields();
      this.$emit('closeAdd', formName);
    }
  }
};
</script>

<style scoped lang="scss">
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
