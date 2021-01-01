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
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="sk_code" width="68" />
      <el-table-column label="名称" prop="sk_name" width="78" />
      <el-table-column label="板块" prop="bk_name" width="78" />
      <el-table-column label="现价" width="68" prop="sk_xj" />
      <el-table-column label="市值" align="center" width="62" prop="sk_ltsz" />
      <el-table-column label="成交额" align="center" width="86" prop="sk_cje" sortable />
      <el-table-column label="1D" align="center" width="62" prop="sk_zdf" sortable />
      <el-table-column label="月" align="center" width="50" prop="mon1" />
      <el-table-column label="年" align="center" width="60" prop="year1" />
      <el-table-column label="评分" align="center" width="50" prop="sk_score" />
      <el-table-column fixed="right" label="操作" width="90">
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
  </div>
</template>

<script>
import { getBkList, getMarketList } from '@/api/stock'
import { delCompany } from '@/api/idc'
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
        sort: 'sk_score'
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
    getBkListFunc() {
      getBkList().then(response => {
        this.bkList = response.data
      })
    },
    delCompanyFunc(row) {
      delCompany({ sk_code: row.sk_code }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
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
