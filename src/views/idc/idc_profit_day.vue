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
      <el-select v-model="listQuery.bkCode" placeholder="板块名称" style="width: 120px;margin-left:3px;">
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
      <el-table-column align="center" label="序号" width="46">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="skCode" width="66" />
      <el-table-column label="名称" prop="skName" width="70" />
      <el-table-column label="板块" width="70" prop="bkName" />
      <el-table-column label="现价" width="60" prop="skXj" />
      <el-table-column label="市值" align="center" width="56" prop="skLtsz" />
      <el-table-column label="月度" align="center" width="50" prop="day30" />
      <el-table-column label="1D" align="center" width="66" prop="day1" sortable />
      <el-table-column label="2D" align="center" width="50" prop="day2" />
      <el-table-column label="3D" align="center" width="50" prop="day3" />
      <el-table-column label="4D" align="center" width="50" prop="day4" />
      <el-table-column label="5D" align="center" width="50" prop="day5" />
      <el-table-column label="6D" align="center" width="50" prop="day6" />
      <el-table-column label="7D" align="center" width="50" prop="day7" />
      <el-table-column label="评分" align="center" width="46" prop="skScore" />
      <el-table-column label="年化" align="center" width="52" prop="year1" />
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="addSkWatchFunc(scope.row)">收藏</el-button>
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
import { addSkWatch } from '@/api/idc'
import { getPfDayPages, syncDayGj } from '@/api/profit'
import { getBkList } from '@/api/stock'
import Pagination from '@/components/Pagination'

export default {
  name: 'IdcProfitDay',
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
        gjfw: '',
        bkCode: '',
        sort: 'sk_score'
      },
      bkList: [{
        bk_code: '板块',
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
      window.open('http://stockpage.10jqka.com.cn/' + row.skCode)
    },
    fetchData() {
      this.listLoading = false
      getPfDayPages(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    },
    syncDayGjFunc() {
      syncDayGj().then(() => {
        this.$notify({
          title: 'Success',
          message: 'sync Successfully',
          type: 'success',
          duration: 1000
        })
        this.fetchData()
      })
    },
    addSkWatchFunc(row) {
      addSkWatch({ sk_code: row.skCode }).then(() => {
        this.$notify({
          title: 'Success',
          message: '收藏 Successfully',
          type: 'success',
          duration: 1000
        })
        this.fetchData()
      })
    }
  }
}
</script>
