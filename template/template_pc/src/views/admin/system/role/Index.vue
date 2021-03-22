<template>
  <el-row>
    <el-row v-if="status == 'list'">
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
          <el-table-column prop="ID" label="ID" width="88" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="User.name" label="创建者" />
          <el-table-column prop="desc" label="描述" />
          <el-table-column prop="CreatedAt" label="创建时间" />

          <el-table-column
            fixed="right"
            label="操作"
            width="150px"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleEdit(scope.row.ID)"
              >编辑</el-button>
              <el-button
                type="text"
                style="color: green"
                size="small"
                @click="handlePower(scope.row.ID)"
              >分配</el-button>
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
          :size-change="handleSizeChange"
          :current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-size="pageSize"
          :page-sizes="[8, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber"
        />
      </el-row>

      <el-row class="dialog-box">
        <el-dialog
          title="添加角色"
          destroy-on-close
          :visible.sync="addVisible"
          width="50%"
          :modal-append-to-body="false"
          :before-close="handleCloseAdd"
        >
          <create-component @closeAdd="handleCloseAdd" @submitCreate="submitCreate" />
        </el-dialog>

        <el-dialog
          title="编辑角色"
          destroy-on-close
          :visible.sync="editVisible"
          width="50%"
          :modal-append-to-body="false"
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

    <power
      v-if="status == 'power'"
      :init-loading="editFormLoading"
      :edit-data="editForm"
      @closeEdit="handleClosePower"
      @submitEdit="submitPower"
    />
  </el-row>
</template>

<script>
// import { mapGetters } from 'vuex';
import CreateComponent from './Create.vue';
import EditComponent from './Edit.vue';
import Power from './Power.vue';

export default {
  name: 'Index',
  components: {
    'create-component': CreateComponent,
    'edit-component': EditComponent,
    'power': Power
  },
  data() {
    return {
      status: 'list',
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
    // ...mapGetters(["permissions"])
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
      this.$api.list('/v1/getrolelist', params).then(res => {
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
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.delete('v1/deleterole', id).then(res => {
            this.$message({
              type: 'success',
              message: res.errmsg
            });
            this.initData();
          });
        })
        .catch(() => {
          console.log('取消删除');
        });
    },

    // 编辑
    handleEdit(id) {
      this.editVisible = true;
      this.editFormLoading = true;
      this.$api.item('v1/getroleitem', id).then(res => {
        this.editForm = JSON.parse(JSON.stringify(res.data));
        this.editFormLoading = false;
      });
    },

    // 权限分配
    handlePower(id) {
      this.editFormLoading = true;
      this.status = 'power';
      this.$api.item('v1/getrolepermissions', id).then(res => {
        // this.editForm = JSON.parse(JSON.stringify(res));
        this.editForm = {
          ID: id,
          role_permission: res.data ? res.data : []
        };
        this.editFormLoading = false;
      });
    },

    // 关闭编辑
    handleCloseEdit() {
      this.editVisible = false;
    },

    // 关闭权限分配
    handleClosePower() {
      this.status = 'list';
    },

    // 编辑提交
    submitEdit() {
      this.editVisible = false;
      this.initData();
    },

    // 权限分配提交
    submitPower() {
      this.status = 'list';
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
