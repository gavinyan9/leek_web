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
      <el-select v-model="listQuery.gjfw" placeholder="股价范围" style="width: 120px;margin-left:3px;">
        <el-option
          v-for="item in jgfwList"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        />
      </el-select>
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
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="skCode" width="68" />
      <el-table-column label="名称" prop="skName" width="70" />
      <el-table-column label="板块" width="70" prop="bkName" />
      <el-table-column label="二级板块" prop="bkRemark" width="96" sortable />
      <el-table-column label="现价" width="60" prop="skXj" />
      <el-table-column label="涨跌" width="52" prop="skZdf" />
      <el-table-column label="月度" align="center" width="70" prop="mon1" sortable />
      <el-table-column label="2021" align="center" width="72" prop="year1" sortable />
      <el-table-column label="2020" align="center" width="52" prop="year2" />
      <el-table-column label="2019" align="center" width="52" prop="year3" />
      <el-table-column label="2018" align="center" width="52" prop="year4" />
      <el-table-column label="市值" align="center" width="56" prop="skLtsz" />
      <el-table-column label="评分" align="center" width="46" prop="skScore" />
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
import { delCompany, profitYearPages } from '@/api/idc'
import { getBkList } from '@/api/stock'
import Pagination from '@/components/Pagination'

export default {
  name: 'IdcProfitYear',
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
        gjfw: '',
        bkCode: '',
        sort: 'sk_score'
      },
      bkList: [{
        bk_code: '全部',
        bk_name: ''
      }],
      jgfwList: [{
        key: '股价范围',
        value: ''
      }, {
        key: '10以下',
        value: '10'
      }, {
        key: '10-20',
        value: '20'
      }, {
        key: '20-30',
        value: '30'
      }, {
        key: '30-50',
        value: '50'
      }, {
        key: '50-100',
        value: '100'
      }, {
        key: '100-200',
        value: '200'
      }, {
        key: '200以上',
        value: '300'
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
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.skCode)
    },
    fetchData() {
      this.listLoading = false
      profitYearPages(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
