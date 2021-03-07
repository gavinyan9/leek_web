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
      <el-select v-model="listQuery.bkCode" placeholder="行业名称" style="width: 120px;margin-left:3px;">
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
      <el-table-column label="代码" prop="sk_code" width="66" />
      <el-table-column label="名称" prop="sk_name" width="70" />
      <el-table-column label="行业" width="80" prop="bk_name" />
      <el-table-column label="行业细分" width="98" prop="bk2_name" />
      <el-table-column label="现价" width="60" prop="sk_xj" />
      <el-table-column label="涨跌" width="52" prop="sk_zdf" />
      <el-table-column label="10月" align="center" width="50" prop="mon6" />
      <el-table-column label="11月" align="center" width="50" prop="mon5" />
      <el-table-column label="12月" align="center" width="50" prop="mon4" />
      <el-table-column label="1月" align="center" width="50" prop="mon3" />
      <el-table-column label="2月" align="center" width="50" prop="mon2" />
      <el-table-column label="3月" align="center" width="66" prop="mon1" sortable />
      <el-table-column label="2021" align="center" width="72" prop="year1" sortable />
      <el-table-column label="市值" align="center" width="66" prop="sk_ltsz" />
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
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
import { getPfMonPages } from '@/api/idc'
import { getBkList } from '@/api/cycle'
import Pagination from '@/components/Pagination'

export default {
  name: 'IdcProfitMon',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        sk_code: '',
        sk_name: '',
        bkCode: '',
        sort: 'sk_score'
      },
      bkList: [{
        bk_code: '行业',
        bk_name: ''
      }],
      formData: {
        sk_code: '',
        sk_bk: ''
      }
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
    changeSort(val) {
      this.listQuery.sort = val.prop
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.skCode)
    },
    fetchData() {
      this.listLoading = false
      getPfMonPages(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
