<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;">
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="handleCreate">
        Add
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="syncData">
        Sync
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
      <el-table-column align="center" prop="sk_code" label="代码" width="68" />
      <el-table-column label="名称" prop="sk_name" width="80" />
      <el-table-column label="现价" prop="sk_xj" width="80" />
      <el-table-column label="涨跌幅" align="center" prop="sk_zdf" width="66" />
      <el-table-column label="涨跌天" align="center" prop="sk_zdt" width="66" />
      <el-table-column label="持股量" prop="sk_hold" width="66" />
      <el-table-column label="持股额" prop="hold_money" width="68" />
      <el-table-column label="市值(亿)" prop="sk_ltsz" align="center" width="102" />
      <el-table-column label="评分" prop="sk_score" align="center" width="50" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteData(scope.row)">移除</el-button>
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="thumbsUpHandler(scope.row)">赞</el-button>
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
        <el-form-item label="持股量" prop="sk_hold">
          <el-input-number v-model="dataForm.sk_hold" step-strictly="100" :step="100" label="income" />
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
import { addCollect, delCollect, getCollectList, syncRealData, thumbsUp } from '@/api/stock'

export default {
  name: 'SkCollect',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dataForm: {
        sk_code: '',
        sk_hold: ''
      },
      dialogPvVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = false
      getCollectList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    syncData() {
      syncRealData({ param: 'collect' }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
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
      this.dataForm.sk_hold = ''
    },
    createData() {
      addCollect(this.dataForm).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    deleteData(row) {
      delCollect(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    thumbsUpHandler(row) {
      thumbsUp(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'thumbs-up Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    }
  }
}
</script>
