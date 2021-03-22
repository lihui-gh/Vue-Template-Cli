<template>
  <el-row>
    <el-row class="tool-bar">
      <el-button
        type="primary"
        size="mini"
        class="add-btn"
        icon="el-icon-plus"
        @click="handleAdd"
      >添加</el-button>
    </el-row>

    <el-row class="table-box">
      <el-table v-loading="tableLoading" :data="tableData" style="width: 100%">
        <el-table-column prop="ID" label="ID" width="80" />
        <el-table-column prop="name" label="昵称" />
        <el-table-column prop="role_name" label="所属角色">
          <template slot-scope="scope">
            {{ scope.row.Role.map(item => item.name).join(',') }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">正常</el-tag>
            <el-tag v-else type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="describe" label="备注" />
        <el-table-column prop="CreatedAt" label="创建时间" />

        <el-table-column
          fixed="right"
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <!-- <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row.ID)"
            >编辑</el-button>
            <!-- <el-button
              @click="handleReset(scope.row.id)"
              style="color: #cc9e88"
              type="text"
              size="small"
            >重置</el-button>
            <el-button
              @click="handleCheck(scope.row.id)"
              style="color: green"
              type="text"
              size="small"
            >切换</el-button> -->
            <el-button
              style="color: red"
              type="text"
              size="small"
              @click="handleDelete(scope.row.ID)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row class="pagination-box">
      <el-pagination
        :current-page="currentPage"
        background
        :page-size="pageSize"
        :page-sizes="[8, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>

    <el-row class="dialog-box">
      <el-dialog
        title="添加账号"
        :visible.sync="addVisible"
        destroy-on-close
        :modal-append-to-body="false"
        width="50%"
        :before-close="handleCloseAdd"
      >
        <create-component @closeAdd="handleCloseAdd" @submitCreate="submitCreate" />
      </el-dialog>

      <el-dialog
        title="编辑用户"
        :visible.sync="editVisible"
        destroy-on-close
        :modal-append-to-body="false"
        width="50%"
        :before-close="handleCloseEdit"
      >
        <edit-component
          :init-loading="editFormLoading"
          :edit-data="editForm"
          @closeEdit="handleCloseEdit"
          @submitEdit="submitEdit"
        />
      </el-dialog>
    </el-row>
  </el-row>
</template>

<script>
import CreateComponent from './Create.vue';
import EditComponent from './Edit.vue';
// import { mapGetters } from "vuex";
export default {
  name: 'Index',
  components: {
    'create-component': CreateComponent,
    'edit-component': EditComponent
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      pageSize: 8,
      currentPage: 1,
      totalNumber: 0,
      addVisible: false,
      editVisible: false,
      editFormLoading: false,
      editForm: {}
    };
  },
  computed: {
    // ...mapGetters(["permissions"]),
    // ...mapGetters(["accountId"])
  },
  created() {
    // this.initData();
  },
  methods: {
    // 加载数据
    initData() {
      const params = {
        pageSize: this.pageSize,
        page: this.currentPage
      };
      this.tableLoading = true;
      this.$api.list('v1/getuserlist', params).then(res => {
        console.log(res);
        this.totalNumber = res.data.total;
        this.tableData = res.data.rows;
        this.tableLoading = false;
      });
    },

    // 添加
    handleAdd() {
      this.addVisible = true;
    },

    // 提交成功
    submitCreate() {
      this.addVisible = false;
      this.initData();
    },
    // 关闭添加
    handleCloseAdd() {
      this.addVisible = false;
    },

    // 查看
    handleView(row) {},

    // 删除
    handleDelete(id) {
      console.log(id);
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.delete('v1/deleteuser', id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.initData();
          });
        })
        .catch(() => {
          console.log('取消删除');
        });
    },

    // 重置密码
    handleReset(id) {
      this.$confirm('确认重置密码？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('iddaozhele');
          this.$api.edit('web/resetPassword', id).then(res => {
            this.$message({
              type: 'success',
              message: '重置密码成功'
            });
            this.initData();
          });
        })
        .catch(() => {
          console.log('取消');
        });
    },

    // 切换登录
    handleCheck(id) {
      this.$confirm(
        '此操作将登录该账号，同时退出当前登录账号，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$store
            .dispatch('CheckLogin', id)
            .then(res => {
              this.$message({
                type: 'success',
                message: '切换成功，3秒后进入用户界面',
                duration: 3000,
                onClose() {
                  window.location.href = '/';
                }
              });
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '登录失败'
              });
            });
        })
        .catch(() => {
          console.log('取消');
        });
    },

    // 编辑
    handleEdit(id) {
      this.editVisible = true;
      this.$api.item('v1/getuseritem', id).then(res => {
        this.editForm = res.data;
      });
      console.log(this.editForm);
    },
    // 关闭编辑
    handleCloseEdit() {
      this.editVisible = false;
    },

    // 编辑完成
    submitEdit() {
      this.initData();
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.initData();
    }
  }
};
</script>

<style scoped>
.add-btn {
  float: left;
}
</style>
