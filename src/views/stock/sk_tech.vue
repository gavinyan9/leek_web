<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;">
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="handleCreate">
        Add
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="syncData">
        Sync
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="loadRealData">
        Load
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="clearRealFunc">
        Clear
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="techScoreFunc">
        评分
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="56">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="sk_code" width="68" />
      <el-table-column label="名称" prop="sk_name" width="80" />
      <el-table-column label="板块" prop="bk_name" width="92" />
      <el-table-column label="现价" prop="sk_xj" width="76" />
      <el-table-column label="±(1)" align="center" prop="sk_zdf" width="60" />
      <el-table-column label="±(2)" align="center" width="60" prop="sk_last2" />
      <el-table-column label="±(3)" align="center" width="60" prop="sk_last3" />
      <el-table-column label="±D" align="center" prop="sk_zdt" width="40" />
      <el-table-column label="成交额(万)" align="center" prop="sk_cje" width="90" />
      <el-table-column label="市值(亿)" align="center" width="80" prop="sk_ltsz" />
      <el-table-column label="评分" align="center" prop="sk_score" width="66" />
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="techDelFunc(scope.row)">移除</el-button>
          <el-button type="text" size="small" @click="mkZero(scope.row)">归零</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Create" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="dataForm"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="代码" prop="sk_code">
          <el-input v-model="dataForm.sk_code" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="createData">
          Confirm
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { techAdd, clearReal, techDel, loadReal, syncRealData, techList, techScore, zeroReal } from '@/api/stock'
export default {
  name: 'SkReal',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dataForm: {
        sk_code: ''
      },
      dialogPvVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    techScoreFunc() {
      techScore().then(() => {
        this.$notify({
          title: 'Success',
          message: 'Score Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    techDelFunc(row) {
      techDel({ sk_code: row.sk_code }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = false
      techList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    loadRealData() {
      loadReal().then(() => {
        this.$notify({
          title: 'Success',
          message: 'Load Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.dataForm.sk_code = ''
    },
    createData() {
      techAdd(this.dataForm).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    clearRealFunc() {
      clearReal().then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    mkZero(row) {
      zeroReal(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Zero Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    syncData() {
      syncRealData({ param: 'real' }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    }
  }
}
</script>
