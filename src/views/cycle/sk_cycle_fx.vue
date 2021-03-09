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
      <el-select v-model="listQuery.cy_status" placeholder="Cycle" style="width: 120px;margin-left:3px;">
        <el-option
          v-for="item in cyStatList"
          :key="item.cy_statCode"
          :label="item.cy_statName"
          :value="item.cy_statCode"
        />
      </el-select>
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="syncCyQ5Func">
        CyQ5
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
      <el-table-column align="center" label="代码" prop="sk_code" width="66" />
      <el-table-column label="名称" prop="sk_name" width="70" />
      <el-table-column label="行业" width="120" prop="bk2_name" />
      <el-table-column label="现价" width="60" prop="sk_xj" />
      <el-table-column label="市值" width="60" prop="sk_ltsz" />
      <el-table-column label="zdf" width="56" prop="sk_zdf" />
      <el-table-column label="p5" width="62" prop="cy_p1" sortable />
      <el-table-column label="p15" width="58" prop="cy_p2" />
      <el-table-column label="p35" width="58" prop="cy_p3" />
      <el-table-column label="zdt" width="66" prop="cy_zdt" sortable />
      <el-table-column label="cycle" width="56" prop="cy_status" />
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
import { addCycleWp, getBkList, getCyclePage, upCyStatus, syncCyQ5Gj, syncDayGj } from '@/api/cycle'
import Pagination from '@/components/Pagination'

export default {
  name: 'SkFxCycle',
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
        cy_status: '',
        sort: 'sk_code'
      },
      bkList: [{
        bk_code: '行业',
        bk_name: ''
      }],
      cyStatList: [{
        cy_statCode: '',
        cy_statName: 'Cycle'
      }, {
        cy_statCode: '5',
        cy_statName: '飞龙'
      }, {
        cy_statCode: '4',
        cy_statName: '跃龙'
      }, {
        cy_statCode: '3',
        cy_statName: '惕龙'
      }, {
        cy_statCode: '2',
        cy_statName: '见龙'
      }, {
        cy_statCode: '1',
        cy_statName: '潜龙'
      }, {
        cy_statCode: '0',
        cy_statName: '亢龙'
      }, {
        cy_statCode: '-1',
        cy_statName: '待评'
      }]
    }
  },
  created() {
    this.fetchData()
    this.getBkListFunc()
  },
  methods: {
    syncDayGjFunc() {
      // 全量股价同步
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
    syncCyQ5Func() {
      // 龙头法同步数据
      syncCyQ5Gj().then(() => {
        this.$notify({
          title: 'Success',
          message: 'sync Successfully',
          type: 'success',
          duration: 1000
        })
        this.fetchData()
      })
    },
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
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    changeSort(val) {
      this.listQuery.sort = val.prop
      this.fetchData()
    },
    fetchData() {
      this.listLoading = false
      getCyclePage(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    }
  }
}
</script>
