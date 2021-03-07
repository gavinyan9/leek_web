<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;">
      <el-input
        v-model="listQuery.sk_code"
        placeholder="sk_code"
        style="width: 120px;"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.sk_name"
        placeholder="sk_name"
        style="width: 120px;margin-left:3px;"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.bk_code" placeholder="行业名称" style="width: 120px;margin-left:3px;">
        <el-option
          v-for="item in bkList"
          :key="item.bk_code"
          :label="item.bk_name"
          :value="item.bk_code"
        />
      </el-select>
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 8px;" type="primary" @click="handleCreate">
        Add
      </el-button>
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="syncDayGjFunc">
        同步
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="list"
      border
      fit
      highlight-current-row
      @sort-change="changeSort"
    >
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="skCode" width="88" />
      <el-table-column label="名称" prop="skName" width="96" />
      <el-table-column label="行业" prop="bkName" width="96" />
      <el-table-column label="行业细分" prop="bk2Name" width="120" />
      <el-table-column label="现价" width="76" prop="skXj" />
      <el-table-column label="市值" align="center" width="90" prop="skLtsz" sortable />
      <el-table-column label="年化" align="center" width="90" prop="year1" sortable />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="delCompanyFunc(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />

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
        <el-form-item label="名称" prop="sk_name">
          <el-input v-model="dataForm.sk_name" />
        </el-form-item>
        <el-form-item label="板块" prop="bk_code">
          <el-input v-model="dataForm.bk_code" />
        </el-form-item>
        <el-form-item label="板名" prop="bk_name">
          <el-input v-model="dataForm.bk_name" />
        </el-form-item>
        <el-form-item label="remark" prop="bk_remark">
          <el-input v-model="dataForm.bk_remark" />
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
import { addCompany, companyPages, delCompany, syncDayGj } from '@/api/idc'
import { getBkList } from '@/api/cycle'

import Pagination from '@/components/Pagination'

export default {
  name: 'IdcCompany',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 30,
        sk_code: '',
        sk_name: '',
        bk_code: '',
        bk_remark: '',
        sort: 'skLtsz'
      },
      dataForm: {
        sk_code: '',
        sk_name: '',
        bk_code: '',
        bk_name: '',
        bk_remark: ''
      },
      bkList: [{
        bk_code: '全部',
        bk_name: ''
      }],
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false
    }
  },
  created() {
    this.fetchData()
    this.getBkListFunc()
  },
  methods: {
    getBkListFunc() {
      getBkList().then(response => {
        this.bkList = response.data
      })
    },
    createData() {
      addCompany(this.dataForm).then(() => {
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
    syncDayGjFunc() {
      syncDayGj({ flag: 'ALL' }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'sync Successfully',
          type: 'success',
          duration: 1000
        })
        this.fetchData()
      })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    changeSort(val) {
      this.listQuery.sort = val.prop
      this.fetchData()
    },
    delCompanyFunc(row) {
      delCompany({ sk_code: row.skCode }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.skCode)
    },
    fetchData() {
      this.listLoading = false
      companyPages(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
