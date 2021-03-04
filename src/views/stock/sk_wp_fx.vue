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
      <el-table-column align="center" label="序号" width="46">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="sk_code" width="66" />
      <el-table-column label="名称" prop="sk_name" width="70" />
      <el-table-column label="行业" width="120" prop="bk2_name" />
      <el-table-column label="现价" width="60" prop="sk_xj" />
      <el-table-column label="市值" align="center" width="56" prop="sk_ltsz" />
      <el-table-column label="涨跌" align="center" width="56" prop="sk_zdf" />
      <el-table-column label="30min" align="center" width="66" prop="min6" />
      <el-table-column label="35min" align="center" width="60" prop="min5" />
      <el-table-column label="40min" align="center" width="60" prop="min4" />
      <el-table-column label="45min" align="center" width="60" prop="min3" />
      <el-table-column label="50min" align="center" width="60" prop="min2" />
      <el-table-column label="55min" align="center" width="60" prop="min1" />
      <el-table-column fixed="right" label="操作" width="60">
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
import { getBkList, getWpList } from '@/api/stock'
import Pagination from '@/components/Pagination'

export default {
  name: 'SkWpFx',
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
        bkCode: '',
        sort: 'sk_score'
      },
      bkList: [{
        bk_code: '行业',
        bk_name: ''
      }]
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
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    changeSort(val) {
      this.listQuery.sort = val.prop
      this.fetchData()
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    },
    fetchData() {
      this.listLoading = false
      getWpList(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
