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
      <el-select v-model="listQuery.bk_code" placeholder="板块名称" style="width: 120px;margin-left:3px;">
        <el-option v-for="item in bkList" :key="item.bk_code" :label="item.bk_name" :value="item.bk_code" />
      </el-select>
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="handleFilter">
        查询
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
      <el-table-column label="代码" prop="sk_code" width="68" />
      <el-table-column label="名称" prop="sk_name" width="78" />
      <el-table-column label="板块" prop="bk_name" width="78" />
      <el-table-column label="现价" width="68" prop="sk_xj" />
      <el-table-column label="成交额" width="86" prop="sk_cje" sortable />
      <el-table-column label="1D" width="62" prop="sk_zdf" sortable />
      <el-table-column label="涨跌天" width="90" prop="fx_zdt" sortable />
      <el-table-column prop="cy_status" width="56" label="cycle">
        <template scope="scope">
          {{ scope.row.cy_status === 0 ? '待评': '' }}
          {{ scope.row.cy_status === 1 ? '亢龙': '' }}
          {{ scope.row.cy_status === 2 ? '潜龙': '' }}
          {{ scope.row.cy_status === 3 ? '见龙': '' }}
          {{ scope.row.cy_status === 4 ? '跃龙': '' }}
          {{ scope.row.cy_status === 5 ? '飞龙': '' }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="upCyStatusFunc(scope.row,1)">升</el-button>
          <el-button type="text" size="small" @click="upCyStatusFunc(scope.row,-1)">降</el-button>
          <el-button type="text" size="small" @click="addCycleWpFunc(scope.row)">GoWP</el-button>
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
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
  </div>
</template>

<script>
import { addCycleWp, getBkList, getMarketList, upCyStatus } from '@/api/cycle'
import Pagination from '@/components/Pagination'

export default {
  name: 'SkMarket',
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
        sort: 'fx_zdt'
      },
      updateSkData: {
        sk_code: '',
        is_new: '1'
      },
      bkList: [{
        bk_code: '全部',
        bk_name: ''
      }]
    }
  },
  created() {
    this.fetchData()
    this.getBkListFunc()
  },
  methods: {
    upCyStatusFunc(row, cy_status) {
      // 添加个股至尾盘观察区
      upCyStatus({ sk_code: row.sk_code, cy_status: cy_status }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
    },
    addCycleWpFunc(row) {
      // 添加个股至尾盘观察区
      addCycleWp({ sk_code: row.sk_code }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'add Successfully',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
    },
    getBkListFunc() {
      getBkList().then(response => {
        this.bkList = response.data
      })
    },
    changeSort(val) {
      this.listQuery.sort = val.prop
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    },
    fetchData() {
      this.listLoading = false
      getMarketList(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
