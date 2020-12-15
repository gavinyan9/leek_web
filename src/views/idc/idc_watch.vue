<template>
  <div class="app-container">
    <div class="filter-container" style="padding-bottom: 6px;" />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="46">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="代码" prop="sk_code" width="66" />
      <el-table-column label="名称" prop="sk_name" width="70" />
      <el-table-column label="板块" prop="bk_name" width="70" />
      <el-table-column label="二级板块" prop="bk_remark" width="96" />
      <el-table-column label="现价" prop="sk_xj" width="58" />
      <el-table-column label="1D" align="center" prop="day1" width="50" />
      <el-table-column label="2D" align="center" prop="day2" width="50" />
      <el-table-column label="3D" align="center" prop="day3" width="50" />
      <el-table-column label="10月" align="center" prop="mon3" width="50" />
      <el-table-column label="11月" align="center" prop="mon2" width="50" />
      <el-table-column label="12月" align="center" prop="mon1" width="50" />
      <el-table-column label="2020" align="center" prop="year1" width="52" />
      <el-table-column label="2019" align="center" prop="year2" width="52" />
      <el-table-column label="市值" align="center" prop="sk_ltsz" width="62" />
      <el-table-column label="评分" align="center" prop="sk_score" width="50" />
      <el-table-column fixed="right" label="操作" width="86">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="delSkWatchFunc(scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delSkWatch, skWatchList } from '@/api/stock'

export default {
  name: 'IdcWatch',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogPvVisible: false
    }
  }, created() {
    this.fetchData()
  }, methods: {
    fetchData() {
      this.listLoading = false
      skWatchList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    delSkWatchFunc(row) {
      delSkWatch({ sk_code: row.sk_code }).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Deleted Successfully',
          type: 'success',
          duration: 3000
        })
        this.fetchData()
      })
    },
    goDetail(row) {
      window.open('http://stockpage.10jqka.com.cn/' + row.sk_code)
    }
  }
}
</script>
