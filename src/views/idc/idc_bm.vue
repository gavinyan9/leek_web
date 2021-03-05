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
          :key="item.gn_code"
          :label="item.gn_name"
          :value="item.gn_code"
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
      <el-table-column align="center" label="代码" prop="skCode" width="66" />
      <el-table-column label="名称" prop="skName" width="70" />
      <el-table-column label="行业" width="90" prop="bk2Name" />
      <el-table-column label="板块" width="70" prop="gnName" />
      <el-table-column label="现价" width="60" prop="skXj" />
      <el-table-column label="1D" align="center" width="66" prop="day1" sortable />
      <el-table-column label="2D" align="center" width="56" prop="day2" />
      <el-table-column label="3D" align="center" width="52" prop="day3" />
      <el-table-column label="last3" align="center" width="50" prop="last3" />
      <el-table-column label="last5" align="center" width="50" prop="last5" />
      <el-table-column label="30D" align="center" width="68" prop="mon1" sortable />
      <el-table-column label="60D" align="center" width="52" prop="mon2" />
      <el-table-column label="年化" align="center" width="70" prop="year1" sortable />
      <el-table-column label="市值" align="center" width="56" prop="skLtsz" />
      <el-table-column fixed="right" label="操作" width="50">
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
import { getPfTotalPages } from '@/api/idc'
import Pagination from '@/components/Pagination'

export default {
  name: 'RtBm',
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
      bkList: [
        { gn_code: '', gn_name: '板块' },
        { gn_code: 'G001', gn_name: '锂电池' },
        { gn_code: 'G002', gn_name: '光伏' },
        { gn_code: 'G003', gn_name: '高端制造' },
        { gn_code: 'G016', gn_name: '军工' },
        { gn_code: 'G006', gn_name: '医药' },
        { gn_code: 'G008', gn_name: '大消费' },
        { gn_code: 'G0081', gn_name: '酿酒' },
        { gn_code: 'G012', gn_name: '汽车' },
        { gn_code: 'G020', gn_name: '软件' },
        { gn_code: 'G021', gn_name: '妖股' },
        { gn_code: 'G022', gn_name: '银行' },
        { gn_code: 'G018', gn_name: '大白马' },
        { gn_code: 'G010', gn_name: '芯片' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
      getPfTotalPages(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
