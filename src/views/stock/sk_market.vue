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
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="getTxDataFunc">
        采集
      </el-button>
      <el-button class="filter-item" type="primary" style="margin-left: 3px;" @click="mkGradeFunc">
        评分
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
      <el-table-column label="板块" prop="bk_name" width="92" />
      <el-table-column label="现价" width="68" prop="sk_xj" />
      <el-table-column label="±(1)" align="center" width="76" prop="sk_zdf" sortable />
      <el-table-column label="±(2)" align="center" width="76" prop="sk_last2" sortable />
      <el-table-column label="±(3)" align="center" width="76" prop="sk_last3" sortable />
      <el-table-column label="±(5)" align="center" width="58" prop="sk_last5" />
      <el-table-column label="±D" align="center" width="66" prop="sk_zdt" sortable />
      <el-table-column label="市值(亿)" align="center" width="82" prop="sk_ltsz" />
      <el-table-column label="评分" align="center" width="58" prop="sk_score" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addCollectFunc(scope.row)">收藏</el-button>
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="thumbsUpHandler(scope.row)">点赞</el-button>
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
import { addCollect, getMarketList, getTxData, mkGrade, thumbsUp, getBkList } from '@/api/stock'
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
    getTxDataFunc() {
      getTxData().then(() => {
        this.$notify({
          title: 'Success',
          message: 'Sync Successfully',
          type: 'success',
          duration: 6000
        })
      })
    },
    mkGradeFunc() {
      mkGrade().then(() => {
        this.$notify({
          title: 'Success',
          message: 'mkGrade Successfully',
          type: 'success',
          duration: 6000
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
    addCollectFunc(row) {
      addCollect(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Collect Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = false
      getMarketList(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.total
        this.listLoading = false
      })
    },
    thumbsUpHandler(row) {
      thumbsUp(row).then(() => {
        this.$notify({
          title: 'Success',
          message: 'thumbs-up Successfully',
          type: 'success',
          duration: 6000
        })
        this.fetchData()
      })
    }
  }
}
</script>
